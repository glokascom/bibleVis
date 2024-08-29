import sharp from 'sharp'

import { supabaseService } from '@/app/supabase/service'

import { createClient } from '../supabase/server'
import { getUser } from './getUser'

const BUCKET_NAME = 'profile'
const MAX_AVATAR_SIZE_MB = 2 // Максимальный размер аватара в мегабайтах
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024 // Конвертация мегабайт в байты

async function uploadFile(userId, fileBuffer, filePath) {
  if (!userId || !fileBuffer || !filePath) {
    throw new Error('Missing required parameters')
  }

  // Загрузка файла в бакет
  const { data, error } = await supabaseService.storage
    .from(BUCKET_NAME)
    .upload(filePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    })

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

async function processAndUploadImage(userId, fileBuffer, type, sizes) {
  if (!Buffer.isBuffer(fileBuffer)) {
    throw new Error('Invalid input file format.')
  }

  const results = []

  for (const { width, height, suffix } of sizes) {
    try {
      // Resize the image and convert it to a buffer
      const buffer = await sharp(fileBuffer).resize(width, height).toBuffer()

      // Form the upload path
      const filePath = `${userId}/${type}/${suffix}.jpg`
      const uploadedPath = await uploadFile(userId, buffer, filePath)

      results.push({ suffix, path: uploadedPath })
    } catch (error) {
      console.error(`Error processing image ${suffix}:`, error)
      throw error // Rethrow the error to abort the function on failure
    }
  }

  return results
}

async function fileToBuffer(file) {
  if (!file) {
    throw new Error('File is missing')
  }
  return Buffer.from(await file.arrayBuffer())
}

async function updateAvatar(newAvatarFile) {
  const { user, error: userError } = await getUser()
  if (userError) {
    console.error('Error getting user:', userError.message)
    throw new Error(userError?.message || 'User is not authenticated.')
  }
  const avatarType = 'avatars'

  // Convert image to buffer
  let fileBuffer
  try {
    fileBuffer = await fileToBuffer(newAvatarFile)

    // Check avatar file size
    if (fileBuffer.length > MAX_AVATAR_SIZE_BYTES) {
      throw new Error(`Avatar size exceeds ${MAX_AVATAR_SIZE_MB} MB`)
    }
  } catch (bufferError) {
    console.error('Error converting file to buffer:', bufferError.message)
    throw new Error('Failed to convert file to buffer: ' + bufferError.message)
  }

  try {
    await processAndUploadImage(user.id, fileBuffer, avatarType, [
      { width: 100, height: 100, suffix: 'normal' },
      { width: 35, height: 35, suffix: 'small' },
    ])
  } catch (processError) {
    console.error('Error processing and uploading new avatar:', processError.message)
    throw new Error('Failed to process and upload new avatar: ' + processError.message)
  }

  // Update avatar existence flag in the database
  const { error: updateError } = await supabaseService
    .from('users')
    .update({ avatar_file_exists: true })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating avatar existence flag:', updateError.message)
    throw new Error('Failed to update avatar existence flag: ' + updateError.message)
  }
}

async function updateCover(newCoverFile) {
  const { user, error: userError } = await getUser()
  if (userError) {
    console.error('Error getting user:', userError.message)
    throw new Error(userError?.message || 'User is not authenticated.')
  }
  const coverType = 'covers'

  // Convert image to buffer
  let fileBuffer
  try {
    fileBuffer = await fileToBuffer(newCoverFile)
  } catch (bufferError) {
    console.error('Error converting file to buffer:', bufferError.message)
    throw new Error('Failed to convert file to buffer: ' + bufferError.message)
  }

  try {
    await processAndUploadImage(user.id, fileBuffer, coverType, [
      { width: 1280, height: 400, suffix: 'original' },
      { width: 384, height: 120, suffix: 'mobile' },
    ])
  } catch (processError) {
    console.error('Error processing and uploading new cover:', processError.message)
    throw new Error('Failed to process and upload new cover: ' + processError.message)
  }

  // Update cover existence flag in the database
  const { error: updateError } = await supabaseService
    .from('users')
    .update({ cover_file_exists: true })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating cover existence flag:', updateError.message)
    throw new Error('Failed to update cover existence flag: ' + updateError.message)
  }
}

export { updateAvatar, updateCover, deleteFile }
