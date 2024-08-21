-- Use Postgres to create a bucket.

insert into storage.buckets
  (id, name)
values
  ('profile', 'profile');


-- Add unique constraint to email
ALTER TABLE public.users
ADD CONSTRAINT users_email_key UNIQUE (email);
