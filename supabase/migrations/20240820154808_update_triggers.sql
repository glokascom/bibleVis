create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email, username)
  values (new.id, new.email, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;
