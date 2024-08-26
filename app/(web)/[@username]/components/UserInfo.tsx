'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

interface FollowUserInfo {
  id: string
  username: string
  total_followers: number
  avatar_file_exists: boolean
}

interface UserInfo {
  id: string
  username: string
}

interface UserInfoProps {
  isCurrentUser: boolean
  followUserInfo: FollowUserInfo
  userInfo: UserInfo
}

const UserInfo: React.FC<UserInfoProps> = ({
  isCurrentUser,
  userInfo,
  followUserInfo,
}) => {
  const [isFollowed, setIsFollowed] = useState(false)
  const [totalFollowers, setTotalFollowers] = useState(followUserInfo.total_followers)

  useEffect(() => {
    if (!isCurrentUser) {
      const checkSubscription = async () => {
        try {
          const response = await fetch('/api/subscription/check', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              followerUuid: userInfo.id,
              followingUuid: followUserInfo.id,
            }),
          })

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          const data = await response.json()
          setIsFollowed(data.isFollowed)
        } catch (error) {
          console.error('Failed to check subscription status:', error)
        }
      }

      checkSubscription()
    }
  }, [isCurrentUser, userInfo.id, followUserInfo.id])

  const handleToggleFollow = async () => {
    try {
      const response = await fetch('/api/subscription/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerUuid: userInfo.id,
          followingUuid: followUserInfo.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setIsFollowed(data.isFollowed)
      setTotalFollowers((prev) => (data.isFollowed ? prev + 1 : prev - 1))
    } catch (error) {
      console.error('Failed to toggle follow state:', error)
    }
  }

  const smallAvatar = followUserInfo.avatar_file_exists
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${followUserInfo.id}/avatars/small.jpg`
    : `/cover.svg`

  const largeAvatar = followUserInfo.avatar_file_exists
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${followUserInfo.id}/avatars/normal.jpg`
    : `/cover.svg`

  const [viewportWidth, setViewportWidth] = useState<number>(0)

  useEffect(() => {
    setViewportWidth(window.innerWidth)
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const imageSrc = viewportWidth <= 640 ? smallAvatar : largeAvatar

  return (
    <div className="h-full border-0 md:rounded-medium md:px-5 md:py-4 2xl:border 2xl:border-secondary-200">
      <div className="relative flex w-full flex-col items-center md:gap-3 2xl:gap-5">
        <BVAvatar
          className="absolute bottom-0 left-0 h-14 w-14 md:relative md:bottom-auto md:left-auto md:h-20 md:w-20 2xl:h-36 2xl:w-36"
          src={imageSrc}
          alt={`${followUserInfo.username}'s avatar`}
        />
        <div className="text-semixlarge font-bold">{followUserInfo.username}</div>
        <div className="flex flex-row-reverse items-center gap-1 xl:flex-col">
          <div className="text-small text-secondary-500">Followers</div>
          <div className="md:medium text-small">{totalFollowers}</div>
        </div>
      </div>
      <div>
        {isCurrentUser ? (
          <Link href="/user/edit">
            <BVButton fullWidth className="mt-5">
              Edit Profile
            </BVButton>
          </Link>
        ) : (
          <BVButton
            fullWidth
            color={isFollowed ? 'secondary' : 'primary'}
            className="mt-5"
            onClick={handleToggleFollow}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </BVButton>
        )}
      </div>
    </div>
  )
}

export default UserInfo