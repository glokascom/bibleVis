-- Удалить все объекты в бакете, если они есть
DELETE FROM storage.objects WHERE bucket_id = 'profile';

-- Цикл, который будет ждать, пока все объекты не будут удалены
DO $$ 
DECLARE
    object_count INTEGER;
BEGIN
    LOOP
        -- Проверить, сколько объектов осталось в бакете
        SELECT COUNT(*) INTO object_count FROM storage.objects WHERE bucket_id = 'profile';

        -- Если объекты еще остаются, подождать 1 секунду и проверить снова
        IF object_count > 0 THEN
            PERFORM pg_sleep(1);
        ELSE
            -- Если объектов нет, выйти из цикла
            EXIT;
        END IF;
    END LOOP;
END $$;

-- Удалить существующий бакет, если он есть
DELETE FROM storage.buckets WHERE id = 'profile';

-- Создать новый бакет с публичным доступом
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile', 'profile', true);


-- Add unique constraint to email
ALTER TABLE public.users
ADD CONSTRAINT users_email_key UNIQUE (email);


ALTER TABLE public.users
  DROP COLUMN avatar_file_path,
  DROP COLUMN cover_file_path;

ALTER TABLE public.users
  ADD COLUMN avatar_file_exists BOOLEAN DEFAULT FALSE,
  ADD COLUMN cover_file_exists BOOLEAN DEFAULT FALSE;
