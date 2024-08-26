CREATE OR REPLACE FUNCTION update_username_with_email()
RETURNS void AS $$
DECLARE
    email_prefix text;
    new_username text;
BEGIN
    FOR email_prefix IN
        SELECT split_part(email, '@', 1) FROM public.users WHERE username IS NULL
    LOOP
        IF length(email_prefix) < 5 THEN
            new_username := email_prefix || '1';
            WHILE length(new_username) < 5 LOOP
                new_username := new_username || '1';
            END LOOP;
        ELSIF length(email_prefix) > 20 THEN
            new_username := substring(email_prefix from 1 for 20);
        ELSE
            new_username := email_prefix;
        END IF;
        
        UPDATE public.users
        SET username = new_username
        WHERE email_prefix = split_part(email, '@', 1) AND username IS NULL;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
