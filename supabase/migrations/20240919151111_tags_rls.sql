CREATE OR REPLACE FUNCTION public.authorized() 
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $$
DECLARE
    access INT;
BEGIN
    SELECT COUNT(id) INTO access
    FROM public.users
    WHERE users.id = auth.uid() AND users.is_blocked IS NOT TRUE;
    RETURN access > 0;
END;
$$;

ALTER FUNCTION public.authorized() OWNER TO postgres;
GRANT ALL ON FUNCTION public.authorized() TO authenticated;

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.softwares ENABLE ROW LEVEL SECURITY;

CREATE POLICY read_all_tags ON public.tags FOR SELECT USING (true);
CREATE POLICY read_all_softwares ON public.softwares  FOR SELECT USING (true);

CREATE POLICY softwares_insert_authorized ON public.softwares FOR INSERT TO authenticated WITH CHECK (public.authorized());
CREATE POLICY softwares_update_authorized ON public.softwares FOR UPDATE TO authenticated USING (public.authorized());
CREATE POLICY softwares_delete_authorized ON public.softwares FOR DELETE TO authenticated USING (public.authorized());

CREATE POLICY tags_insert_authorized ON public.tags FOR INSERT TO authenticated WITH CHECK (public.authorized());
CREATE POLICY tags_update_authorized ON public.tags FOR UPDATE TO authenticated USING (public.authorized());
CREATE POLICY tags_delete_authorized ON public.tags FOR DELETE TO authenticated USING (public.authorized());
