-- USERS
-- 1. Создание таблицы "users", если она не существует
CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "is_admin" boolean DEFAULT false NOT NULL,
    "is_blocked" boolean DEFAULT false NOT NULL
);

-- 2. Назначение владельца таблицы "users"
ALTER TABLE "public"."users" OWNER TO "postgres";

-- 3. Добавление первичного ключа для таблицы "users"
ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- 4. Добавление внешнего ключа, который связывает таблицу "users" с таблицей "auth.users" с каскадным удалением
ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey"
    FOREIGN KEY ("id")
    REFERENCES "auth"."users"("id")
    ON DELETE CASCADE;

-- 5. Включение политики Row Level Security для таблицы "users"
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

-- 6. Создание функции для обработки новых пользователей в таблице "auth.users"
CREATE OR REPLACE FUNCTION "public"."handle_new_user"() 
RETURNS "trigger"
LANGUAGE "plpgsql" 
SECURITY DEFINER
AS $$
  BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
  END;
$$;

-- 7. Создание триггера, который вызывает функцию "handle_new_user" при вставке в таблицу "auth.users"
CREATE OR REPLACE TRIGGER "on_auth_user_created" 
AFTER INSERT ON "auth"."users" 
FOR EACH ROW 
EXECUTE FUNCTION "public"."handle_new_user"();

-- 8. Назначение прав доступа для таблицы "users" различным ролям
GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";
