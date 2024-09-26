CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE public.images
ADD COLUMN search_vector vector(384 ); -- размер вектора для gte-small модели


CREATE OR REPLACE FUNCTION search_images(query_embedding vector(384), threshold float)
RETURNS TABLE (
  id int,
  title text,
  description text,
  url_slug text
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT images.id, images.title::text, images.description::text, images.url_slug::text
  FROM public.images
--   WHERE search_vector <=> query_embedding < threshold  -- Порог точности
--   ORDER BY search_vector <=> query_embedding
  LIMIT 10;
END;
$$;




CREATE INDEX IF NOT EXISTS idx_images_search_vector 
ON public.images
USING ivfflat (search_vector);
