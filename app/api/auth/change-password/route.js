import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export async function POST(request) {
  const { email, oldPassword, newPassword } = await request.json()

  try {
    await getUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ error: 'User is not authenticated.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!email || !oldPassword || !newPassword) {
    return new Response(
      JSON.stringify({ error: 'Email, oldPassword, and newPassword are required.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const { error: signInError } = await supabaseService.auth.signInWithPassword({
    email,
    password: oldPassword,
  })

  if (signInError) {
    return new Response(JSON.stringify({ error: 'Invalid credentials.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { error: updateError } = await supabaseService.auth.updateUser({
    password: newPassword,
  })

  if (updateError) {
    return new Response(JSON.stringify({ error: 'Failed to update password.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ message: 'Password updated successfully.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}