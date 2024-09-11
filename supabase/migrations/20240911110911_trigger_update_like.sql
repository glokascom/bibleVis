CREATE OR REPLACE FUNCTION update_total_likes() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.images
  SET total_likes = (
    SELECT COUNT(*)
    FROM public.likes
    WHERE image_id = NEW.image_id
  )
  WHERE id = NEW.image_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_likes_on_insert
AFTER INSERT OR DELETE ON public.likes
FOR EACH ROW
EXECUTE FUNCTION update_total_likes();



CREATE OR REPLACE FUNCTION update_total_followers() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET total_followers = (
    SELECT COUNT(*)
    FROM public.subscriptions
    WHERE following_id = NEW.following_id
  )
  WHERE id = NEW.following_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_followers_on_change
AFTER INSERT OR DELETE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_total_followers();
