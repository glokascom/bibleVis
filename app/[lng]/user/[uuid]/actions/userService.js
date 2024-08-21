import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export async function getUserInfoById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('username, avatar_file_path, cover_file_path, email')
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

export async function updateAvatarFilePath(userId, newAvatarFilePath) {
  try {
    const { error } = await getUser()
    if (error) throw new Error(error.message)
  } catch (err) {
    throw new Error(err.message || 'User is not authenticated.')
  }

  const { data, error: updateError } = await supabaseService
    .from('users')
    .update({ avatar_file_path: newAvatarFilePath })
    .eq('id', userId)

  if (updateError) {
    throw new Error('Error updating avatar file path: ' + updateError.message)
  }

  return data
}

export async function updateCoverFilePath(userId, newCoverFilePath) {
  try {
    const { error } = await getUser()
    if (error) throw new Error(error.message)
  } catch (err) {
    throw new Error(err.message || 'User is not authenticated.')
  }

  const { data, error: updateError } = await supabaseService
    .from('users')
    .update({ cover_file_path: newCoverFilePath })
    .eq('id', userId)

  if (updateError) {
    throw new Error('Error updating cover file path: ' + updateError.message)
  }

  return data
}
