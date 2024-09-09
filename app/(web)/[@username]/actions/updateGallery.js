'use server'

import { revalidatePath } from 'next/cache'

import { deleteImage, toggleLike } from './imagesActions'

export async function updateGallery(options, userId, imageId) {
  try {
    if (options === 'toggleLike') {
      await toggleLike(userId, imageId)
    }
    if (options === 'deleteImage') {
      const { error } = await deleteImage(userId, imageId)
      if (error) {
        return { error: error.message }
      }
    }
    revalidatePath('/', 'layout')

    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}
