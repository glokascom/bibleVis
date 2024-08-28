'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'
import { UserInfoProps } from '@/app/types/subscription'

import { toggleSubscription } from '../actions/userActions'

const UserInfo: React.FC<UserInfoProps> = ({
  isCurrentUser,
  followUserInfo,
  initialIsFollowed,
  userInfo,
}) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(initialIsFollowed || false)
  const [totalFollowers, setTotalFollowers] = useState(followUserInfo.total_followers)

  const handleToggleFollow = async () => {
    try {
      const result = await toggleSubscription(followUserInfo.id)

      if (result.error) {
        throw new Error(result.error)
      }

      setIsFollowed(result.isFollowed ?? false)
      setTotalFollowers(result.isFollowed ? totalFollowers + 1 : totalFollowers - 1)
    } catch (error) {
      console.error('Failed to toggle follow state:', error)
    }
  }

  const smallAvatar = followUserInfo.avatar_file_exists
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${followUserInfo.id}/avatars/small.jpg`
    : ''

  const largeAvatar = followUserInfo.avatar_file_exists
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${followUserInfo.id}/avatars/normal.jpg`
    : ''

  const [viewportWidth, setViewportWidth] = useState<number>(0)

  useEffect(() => {
    setViewportWidth(window.innerWidth)
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const imageSrc = viewportWidth <= 640 ? smallAvatar : largeAvatar

  return (
    <div className="border-0 md:h-full md:rounded-medium md:px-5 md:py-4 2xl:border 2xl:border-secondary-200">
      <div className="relative flex w-full flex-col items-center md:gap-3 2xl:gap-5">
        <BVAvatar
          className="mega absolute bottom-0 left-0 h-14 w-14 md:relative md:bottom-auto md:left-auto md:h-20 md:w-20 2xl:h-36 2xl:w-36"
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
        ) : !userInfo ? (
          <BVButton as={Link} href="/login" fullWidth color="primary" className="mt-5">
            Follow
          </BVButton>
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
