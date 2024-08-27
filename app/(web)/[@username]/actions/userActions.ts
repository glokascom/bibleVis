'use server'

import { headers } from 'next/headers'

import { ApiResponse } from '@/app/types/api'

export async function checkSubscription(followerUuid: string, followingUuid: string) {
  const headersList = headers()
  const origin = headersList.get('origin')
  const response = await fetch(`${origin}/api/subscription/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      followerUuid,
      followingUuid,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  return data.isFollowed
}

export async function toggleFollow(followerUuid: string, followingUuid: string) {
  const headersList = headers()
  const origin = headersList.get('origin')

  const response = await fetch(`${origin}/api/subscription/toggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      followerUuid,
      followingUuid,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data: ApiResponse<{ isFollowed: boolean }> = await response.json()

  if (data.status === 'error') {
    throw new Error(data.message || 'An unknown error occurred')
  }

  if (data.status === 'success') {
    return {
      isFollowed: data.data.isFollowed,
      totalFollowers: data.data.isFollowed ? 1 : -1,
    }
  }

  throw new Error('Unexpected response format')
}
