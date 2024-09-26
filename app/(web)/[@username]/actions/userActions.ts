'use server'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export async function getTotalFollowers(followingUuid: string): Promise<number | null> {
  try {
    const { data: userData, error: selectError } = await supabaseService
      .from('users')
      .select('total_followers')
      .eq('id', followingUuid)
      .single()

    if (selectError) throw new Error('Error retrieving user data')
    if (!userData) throw new Error('User data not found')

    return userData.total_followers
  } catch (error) {
    console.error('Error retrieving total followers:', error)
    return null
  }
}

export async function toggleSubscription(followingUuid: string) {
  const followerUuid = (await getUser()).user.id
  const isFollowed = await checkIfSubscribed(followingUuid)

  if (isFollowed === null) {
    return null
  }

  try {
    if (isFollowed) {
      const { error: deleteError } = await supabaseService
        .from('subscriptions')
        .delete()
        .eq('follower_id', followerUuid)
        .eq('following_id', followingUuid)

      if (deleteError) throw new Error('Error deleting subscription')

      const totalFollowers = await getTotalFollowers(followingUuid)
      if (totalFollowers === null) throw new Error('Failed to retrieve followers count')

      const newFollowersCount = totalFollowers - 1

      return { isFollowed: false, totalFollowers: newFollowersCount }
    } else {
      const { error: insertError } = await supabaseService
        .from('subscriptions')
        .insert([{ follower_id: followerUuid, following_id: followingUuid }])

      if (insertError) throw new Error('Error creating subscription')

      const totalFollowers = await getTotalFollowers(followingUuid)
      if (totalFollowers === null) throw new Error('Failed to retrieve followers count')

      const newFollowersCount = totalFollowers + 1

      return { isFollowed: true, totalFollowers: newFollowersCount }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return { error: error.message, totalFollowers: 0 }
    } else {
      console.error('Unknown error occurred')
      return { error: 'Unknown error occurred', totalFollowers: 0 }
    }
  }
}

export async function checkIfSubscribed(followingUuid: string): Promise<boolean | null> {
  try {
    const { user } = await getUser()
    if (!user) {
      console.error('User not found')
      return null
    }

    const followerUuid = user.id

    const { data, error } = await supabaseService
      .from('subscriptions')
      .select('id')
      .eq('follower_id', followerUuid)
      .eq('following_id', followingUuid)

    if (error) {
      console.error('Error checking subscription:', error)
      return null
    }

    return !!data?.length
  } catch (err) {
    console.error('Unexpected error:', err)
    return null
  }
}
