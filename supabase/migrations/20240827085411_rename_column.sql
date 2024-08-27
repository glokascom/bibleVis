-- Удаление старого столбца total_folowers
ALTER TABLE public.users
DROP COLUMN total_folowers;

-- Добавление нового столбца total_followers
ALTER TABLE public.users
ADD COLUMN total_followers integer null default 0;
