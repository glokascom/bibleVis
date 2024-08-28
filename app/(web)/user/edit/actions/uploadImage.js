'use server'

import { revalidatePath } from 'next/cache'

import { updateAvatar, updateCover } from '@/app/actions/bucketService'

export async function uploadImage(formData) {
  try {
    if (formData.get('avatar')) {
      await updateAvatar(formData.get('avatar'))
    }
    if (formData.get('cover')) {
      await updateCover(formData.get('cover'))
    }
    revalidatePath('/', 'layout')

    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}
