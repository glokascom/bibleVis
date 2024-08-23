import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

async function updateUsername(userId, newUsername) {
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

export async function POST(request) {
  try {
    const { userId, newUsername } = await request.json()

    const result = await updateUsername(userId, newUsername)

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    })
  }
}
