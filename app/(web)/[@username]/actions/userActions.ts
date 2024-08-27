export async function checkSubscription(followerUuid: string, followingUuid: string) {
  const response = await fetch('/api/subscription/check', {
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
  const response = await fetch('/api/subscription/toggle', {
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
  return {
    isFollowed: data.isFollowed,
    totalFollowers: data.isFollowed ? 1 : -1, // Вернём инкремент или декремент
  }
}
