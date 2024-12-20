import sharp from 'sharp'

import { supabaseService } from '@/app/supabase/service'

import { getUser } from './getUser'

const BUCKET_NAME = 'profile'
const MAX_AVATAR_SIZE_MB = 2 // Максимальный размер аватара в мегабайтах
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024

function getCurrentTimestamp() {
  const date = new Date()

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}-${hours}${minutes}${seconds}`
}

async function uploadFile(fileBuffer, filePath, prefix) {
  if (!fileBuffer || !filePath || !prefix) {
    throw new Error('Missing required parameters')
  }
  const timestamp = getCurrentTimestamp()
  const uniqueFileName = `${prefix}_${timestamp}.jpg`
  const fullPath = `${filePath}/${uniqueFileName}`

  const { data, error } = await supabaseService.storage
    .from(BUCKET_NAME)
    .upload(fullPath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    })

  if (error) {
    throw new Error('Failed to upload file: ' + error.message)
  }

  return data.path
}

async function deleteFile(type) {
  if (!(await getUser())?.user?.id) {
    throw new Error('User is not authenticated.')
  }
  let path
  if (type === 'avatar') {
    path = (await getUser())?.user?.avatar_file_path
  } else if (type === 'cover') {
    path = (await getUser())?.user?.cover_file_path
  }
  if (path === null) {
    return
  }
  const { error } = await supabaseService.storage.from(BUCKET_NAME).remove([path])

  if (error) {
    throw new Error('Failed to delete file: ' + error.message)
  }
}

async function processAndUploadImage(fileBuffer, type, sizes) {
  if (!Buffer.isBuffer(fileBuffer)) {
    throw new Error('Invalid input file format.')
  }

  const results = []
  for (const { width, height } of sizes) {
    try {
      const buffer = await sharp(fileBuffer).resize(width, height).toBuffer()
      const { id: userId } = (await getUser()).user

      const filePath = `${userId}`
      const uploadedPath = await uploadFile(buffer, filePath, type)
      results.push({ path: uploadedPath })
    } catch (error) {
      console.error(`Error processing image:`, error)
      throw error
    }
  }

  return results
}

async function fileToBuffer(file) {
  if (!file) {
    console.error('File is missing or undefined')
    throw new Error('File is missing')
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    if (!buffer || buffer.length === 0) {
      throw new Error('Buffer is empty after conversion')
    }
    return buffer
  } catch (error) {
    console.error('Error during file to buffer conversion:', error)
    throw new Error('Failed to convert file to buffer: ' + error.message)
  }
}

async function updateAvatar(newAvatarFile) {
  const avatarType = 'avatar'
  let fileBuffer
  try {
    fileBuffer = await fileToBuffer(newAvatarFile)
    if (fileBuffer.length > MAX_AVATAR_SIZE_BYTES) {
      throw new Error(`Avatar size exceeds ${MAX_AVATAR_SIZE_MB} MB`)
    }
  } catch (bufferError) {
    console.error('Error converting file to buffer:', bufferError.message)
    throw new Error('Failed to convert file to buffer: ' + bufferError.message)
  }

  const { id: userId } = (await getUser()).user

  try {
    await deleteFile(avatarType)
  } catch (deleteError) {
    console.error('Error deleting old avatar:', deleteError.message)
    throw new Error('Failed to delete old avatar: ' + deleteError.message)
  }

  let uploadedPaths
  try {
    uploadedPaths = await processAndUploadImage(fileBuffer, avatarType, [
      { width: 100, height: 100 },
    ])
  } catch (processError) {
    console.error('Error processing and uploading new avatar:', processError.message)
    throw new Error('Failed to process and upload new avatar: ' + processError.message)
  }
  const avatarPath = uploadedPaths[0].path

  const { error: updateError } = await supabaseService
    .from('users')
    .update({ avatar_file_path: avatarPath })
    .eq('id', userId)

  if (updateError) {
    console.error('Error updating avatar file path:', updateError.message)
    throw new Error('Failed to update avatar file path: ' + updateError.message)
  }
}

async function updateCover(newCoverFile) {
  const coverType = 'cover'
  const { user, error } = await getUser()

  if (error) {
    throw new Error(error)
  }
  const userId = user.id

  let fileBuffer
  try {
    fileBuffer = await fileToBuffer(newCoverFile)
  } catch (bufferError) {
    console.error('Error converting file to buffer:', bufferError.message)
    throw new Error('Failed to convert file to buffer: ' + bufferError.message)
  }

  try {
    await deleteFile(coverType)
  } catch (deleteError) {
    console.error('Error deleting old cover:', deleteError.message)
    throw new Error('Failed to delete old cover: ' + deleteError.message)
  }

  let uploadedPaths
  try {
    uploadedPaths = await processAndUploadImage(fileBuffer, coverType, [
      { width: 1280, height: 400 },
    ])
  } catch (processError) {
    console.error('Error processing and uploading new cover:', processError.message)
    throw new Error('Failed to process and upload new cover: ' + processError.message)
  }

  const coverPath = uploadedPaths[0].path

  const { error: updateError } = await supabaseService
    .from('users')
    .update({ cover_file_path: coverPath })
    .eq('id', userId)

  if (updateError) {
    console.error('Error updating cover file path:', updateError.message)
    throw new Error('Failed to update cover file path: ' + updateError.message)
  }
}

async function uploadOriginalImage(imageFile) {
  const imageType = 'image'

  const { id: userId } = (await getUser()).user

  let fileBuffer
  try {
    fileBuffer = await fileToBuffer(imageFile)
  } catch (bufferError) {
    console.error('Error converting file to buffer:', bufferError.message)
    throw new Error('Failed to convert file to buffer: ' + bufferError.message)
  }

  const filePath = `${userId}/images`

  let uploadedPath
  try {
    uploadedPath = await uploadFile(fileBuffer, filePath, imageType)
  } catch (uploadError) {
    console.error('Error uploading original image:', uploadError.message)
    throw new Error('Failed to upload original image: ' + uploadError.message)
  }

  const buffer = await sharp(fileBuffer).resize(8, 8).toBuffer()

  const base64Image = buffer.toString('base64')

  return { uploadedPath, blurPreview: base64Image }
}

export { updateAvatar, updateCover, uploadOriginalImage }
