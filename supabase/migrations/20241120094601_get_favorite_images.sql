CREATE OR REPLACE FUNCTION public.get_favorite_images(user_id uuid, filter text DEFAULT NULL::text, orientation_param text DEFAULT NULL::text, sort text DEFAULT 'newest'::text, page integer DEFAULT 1, page_size integer DEFAULT 10)
 RETURNS TABLE(id integer, title character varying, preview text, url_slug character varying, orientation character varying, uploaded_at timestamp without time zone, file_sizes jsonb, original_file_path character varying, users_id uuid, users_username text, users_avatar_file_path text, is_ai_generated boolean, total_likes integer)
 LANGUAGE plpgsql
AS $function$
DECLARE
    order_field TEXT := 'uploaded_at';
    order_direction TEXT := 'DESC';
BEGIN
    IF sort = 'newest' THEN
        order_field := 'uploaded_at';
        order_direction := 'DESC';
    ELSIF sort = 'oldest' THEN
        order_field := 'uploaded_at';
        order_direction := 'ASC';
    ELSE
        order_field := 'total_likes';
        order_direction := 'DESC';
    END IF;

    RETURN QUERY EXECUTE format(
        'SELECT 
            images.id,
            images.title,
            images.preview, 
            images.url_slug,
            images.orientation, 
            images.uploaded_at,
            images.file_sizes,
            images.original_file_path,
            users.id AS users_id, 
            users.username AS users_username,  
            users.avatar_file_path AS users_avatar_file_path,
            images.is_ai_generated,
            images.total_likes
        FROM public.images
        JOIN public.users ON images.user_id = users.id 
        JOIN public.likes ON images.id = likes.image_id
        WHERE 
            likes.user_id = %L
            AND (%L IS NULL OR %L = ''all'' OR images.orientation = %L)
            AND (%L IS NULL OR %L = ''All'' OR (%L = ''AI Generated'' AND images.is_ai_generated = TRUE) 
            OR (%L = ''Made by human'' AND images.is_ai_generated = FALSE))
        ORDER BY %I %s
        LIMIT %s OFFSET %s',
        user_id,
        orientation_param, orientation_param, orientation_param,
        filter, filter, filter, filter,
        order_field, order_direction, 
        page_size, (page - 1) * page_size
    );
END;
$function$
;


