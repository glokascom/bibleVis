ALTER TABLE images
ALTER COLUMN "description" TYPE VARCHAR(1000),
ALTER COLUMN "prompt" TYPE VARCHAR(1000),
DROP COLUMN "medium_file_path",
DROP COLUMN "small_file_path";

INSERT INTO softwares ("name", "type")
VALUES
  ('Krea.ai', 'ai'),
  ('Other', 'ai');
