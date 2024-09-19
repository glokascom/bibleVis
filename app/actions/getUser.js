import { createClient } from '@/app/supabase/server'
import { supabaseService } from '@/app/supabase/service'

import { getAvatars } from './getAvatars'

export async function getUser(includeAuthStatus = false) {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return includeAuthStatus
        ? { user: null, error, isAuthenticated: false }
        : { user: null, error }
    }

    if (!data?.user) {
      return includeAuthStatus
        ? {
            user: null,
            error: new Error('The user was not found'),
            isAuthenticated: false,
          }
        : { user: null, error: new Error('The user was not found') }
    }

    const { data: userData, error: userError } = await supabaseService
      .from('private_user_view')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (userError) {
      return includeAuthStatus
        ? { user: null, error: userError, isAuthenticated: false }
        : { user: null, error: userError }
    }

    const { avatarUrl, coverUrl } = await getAvatars(userData)
    const user = {
      ...userData,
      provider: data.user.app_metadata.provider,
      avatarUrl,
      coverUrl,
    }

    return includeAuthStatus
      ? { user, error: null, isAuthenticated: true }
      : { user, error: null }
  } catch (error) {
    return includeAuthStatus
      ? { user: null, error, isAuthenticated: false }
      : { user: null, error }
  }
}
