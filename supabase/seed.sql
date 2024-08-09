--Добавляем миграции, связанные с ошибкой авторизации
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.schema_migrations WHERE version = '20221125140132') THEN
        INSERT INTO auth.schema_migrations(version) VALUES ('20221125140132');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.schema_migrations WHERE version = '20221208132122') THEN
        INSERT INTO auth.schema_migrations(version) VALUES ('20221208132122');
    END IF;
END $$;
