CREATE OR REPLACE FUNCTION increment_views(image_id integer)
RETURNS void AS $$
BEGIN
    UPDATE images
    SET total_views = total_views + 1
    WHERE id = image_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION increment_downloads(src text)
RETURNS void AS $$
BEGIN
    UPDATE images
    SET total_downloads = total_downloads + 1
    WHERE original_file_path = src;
END;
$$ LANGUAGE plpgsql;
