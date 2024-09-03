ALTER TABLE public.images
ADD COLUMN file_sizes jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.images
DROP COLUMN file_size;
