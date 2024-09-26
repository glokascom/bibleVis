CREATE OR REPLACE FUNCTION get_random_images(user_id uuid, limit_images integer)
RETURNS SETOF images AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM images
  WHERE images.user_id = get_random_images.user_id
  ORDER BY RANDOM()
  LIMIT get_random_images.limit_images;
END;
$$ LANGUAGE plpgsql;

CREATE INDEX idx_user_id ON images (user_id);

CREATE INDEX idx_url_slug ON images (url_slug);
