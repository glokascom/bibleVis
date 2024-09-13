'use server'

import { revalidatePath } from 'next/cache'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export async function updateUsername(newUsername) {
  const { user, error: userError } = await getUser()
  if (userError) {
    return { error: userError?.message || 'User is not authenticated.' }
  }
  if (!newUsername) {
    return { error: 'New username cannot be empty.' }
  }

  try {
    const { data, error: updateError } = await supabaseService
      .from('users')
      .update({ username: newUsername })
      .eq('id', user.id)

    if (updateError) {
      if (updateError.code === '23505') {
        return { error: 'Username already taken. Please try another.' }
      }
      return { error: 'Error updating username: ' + updateError.message }
    }

    revalidatePath('/', 'layout')
    return { error: null, data }
  } catch (error) {
    console.error('Unexpected error during username update:', error)
    return { error: 'An unexpected error occurred. Please try again later.' }
  }
}
