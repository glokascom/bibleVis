DROP VIEW IF EXISTS "public"."private_user_view";

CREATE OR REPLACE VIEW "public"."private_user_view" AS
  SELECT users.username,
    users.total_followers,
    users.avatar_file_path,
    users.cover_file_path,
    users.email,
    users.is_creator,
    users.id
   FROM users;
