import { supabaseService } from '@/app/supabase/service'

import { createClient } from '../supabase/server'

const BUCKET_NAME = 'profile'

async function uploadFile(userId, file, type) {
  if (!userId || !file || !type) {
    throw new Error('Missing required parameters')
  }

  const folderPath = `${userId}/${type}`
  const filePath = `${folderPath}/${file.name}`

  const { data, error } = await supabaseService.storage
    .from(BUCKET_NAME)
    .upload(filePath, file)

  if (error) {
    throw new Error('Failed to upload file: ' + error.message)
  }

  return data.path
}

async function deleteFile(userId, type, filename) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    const currentUserId = data.user.id

    if (userId !== currentUserId) {
      throw new Error('Unauthorized action')
    }

    if (error) throw new Error(error.message)
  } catch (err) {
    throw new Error(err.message || 'User is not authenticated.')
  }

  const filePath = `${userId}/${type}/${filename}`

  const { error } = await supabaseService.storage.from(BUCKET_NAME).remove([filePath])

  if (error) {
    throw new Error('Failed to delete file: ' + error.message)
  }

  return true
}
async function updateAvatar(userId, newAvatarFile) {
  const avatarType = 'avatars'
  const { data, error } = await supabaseService
    .from('users')
    .select('avatar_file_path')
    .eq('id', userId)

  if (error) {
    throw new Error('User not found: ' + error.message)
  }

  const oldAvatarPath = data[0]?.avatar_file_path
  if (oldAvatarPath) {
    const oldFilename = oldAvatarPath.split('/').pop()

    await deleteFile(userId, avatarType, oldFilename)
  }

  const newAvatarPath = await uploadFile(userId, newAvatarFile, avatarType)

  const { error: updateError } = await supabaseService
    .from('users')
    .update({ avatar_file_path: newAvatarPath })
    .eq('id', userId)

  if (updateError) {
    throw new Error('Failed to update avatar URL: ' + updateError.message)
  }

  return newAvatarPath
}

async function updateCover(userId, newCoverFile) {
  const coverType = 'covers'

  const { data, error } = await supabaseService
    .from('users')
    .select('cover_file_path')
    .eq('id', userId)
  if (error) {
    throw new Error('User not found: ' + error.message)
  }

  const oldCoverPath = data[0]?.cover_file_path
  if (oldCoverPath) {
    const oldFilename = oldCoverPath.split('/').pop()
    await deleteFile(userId, coverType, oldFilename)
  }

  const newCoverPath = await uploadFile(userId, newCoverFile, coverType)

  const { error: updateError } = await supabaseService
    .from('users')
    .update({ cover_file_path: newCoverPath })
    .eq('id', userId)

  if (updateError) {
    throw new Error('Failed to update cover URL: ' + updateError.message)
  }

  return newCoverPath
}

export { updateAvatar, updateCover, deleteFile }
