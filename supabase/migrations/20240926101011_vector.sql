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
  RETURN to_tsvector('english', 
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
  IF NEW.description IS DISTINCT FROM OLD.description OR
     NEW.title IS DISTINCT FROM OLD.title THEN
    NEW.fts := generate_fts_vector(NEW.description, NEW.title, NEW.id);
  END IF;

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
ORDER BY popularity DESC;


CREATE OR REPLACE FUNCTION public.search_images(
    query TEXT,
    filter TEXT DEFAULT NULL,
    orientation_param TEXT DEFAULT NULL,
    sort TEXT DEFAULT 'newest',
    page INTEGER DEFAULT 1,  
    page_size INTEGER DEFAULT 10  
) 
RETURNS TABLE (
    id INTEGER,
    title VARCHAR(140),
    preview TEXT, 
    url_slug VARCHAR(10),
    orientation VARCHAR, 
    uploaded_at TIMESTAMP,
    file_sizes JSONB, 
    original_file_path VARCHAR,
    users_id UUID,
    users_username TEXT,  
    users_avatar_file_path TEXT 
) AS $$
DECLARE
    order_field TEXT := 'uploaded_at';
    order_direction TEXT := 'DESC';
    query_sql TEXT;
BEGIN
    IF sort = 'newest' THEN
        order_field := 'uploaded_at';
        order_direction := 'DESC';
    ELSIF sort = 'oldest' THEN
        order_field := 'uploaded_at';
        order_direction := 'ASC';
    ELSE
        order_field := 'popularity_cached';
        order_direction := 'DESC';
    END IF;

    query_sql := format(
        'SELECT 
            images.id,
            images.title,
            images.preview, 
            images.url_slug,
            images.orientation, 
            images.uploaded_at,
            images.file_sizes,
            images.original_file_path,
            users.id AS users_id, 
            users.username AS users_username,  
            users.avatar_file_path AS users_avatar_file_path 
        FROM public.images
        JOIN public.users ON images.user_id = users.id 
        WHERE 
            images.fts @@ to_tsquery(''english'', %L)
            AND (%L IS NULL OR %L = ''all'' OR images.orientation = %L)
            AND (%L IS NULL OR %L = ''All'' OR (%L = ''AI Generated'' AND images.is_ai_generated = TRUE) 
            OR (%L = ''Made by human'' AND images.is_ai_generated = FALSE))
        ORDER BY %I %s
        LIMIT %s OFFSET %s',
        query, orientation_param, orientation_param, orientation_param,
        filter, filter, filter, filter, order_field, order_direction, 
        page_size, (page - 1) * page_size
    );

    RETURN QUERY EXECUTE query_sql;
END;
$$ LANGUAGE plpgsql;

