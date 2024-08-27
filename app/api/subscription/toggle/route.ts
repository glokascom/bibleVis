import { ApiError } from 'next/dist/server/api-utils'

import { supabaseService } from '@/app/supabase/service'
import { ApiResponse } from '@/app/types/api'
import { ToggleSubscriptionResult } from '@/app/types/subscription'

import { jsonResponse } from '../../response'
import { checkIfSubscribed } from '../actions'

// Function to toggle subscription (follow/unfollow)
async function toggleSubscription(
  followerUuid: string,
  followingUuid: string
): Promise<ToggleSubscriptionResult> {
  // Check if the user is already subscribed
  const isFollowed = await checkIfSubscribed(followerUuid, followingUuid)

  if (isFollowed === null) {
    console.error('Error checking subscription status')
    return { error: 'Error checking subscription status' }
  }

  try {
    if (isFollowed) {
      // Delete the subscription
      const { error: deleteError } = await supabaseService
        .from('subscriptions')
        .delete()
        .eq('follower_id', followerUuid)
        .eq('following_id', followingUuid)

      if (deleteError) throw new Error('Error deleting subscription')

      // Get the current number of followers
      const { data: userData, error: selectError } = await supabaseService
        .from('users')
        .select('total_followers')
        .eq('id', followingUuid)
        .single()

      if (selectError) throw new Error('Error retrieving user data')
      if (!userData) throw new Error('User data not found')

      // Decrease the follower count
      const { error: updateError } = await supabaseService
        .from('users')
        .update({ total_followers: userData.total_followers - 1 })
        .eq('id', followingUuid)

      if (updateError) throw new Error('Error decreasing follower count')

      return { isFollowed: false }
    } else {
      // Create a subscription
      const { error: insertError } = await supabaseService
        .from('subscriptions')
        .insert([{ follower_id: followerUuid, following_id: followingUuid }])

      if (insertError) throw new Error('Error creating subscription')

      // Get the current number of followers
      const { data: userData, error: selectError } = await supabaseService
        .from('users')
        .select('total_followers')
        .eq('id', followingUuid)
        .single()

      if (selectError) throw new Error('Error retrieving user data')
      if (!userData) throw new Error('User data not found')

      // Increase the follower count
      const { error: updateError } = await supabaseService
        .from('users')
        .update({ total_followers: userData.total_followers + 1 })
        .eq('id', followingUuid)

      if (updateError) throw new Error('Error increasing follower count')

      return { isFollowed: true }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return { error: error.message }
    } else {
      console.error('Unknown error occurred')
      return { error: 'Unknown error occurred' }
    }
  }
}

export async function POST(request: Request) {
  try {
    const { followerUuid, followingUuid } = await request.json()

    const result: ToggleSubscriptionResult = await toggleSubscription(
      followerUuid,
      followingUuid
    )

    if (result.error) {
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message: result.error || 'An unknown error occurred.',
      }
      return jsonResponse(errorResponse, 400)
    }

    const successResponse: ApiResponse<{ isFollowed: boolean }> = {
      status: 'success',
      data: { isFollowed: result.isFollowed ?? false },
    }
    return jsonResponse(successResponse, 200)
  } catch (err) {
    console.error(err)
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: 'An unexpected error occurred.',
    }
    return jsonResponse(errorResponse, 500)
  }
}
