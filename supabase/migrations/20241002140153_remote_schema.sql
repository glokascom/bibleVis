alter table "auth"."identities" drop constraint "identities_pkey";

drop index if exists "auth"."identities_pkey";


