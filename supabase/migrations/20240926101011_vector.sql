ALTER TABLE images 
ADD COLUMN fts TSVECTOR;

ALTER TABLE images 
ADD COLUMN popularity_cached FLOAT;


CREATE INDEX idx_images_uploaded_at ON images(uploaded_at);
CREATE INDEX idx_images_total_likes ON images(total_likes);
CREATE INDEX idx_images_total_views ON images(total_views);

CREATE OR REPLACE FUNCTION generate_fts_vector(
    description TEXT, 
    title TEXT, 
    image_id INT
) RETURNS TSVECTOR AS $$
BEGIN
  RETURN to_tsvector('russian', 
    COALESCE(description, '') || ' ' || 
    COALESCE(title, '') || ' ' || 
    COALESCE(
      (
        SELECT string_agg(t.name, ' ')
        FROM image_tags it
        JOIN tags t ON t.id = it.tag_id
        WHERE it.image_id = generate_fts_vector.image_id
      ), ''
    )
  ) ||
  to_tsvector('english', 
    COALESCE(description, '') || ' ' || 
    COALESCE(title, '') || ' ' ||
    COALESCE(
      (
        SELECT string_agg(t.name, ' ')
        FROM image_tags it
        JOIN tags t ON t.id = it.tag_id
        WHERE it.image_id = generate_fts_vector.image_id
      ), ''
    )
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_images_fts() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.fts := generate_fts_vector(NEW.description, NEW.title, NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_images_fts
BEFORE INSERT OR UPDATE ON images
FOR EACH ROW
EXECUTE FUNCTION update_images_fts();

CREATE OR REPLACE FUNCTION update_image_fts_on_tag_change() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE images
  SET fts = generate_fts_vector(description, title, images.id)
  WHERE id = NEW.image_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_image_fts_on_tag_insert
AFTER INSERT OR DELETE ON image_tags
FOR EACH ROW
EXECUTE FUNCTION update_image_fts_on_tag_change();

CREATE INDEX images_fts ON images USING gin (fts);

CREATE OR REPLACE FUNCTION update_popularity() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.popularity_cached := ((COALESCE(NEW.total_likes, 0) * 1.5 + COALESCE(NEW.total_views, 0) * 0.5) * 30) / 
                             (1 + DATE_PART('day', NOW() - NEW.uploaded_at));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_popularity_trigger
BEFORE INSERT OR UPDATE ON images
FOR EACH ROW
EXECUTE FUNCTION update_popularity();

SELECT 
    images.id AS image_id,
    ((COALESCE(images.total_likes, 0) * 1.5 + COALESCE(images.total_views, 0) * 0.5) * 30) / 
    (1 + DATE_PART('day', NOW() - images.uploaded_at)) AS popularity
FROM images
ORDER BY popularity DESC
LIMIT 100 OFFSET 0;


CREATE OR REPLACE FUNCTION public.search_images(
    query TEXT,
    filter TEXT DEFAULT NULL,
    orientation TEXT DEFAULT NULL,
    sort TEXT DEFAULT 'newest'
) 
RETURNS TABLE (
    id INTEGER,
    url_slug VARCHAR(10),
    user_id UUID,
    title VARCHAR(140),
    description VARCHAR(280),
    total_views INTEGER,
    total_likes INTEGER,
    uploaded_at TIMESTAMP
) AS $$
DECLARE
    order_field TEXT := 'popularity_cached';
    ascending BOOLEAN := FALSE;
BEGIN
    IF sort = 'newest' THEN
        order_field := 'uploaded_at';
        ascending := FALSE;
    ELSIF sort = 'oldest' THEN
        order_field := 'uploaded_at';
        ascending := TRUE;
    END IF;

    RETURN QUERY
    SELECT 
        images.id,
        images.url_slug,
        images.user_id,
        images.title,
        images.description,
        images.total_views,
        images.total_likes,
        images.uploaded_at
    FROM public.images
    WHERE 
        images.fts @@ to_tsquery('russian', query)
        AND (search_images.orientation IS NULL OR search_images.orientation = 'all' OR images.orientation = search_images.orientation) -- Игнорирование фильтра orientation
        AND (filter IS NULL OR filter = 'All' OR (filter = 'AI Generated' AND images.is_ai_generated = TRUE) 
        OR (filter = 'Made by human' AND images.is_ai_generated = FALSE)) -- Игнорирование фильтра filter
    ORDER BY 
        CASE WHEN order_field = 'uploaded_at' THEN images.uploaded_at END
        NULLS LAST,
        CASE WHEN order_field = 'popularity_cached' THEN images.popularity_cached END
        DESC
    LIMIT 20;
END;
$$ LANGUAGE plpgsql;

