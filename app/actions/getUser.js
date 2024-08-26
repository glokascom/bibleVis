import { createClient } from '@/app/supabase/server'

export async function getUser() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return { user: null, error }
    }

    if (!data?.user) {
      return { user: null, error: new Error('The user was not found') }
    }

    const { data: userData, error: userError } = await supabase
      .from('private_user_view')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (error) {
      return { user: null, error: userError }
    }

    return {
      user: { ...userData, provider: data.user.app_metadata.provider },
      error: null,
    }
  } catch (error) {
    return { user: null, error }
  }
}
