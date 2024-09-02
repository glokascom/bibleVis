
ALTER TABLE users RENAME COLUMN total_folowers TO total_followers;


DROP VIEW IF EXISTS "public"."private_user_view";
DROP VIEW IF EXISTS "public"."public_user_view";

CREATE OR REPLACE VIEW "public"."private_user_view" AS
  SELECT users.username,
    users.total_followers,
    users.avatar_file_exists,
    users.cover_file_exists,
    users.email,
    users.id
   FROM users;

CREATE OR REPLACE VIEW "public"."public_user_view" AS
  SELECT users.id,
    users.username,
    users.total_followers,
    users.avatar_file_exists,
    users.cover_file_exists
   FROM users;
