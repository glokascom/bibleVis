'use server'

import { revalidatePath } from 'next/cache'

export async function updateUploadImage() {
  try {
    revalidatePath('/upload-image', 'layout')
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}
