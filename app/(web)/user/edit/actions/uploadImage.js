'use server'

import { revalidatePath } from 'next/cache'

import { updateAvatar, updateCover } from '@/app/actions/bucketService'

export async function uploadImage(formData) {
  const uuid = formData.get('uuid')
  if (!uuid) {
    return { error: 'UUID is missing' }
  }

  try {
    if (formData.get('avatar')) {
      await updateAvatar(uuid, formData.get('avatar'))
    }
    if (formData.get('cover')) {
      await updateCover(uuid, formData.get('cover'))
    }
    revalidatePath('/', 'layout')

    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}
