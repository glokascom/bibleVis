import { NextResponse } from 'next/server'

import { checkIfSubscribed } from '../actions'

export async function POST(request: Request) {
  const { followerUuid, followingUuid } = await request.json()

  // Get the boolean value indicating whether the user is followed
  const isFollowed = await checkIfSubscribed(followerUuid, followingUuid)

  // Return a response with the result of the subscription check
  return NextResponse.json({ isFollowed })
}
