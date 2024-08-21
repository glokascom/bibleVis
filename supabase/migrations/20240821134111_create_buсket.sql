-- Удалить существующий бакет, если он есть
DELETE FROM storage.buckets WHERE id = 'profile';

-- Создать новый бакет
INSERT INTO storage.buckets (id, name)
VALUES ('profile', 'profile');


-- Add unique constraint to email
ALTER TABLE public.users
ADD CONSTRAINT users_email_key UNIQUE (email);


ALTER TABLE public.users
  DROP COLUMN avatar_file_path,
  DROP COLUMN cover_file_path;

ALTER TABLE public.users
  ADD COLUMN avatar_file_exists BOOLEAN DEFAULT FALSE,
  ADD COLUMN cover_file_exists BOOLEAN DEFAULT FALSE;
