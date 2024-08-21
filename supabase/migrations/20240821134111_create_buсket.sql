-- Use Postgres to create a bucket.

insert into storage.buckets
  (id, name)
values
  ('profile', 'profile');


-- Add unique constraint to email
ALTER TABLE public.users
ADD CONSTRAINT users_email_key UNIQUE (email);


ALTER TABLE public.users
  DROP COLUMN avatar_file_path,
  DROP COLUMN cover_file_path;

ALTER TABLE public.users
  ADD COLUMN avatar_file_exists BOOLEAN DEFAULT FALSE,
  ADD COLUMN cover_file_exists BOOLEAN DEFAULT FALSE;
