'use server'
export const getAvatars = async (userData) => {
  const avatarUrl = userData.avatar_file_path
    ? `${process.env.STORAGE_URL}/object/public/profile/${userData.avatar_file_path}`
    : null

  const coverUrl = userData.cover_file_path
    ? `${process.env.STORAGE_URL}/object/public/profile/${userData.cover_file_path}`
    : `/cover.svg`

  return { avatarUrl, coverUrl }
}
