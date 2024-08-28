'use server'

import { getUser } from '@/app/actions/getUser'
import { supabaseService } from '@/app/supabase/service'

export async function toggleSubscription(followingUuid: string) {
  const followerUuid = (await getUser()).user.id
  const isFollowed = await checkIfSubscribed(followingUuid)

  if (isFollowed === null) {
    console.error('Error checking subscription status')
    return { error: 'Error checking subscription status', totalFollowers: 0 }
  }

  try {
    if (isFollowed) {
      // Удаление подписки
      const { error: deleteError } = await supabaseService
        .from('subscriptions')
        .delete()
        .eq('follower_id', followerUuid)
        .eq('following_id', followingUuid)

      if (deleteError) throw new Error('Error deleting subscription')

      // Получение текущего числа подписчиков
      const { data: userData, error: selectError } = await supabaseService
        .from('users')
        .select('total_followers')
        .eq('id', followingUuid)
        .single()

      if (selectError) throw new Error('Error retrieving user data')
      if (!userData) throw new Error('User data not found')
      //TODO:add trigger
      // Уменьшение числа подписчиков
      const newFollowersCount = userData.total_followers - 1
      const { error: updateError } = await supabaseService
        .from('users')
        .update({ total_followers: newFollowersCount })
        .eq('id', followingUuid)

      if (updateError) throw new Error('Error decreasing follower count')

      return { isFollowed: false, totalFollowers: newFollowersCount }
    } else {
      // Создание подписки
      const { error: insertError } = await supabaseService
        .from('subscriptions')
        .insert([{ follower_id: followerUuid, following_id: followingUuid }])

      if (insertError) throw new Error('Error creating subscription')

      // Получение текущего числа подписчиков
      const { data: userData, error: selectError } = await supabaseService
        .from('users')
        .select('total_followers')
        .eq('id', followingUuid)
        .single()

      if (selectError) throw new Error('Error retrieving user data')
      if (!userData) throw new Error('User data not found')
      //TODO:add trigger
      // Увеличение числа подписчиков
      const newFollowersCount = userData.total_followers + 1
      const { error: updateError } = await supabaseService
        .from('users')
        .update({ total_followers: newFollowersCount })
        .eq('id', followingUuid)

      if (updateError) throw new Error('Error increasing follower count')

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

export async function checkIfSubscribed(followingUuid: string): Promise<boolean> {
  const followerUuid = (await getUser()).user.id

  const { data, error } = await supabaseService
    .from('subscriptions')
    .select('id')
    .eq('follower_id', followerUuid)
    .eq('following_id', followingUuid)

  if (error) {
    console.error('Error checking subscription:', error)
    return false
  }

  return data && data.length > 0
}
