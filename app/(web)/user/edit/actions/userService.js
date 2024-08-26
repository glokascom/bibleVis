import { supabaseService } from '@/app/supabase/service'

export async function getUserInfoById(userId) {
  const { data, error } = await supabaseService
    .from('users')
    .select('id, username, avatar_file_exists, cover_file_exists, email')
    .eq('id', userId)

  if (error) {
    throw new Error('Error fetching username: ' + error.message)
  }
  return data[0] || null
}

export async function getUserInfoByUsername(username) {
  const { data, error } = await supabaseService
    .from('users')
    .select('id,username, avatar_file_exists, cover_file_exists, total_followers')
    .eq('username', username)

  if (error) {
    throw new Error('Error fetching username: ' + error.message)
  }
  return data[0] || null
}
