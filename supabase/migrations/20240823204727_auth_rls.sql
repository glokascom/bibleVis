alter table "public"."users" alter column "username" set data type text using "username"::text;

alter table "public"."users" add constraint "users_username_check" CHECK (((length(username) > 4) AND (length(username) < 21))) not valid;

alter table "public"."users" validate constraint "users_username_check";

create or replace view "public"."private_user_view" as
  SELECT users.username,
    users.total_folowers,
    users.avatar_file_exists,
    users.cover_file_exists,
    users.email,
    users.id
   FROM users;


create or replace view "public"."public_user_view" as
  SELECT users.id,
    users.username,
    users.total_folowers,
    users.avatar_file_exists,
    users.cover_file_exists
   FROM users;


create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to anon
using (true);


create policy "Enable update for users based on id"
on "public"."users"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));

REVOKE ALL ON TABLE users FROM public;
