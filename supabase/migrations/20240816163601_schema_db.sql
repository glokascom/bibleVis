CREATE OR REPLACE FUNCTION gen_random_slug() RETURNS VARCHAR AS $$
DECLARE
    slug VARCHAR := '';
BEGIN
    -- Generate random text of 10 characters from letters and numbers
    slug := substring(translate(encode(gen_random_bytes(6), 'base64'), '/+', 'ab'), 1, 10);
    RETURN slug;
END;
$$ LANGUAGE plpgsql;


-- Add columns to the existing users table
ALTER TABLE "public"."users"
    ADD COLUMN IF NOT EXISTS "is_creator" BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS "is_admin" BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS "username" VARCHAR(50) UNIQUE,
    ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN IF NOT EXISTS "avatar_file_path" VARCHAR(255) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS "cover_file_path" VARCHAR(255) DEFAULT NULL;

-- Create the images table
CREATE TABLE IF NOT EXISTS "public"."images" (
    "id" SERIAL PRIMARY KEY,
    "url_slug" VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_slug(),
    "user_id" UUID NOT NULL,
    "title" VARCHAR(140) DEFAULT '' NOT NULL,
    "description" VARCHAR(280) DEFAULT '' NOT NULL,
    "is_ai_generated" BOOLEAN DEFAULT TRUE,
    "prompt" VARCHAR(280) DEFAULT '' NOT NULL,
    "original_file_path" VARCHAR(280) DEFAULT '' NOT NULL,
    "medium_file_path" VARCHAR(280) DEFAULT '' NOT NULL,
    "small_file_path" VARCHAR(280) DEFAULT '' NOT NULL,
    "file_type" VARCHAR(50) DEFAULT 'image' NOT NULL,
    "file_size" INT DEFAULT 0 NOT NULL,
    "uploaded_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "orientation" VARCHAR(10) NOT NULL DEFAULT 'unknown' CHECK (orientation IN ('horizontal', 'vertical', 'unknown')),  -- Strict list of allowed values
    CONSTRAINT "fk_images_users" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE
);

-- Enable RLS for the images table
ALTER TABLE "public"."images" ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for images
CREATE POLICY "user_images_policy"
ON "public"."images"
USING ("user_id" = auth.uid());

-- Create the tags table
CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE
);

-- Enable RLS for the tags table
ALTER TABLE "public"."tags" ENABLE ROW LEVEL SECURITY;  

-- Create the softwares table
CREATE TABLE IF NOT EXISTS "public"."softwares" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE
);

-- Enable RLS for the softwares table
ALTER TABLE "public"."softwares" ENABLE ROW LEVEL SECURITY; 

-- Create the image_tags join table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS "public"."image_tags" (
    "image_id" INT NOT NULL,
    "tag_id" INT NOT NULL,
    PRIMARY KEY ("image_id", "tag_id"),
    CONSTRAINT "fk_image_tags_images" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_image_tags_tags" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE CASCADE
);

-- Enable RLS for the image_tags table
ALTER TABLE "public"."image_tags" ENABLE ROW LEVEL SECURITY;

-- Create the image_softwares join table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS "public"."image_softwares" (
    "image_id" INT NOT NULL,
    "software_id" INT NOT NULL,
    PRIMARY KEY ("image_id", "software_id"),
    CONSTRAINT "fk_image_softwares_images" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_image_softwares_softwares" FOREIGN KEY ("software_id") REFERENCES "public"."softwares"("id") ON DELETE CASCADE
);

-- Enable RLS for the image_softwares table
ALTER TABLE "public"."image_softwares" ENABLE ROW LEVEL SECURITY;

-- Create the likes table
CREATE TABLE IF NOT EXISTS "public"."likes" (
    "id" SERIAL PRIMARY KEY,
    "user_id" UUID NOT NULL,
    "image_id" INT NOT NULL,
    "liked_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_likes_users" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_likes_images" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE
);

-- Enable RLS for the likes table
ALTER TABLE "public"."likes" ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for likes
CREATE POLICY "user_likes_policy"
ON "public"."likes"
USING ("user_id" = auth.uid());

-- Create the subscriptions table
CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" SERIAL PRIMARY KEY,
    "follower_id" UUID NOT NULL,
    "following_id" UUID NOT NULL,
    "subscribed_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_subscriptions_follower" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_subscriptions_following" FOREIGN KEY ("following_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    UNIQUE ("follower_id", "following_id")
);

-- Enable RLS for the subscriptions table
ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for subscriptions
CREATE POLICY "user_subscriptions_policy"
ON "public"."subscriptions"
USING ("follower_id" = auth.uid());

-- Create the image views table
CREATE TABLE IF NOT EXISTS "public"."image_views" (
    "id" SERIAL PRIMARY KEY,
    "image_id" INT NOT NULL,
    "viewed_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "viewer_id" UUID, -- can be NULL if viewed by an unauthorized user
    CONSTRAINT "fk_image_views_images" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE
);

-- Enable RLS for the image views table
ALTER TABLE "public"."image_views" ENABLE ROW LEVEL SECURITY;   

-- Create the image downloads table
CREATE TABLE IF NOT EXISTS "public"."image_downloads" (
    "id" SERIAL PRIMARY KEY,
    "image_id" INT NOT NULL,
    "downloaded_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "downloader_id" UUID, -- can be NULL if downloaded by an unauthorized user
    CONSTRAINT "fk_image_downloads_images" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE
);

-- Enable RLS for the image downloads table
ALTER TABLE "public"."image_downloads" ENABLE ROW LEVEL SECURITY;
