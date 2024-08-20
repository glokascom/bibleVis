import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export async function getUsernameById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('username')
    .eq('id', userId)

  if (error) {
    throw new Error('Error fetching username: ' + error.message)
  }
  return data[0]?.username || null
}

export async function getAvatarFilePathById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('avatar_file_path')
    .eq('id', userId)

  if (error) {
    throw new Error('Error fetching avatar file path: ' + error.message)
  }

  return data[0]?.avatar_file_path || null
}

export async function getCoverFilePathById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('cover_file_path')
    .eq('id', userId)

  if (error) {
    throw new Error('Error fetching cover file path: ' + error.message)
  }

  return data[0]?.cover_file_path || null
}

export async function getEmailFilePathById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('email ')
    .eq('id', userId)
  if (error) {
    throw new Error('Error fetching email: ' + error.message)
  }

  return data[0]?.email || null
}

export async function updateUsername(userId, newUsername) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error } = await getUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('User is not authenticated.')
  }

  if (!newUsername) {
    throw new Error('New username cannot be empty.')
  }

  // Проверяем, существует ли уже новый username в базе данных
  const { data: existingUsers, error: checkError } = await supabaseService
    .from('users')
    .select('id')
    .eq('username', newUsername)

  if (checkError) {
    throw new Error('Error checking username existence: ' + checkError.message)
  }

  if (Array.isArray(existingUsers) && existingUsers.length > 0) {
    throw new Error('Username is already taken.')
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
