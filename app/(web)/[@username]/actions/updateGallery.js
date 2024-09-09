'use server'

import { revalidatePath } from 'next/cache'

import { deleteImage, toggleLike } from './imagesActions'

export async function updateGallery(options, imageId) {
  try {
    if (options === 'toggleLike') {
      await toggleLike(imageId)
    }
    if (options === 'deleteImage') {
      const { error } = await deleteImage(imageId)
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
