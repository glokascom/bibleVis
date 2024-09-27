alter table images
add column fts tsvector;

create or replace function update_images_fts() 
returns trigger as $$
begin
  new.fts := to_tsvector('russian', 
    coalesce(new.description, '') || ' ' || 
    coalesce(new.title, '') || ' ' || 
    coalesce(
      (
        select string_agg(t.name, ' ')
        from image_tags it
        join tags t on t.id = it.tag_id
        where it.image_id = new.id
      ), ''
    )
  ) ||
  to_tsvector('english', 
    coalesce(new.description, '') || ' ' || 
    coalesce(new.title, '') || ' ' ||
    coalesce(
      (
        select string_agg(t.name, ' ')
        from image_tags it
        join tags t on t.id = it.tag_id
        where it.image_id = new.id
      ), ''
    )
  );
  return new;
end;
$$ language plpgsql;

create trigger trigger_update_images_fts
before insert or update on images
for each row
execute function update_images_fts();

create or replace function update_image_fts_on_tag_change() 
returns trigger as $$
begin
  update images
  set fts = to_tsvector('russian', 
    coalesce(description, '') || ' ' || 
    coalesce(title, '') || ' ' || 
    coalesce(
      (
        select string_agg(t.name, ' ')
        from image_tags it
        join tags t on t.id = it.tag_id
        where it.image_id = images.id
      ), ''
    )
  ) ||
  to_tsvector('english', 
    coalesce(description, '') || ' ' || 
    coalesce(title, '') || ' ' ||
    coalesce(
      (
        select string_agg(t.name, ' ')
        from image_tags it
        join tags t on t.id = it.tag_id
        where it.image_id = images.id
      ), ''
    )
  )
  where id = new.image_id;
  return new;
end;
$$ language plpgsql;

create trigger trigger_update_image_fts_on_tag_insert
after insert or delete on image_tags
for each row
execute function update_image_fts_on_tag_change();

create index images_fts on images using gin (fts);
