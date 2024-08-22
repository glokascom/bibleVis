-- Удалить все объекты в бакете, если они есть
DELETE FROM storage.objects WHERE bucket_id = 'profile';

-- Удалить существующий бакет, если он есть
DELETE FROM storage.buckets WHERE id = 'profile';

-- Создать новый бакет с публичным доступом
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile', 'profile', true);


-- Add unique constraint to email
ALTER TABLE public.users
ADD CONSTRAINT users_email_key UNIQUE (email);


ALTER TABLE public.users
  DROP COLUMN avatar_file_path,
  DROP COLUMN cover_file_path;

ALTER TABLE public.users
  ADD COLUMN avatar_file_exists BOOLEAN DEFAULT FALSE,
  ADD COLUMN cover_file_exists BOOLEAN DEFAULT FALSE;
