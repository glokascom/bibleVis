import { NextResponse } from 'next/server'

import { supabaseService } from '@/app/supabase/service'

import { checkIfSubscribed } from '../actions'

// Function to toggle subscription (follow/unfollow)
async function toggleSubscription(followerUuid: string, followingUuid: string) {
  // Check if the user is already subscribed
  const isFollowed = await checkIfSubscribed(followerUuid, followingUuid)

  if (isFollowed === null) {
    console.error('Error checking subscription status')
    return { error: 'Error checking subscription status' }
  }

  if (isFollowed) {
    // Delete the subscription
    const { error: deleteError } = await supabaseService
      .from('subscriptions')
      .delete()
      .eq('follower_id', followerUuid)
      .eq('following_id', followingUuid)

    if (deleteError) {
      console.error('Error deleting subscription:', deleteError)
      return { error: 'Error deleting subscription' }
    }

    // Get the current number of followers
    const { data: userData, error: selectError } = await supabaseService
      .from('users')
      .select('total_followers')
      .eq('id', followingUuid)
      .single()

    if (selectError) {
      console.error('Error retrieving user data:', selectError)
      return { error: 'Error retrieving user data' }
    }

    if (!userData) {
      console.error('User data not found')
      return { error: 'User data not found' }
    }

    // Decrease the follower count
    const { error: updateError } = await supabaseService
      .from('users')
      .update({ total_followers: userData.total_followers - 1 })
      .eq('id', followingUuid)

    if (updateError) {
      console.error('Error decreasing follower count:', updateError)
      return { error: 'Error decreasing follower count' }
    }

    return { isFollowed: false }
  } else {
    // Create a subscription
    const { error: insertError } = await supabaseService
      .from('subscriptions')
      .insert([{ follower_id: followerUuid, following_id: followingUuid }])

    if (insertError) {
      console.error('Error creating subscription:', insertError)
      return { error: 'Error creating subscription' }
    }

    // Get the current number of followers
    const { data: userData, error: selectError } = await supabaseService
      .from('users')
      .select('total_followers')
      .eq('id', followingUuid)
      .single()

    if (selectError) {
      console.error('Error retrieving user data:', selectError)
      return { error: 'Error retrieving user data' }
    }

    if (!userData) {
      console.error('User data not found')
      return { error: 'User data not found' }
    }

    // Increase the follower count
    const { error: updateError } = await supabaseService
      .from('users')
      .update({ total_followers: userData.total_followers + 1 })
      .eq('id', followingUuid)

    if (updateError) {
      console.error('Error increasing follower count:', updateError)
      return { error: 'Error increasing follower count' }
    }

    return { isFollowed: true }
  }
}

// POST request handler
export async function POST(request: Request) {
  const { followerUuid, followingUuid } = await request.json()

  const result = await toggleSubscription(followerUuid, followingUuid)

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json(result)
}
