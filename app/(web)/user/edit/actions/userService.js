import { getAvatars } from '@/app/actions/getAvatars'
import { createClient } from '@/app/supabase/server'

export async function getUserInfoById(userId) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('private_user_view')
    .select('*')
    .eq('id', userId)

  if (error) {
    throw new Error('Error fetching username: ' + error.message)
  }

  if (error) {
    throw new Error('Error fetching username: ' + error.message)
  }
  return data[0] || null
}

export async function getUserByUsername(username) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('public_user_view')
    .select('*')
    .eq('username', username)

  if (error) {
    throw new Error('Error fetching username: ' + error.message)
  }
  if (data.length === 0) {
    throw new Error('Error fetching username: user not found')
  } else {
    const { avatarUrl, coverUrl } = await getAvatars(data[0])
    return { ...data[0], avatarUrl, coverUrl }
  }
}
