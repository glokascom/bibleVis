'use server'

import { revalidatePath } from 'next/cache'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'
import {
  checkUsernameAvailability,
  validateCharacters,
  validateContent,
  validateLength,
} from '@/app/utils/validation'

export async function updateUsername(newUsername) {
  const { user, error: userError } = await getUser()
  if (userError) {
    return { error: userError?.message || 'User is not authenticated.' }
  }

  if (!newUsername) {
    return { error: 'Username cannot be blank.' }
  }

  const lengthError = validateLength(newUsername)
  if (lengthError) {
    return { error: lengthError }
  }

  const characterError = validateCharacters(newUsername)
  if (characterError) {
    return { error: characterError }
  }

  const contentError = validateContent(newUsername)
  if (contentError) {
    return { error: contentError }
  }

  const { error: availabilityError } = await checkUsernameAvailability(
    newUsername,
    supabaseService
  )
  if (availabilityError) {
    return { error: availabilityError }
  }

  try {
    const { data, error: updateError } = await supabaseService
      .from('users')
      .update({ username: newUsername })
      .eq('id', user.id)

    if (updateError) {
      return { error: 'Error updating username: ' + updateError.message }
    }

    revalidatePath('/', 'layout')
    return { error: null, data }
  } catch (error) {
    console.error('Unexpected error during username update:', error)
    return { error: 'An unexpected error occurred. Please try again later.' }
  }
}
