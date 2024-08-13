import { createClient } from '@/app/supabase/server'

export async function getUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw new Error(`Error receiving the user: ${error.message}`)
  }

  if (!data?.user) {
    throw new Error('The user was not found')
  }

  return data.user
}
