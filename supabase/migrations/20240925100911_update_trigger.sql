DROP TRIGGER IF EXISTS update_followers_on_change ON public.subscriptions;

CREATE OR REPLACE FUNCTION update_total_followers() 
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.users
    SET total_followers = total_followers + 1
    WHERE id = NEW.following_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.users
    SET total_followers = total_followers - 1
    WHERE id = OLD.following_id;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_followers_on_change
AFTER INSERT OR DELETE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_total_followers();
