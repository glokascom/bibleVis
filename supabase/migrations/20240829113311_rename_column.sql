DROP VIEW IF EXISTS "public"."private_user_view";
DROP VIEW IF EXISTS "public"."public_user_view";

ALTER TABLE public.users
DROP COLUMN avatar_file_exists,
DROP COLUMN cover_file_exists,
ADD COLUMN avatar_file_path text null,
ADD COLUMN cover_file_path text null;

CREATE OR REPLACE VIEW "public"."private_user_view" AS
  SELECT users.username,
    users.total_followers,
    users.avatar_file_path,
    users.cover_file_path,
    users.email,
    users.id
   FROM users;

CREATE OR REPLACE VIEW "public"."public_user_view" AS
  SELECT users.id,
    users.username,
    users.total_followers,
    users.avatar_file_path,
    users.cover_file_path
   FROM users;

