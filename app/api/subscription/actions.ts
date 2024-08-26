import { supabaseService } from '@/app/supabase/service'

// Check if the user is subscribed
export async function checkIfSubscribed(
  followerUuid: string,
  followingUuid: string
): Promise<boolean> {
  const { data, error } = await supabaseService
    .from('subscriptions')
    .select('id')
    .eq('follower_id', followerUuid)
    .eq('following_id', followingUuid)

  if (error) {
    console.error('Error checking subscription:', error)
    return false // Assume not subscribed in case of an error
  }

  return data && data.length > 0 // true if there are records, otherwise false
}
