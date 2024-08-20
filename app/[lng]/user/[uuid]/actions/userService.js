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

  return data[0].avatar_file_path || null
}

export async function getCoverFilePathById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('cover_file_path')
    .eq('id', userId)

  if (error) {
    throw new Error('Error fetching cover file path: ' + error.message)
  }

  return data[0].cover_file_path || null
}

export async function getEmailFilePathById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('email ')
    .eq('id', userId)
  if (error) {
    throw new Error('Error fetching email: ' + error.message)
  }

  return data[0].email || null
}
