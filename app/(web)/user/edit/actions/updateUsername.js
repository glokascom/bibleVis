'use server'

import { revalidatePath } from 'next/cache'

import { Filter } from 'bad-words'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

const filter = new Filter()

export async function updateUsername(newUsername) {
  const { user, error: userError } = await getUser()
  if (userError) {
    return { error: userError?.message || 'User is not authenticated.' }
  }

  if (!newUsername) {
    return { error: 'Username cannot be blank.' }
  }

  if (newUsername.length < 5 || newUsername.length > 20) {
    return { error: 'Username must be between 5 and 20 characters long.' }
  }

  const validUsernameRegex = /^[a-zA-Z0-9_]+$/
  if (!validUsernameRegex.test(newUsername)) {
    return {
      error:
        'Only letters A-Z, a-z, numbers or underscore please (no spaces or special characters).',
    }
  }

  if (filter.isProfane(newUsername)) {
    return {
      error:
        'This username contains inappropriate language. Please choose a different one.',
    }
  }

  try {
    const { data: existingUsers, error: searchError } = await supabaseService
      .from('users')
      .select('*')
      .eq('username', newUsername)

    if (searchError) {
      return { error: 'Error searching for existing username: ' + searchError.message }
    }

    if (existingUsers.length > 0) {
      return { error: 'This username is already taken.' }
    }

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
