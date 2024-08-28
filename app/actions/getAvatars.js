'use server'
export const getAvatars = async (userData) => {
  const takenAt = new Date().toISOString()
  const avatarUrl = userData.avatar_file_exists
    ? `${process.env.STORAGE_URL}/object/public/profile/${userData.id}/avatars/normal.jpg?date=${takenAt}`
    : null
  const coverUrl = userData.cover_file_exists
    ? `${process.env.STORAGE_URL}/object/public/profile/${userData.id}/covers/original.jpg?date=${takenAt}`
    : '/cover.svg'

  return { avatarUrl, coverUrl }
}
