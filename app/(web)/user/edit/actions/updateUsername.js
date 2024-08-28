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
  const { data, error: updateError } = await supabaseService
    .from('users')
    .update({ username: newUsername })
    .eq('id', user.id)
  if (updateError) {
    return { error: 'Error updating username: ' + updateError.message }
  }
  revalidatePath('/', 'layout')

  return { error: null, data }
}
