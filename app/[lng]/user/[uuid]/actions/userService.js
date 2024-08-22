import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export async function getUserInfoById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('username, avatar_file_exists, cover_file_exists, email')
    .eq('id', userId)

  if (error) {
    throw new Error('Error fetching username: ' + error.message)
  }
  return data[0] || null
}

export async function updateUsername(userId, newUsername) {
  try {
    const { error } = await getUser()
    if (error) throw new Error(error.message)
  } catch (err) {
    throw new Error(err.message || 'User is not authenticated.')
  }

  if (!newUsername) {
    throw new Error('New username cannot be empty.')
  }

  const { data, error: updateError } = await supabaseService
    .from('users')
    .update({ username: newUsername })
    .eq('id', userId)

  if (updateError) {
    throw new Error('Error updating username: ' + updateError.message)
  }

  return data
}
