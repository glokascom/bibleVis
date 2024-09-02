import { createClient } from '@/app/supabase/server'
import { supabaseService } from '@/app/supabase/service'

import { getAvatars } from './getAvatars'

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

    const { data: userData, error: userError } = await supabaseService
      .from('private_user_view')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (error) {
      return { user: null, error: userError }
    }
    const { avatarUrl, coverUrl } = await getAvatars(userData)
    return {
      user: {
        ...userData,
        provider: data.user.app_metadata.provider,
        avatarUrl,
        coverUrl,
      },
      error: null,
    }
  } catch (error) {
    return { user: null, error }
  }
}
