-- Создание таблицы ролей
CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" SERIAL PRIMARY KEY,
    "role_name" VARCHAR(50) NOT NULL UNIQUE
);

-- Добавление столбцов в существующую таблицу users
ALTER TABLE "public"."users"
    ADD COLUMN IF NOT EXISTS "username" VARCHAR(50) UNIQUE,
    ADD COLUMN IF NOT EXISTS "password_hash" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "role_id" INT DEFAULT 1,
    ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN IF NOT EXISTS "avatar_file_path" VARCHAR(255),
    ADD COLUMN IF NOT EXISTS "cover_file_path" VARCHAR(255),
    ADD CONSTRAINT "fk_users_roles" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id");


-- Создание таблицы изображений
CREATE TABLE IF NOT EXISTS "public"."images" (
    "id" SERIAL PRIMARY KEY,
    "user_id" UUID NOT NULL,
    "title" VARCHAR(140),
    "description" VARCHAR(200),
    "is_ai_generated" BOOLEAN DEFAULT false,
    "prompt" VARCHAR(200),
    "original_file_path" VARCHAR(255) NOT NULL,
    "medium_file_path" VARCHAR(255) NOT NULL,
    "small_file_path" VARCHAR(255) NOT NULL,
    "file_type" VARCHAR(50),
    "file_size" INT,
    "uploaded_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN DEFAULT false,
    CONSTRAINT "fk_images_users" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE
);

-- Включение RLS для таблицы изображений
ALTER TABLE "public"."images" ENABLE ROW LEVEL SECURITY;

-- Создание политики RLS для изображений
CREATE POLICY "user_images_policy"
ON "public"."images"
USING ("user_id" = current_user);

-- Создание таблицы тегов
CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE
);

-- Создание таблицы программного обеспечения
CREATE TABLE IF NOT EXISTS "public"."softwares" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE
);

-- Создание таблицы для связи изображений и тегов (многие ко многим)
CREATE TABLE IF NOT EXISTS "public"."image_tags" (
    "image_id" INT NOT NULL,
    "tag_id" INT NOT NULL,
    PRIMARY KEY ("image_id", "tag_id"),
    CONSTRAINT "fk_image_tags_images" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_image_tags_tags" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE CASCADE
);

-- Создание таблицы для связи изображений и программного обеспечения (многие ко многим)
CREATE TABLE IF NOT EXISTS "public"."image_softwares" (
    "image_id" INT NOT NULL,
    "software_id" INT NOT NULL,
    PRIMARY KEY ("image_id", "software_id"),
    CONSTRAINT "fk_image_softwares_images" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_image_softwares_softwares" FOREIGN KEY ("software_id") REFERENCES "public"."softwares"("id") ON DELETE CASCADE
);

-- Создание таблицы для лайков
CREATE TABLE IF NOT EXISTS "public"."likes" (
    "id" SERIAL PRIMARY KEY,
    "user_id" UUID NOT NULL,
    "image_id" INT NOT NULL,
    "liked_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_likes_users" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_likes_images" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE
);

-- Включение RLS для таблицы лайков
ALTER TABLE "public"."likes" ENABLE ROW LEVEL SECURITY;

-- Создание политики RLS для лайков
CREATE POLICY "user_likes_policy"
ON "public"."likes"
USING ("user_id" = current_user);

-- Создание таблицы подписок
CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" SERIAL PRIMARY KEY,
    "follower_id" UUID NOT NULL,
    "following_id" UUID NOT NULL,
    "subscribed_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_subscriptions_follower" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_subscriptions_following" FOREIGN KEY ("following_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    UNIQUE ("follower_id", "following_id")
);

-- Включение RLS для таблицы подписок
ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

-- Создание политики RLS для подписок
CREATE POLICY "user_subscriptions_policy"
ON "public"."subscriptions"
USING ("follower_id" = current_user);
