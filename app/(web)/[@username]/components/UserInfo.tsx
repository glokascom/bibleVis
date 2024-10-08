'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'
import { UserProps } from '@/app/types/subscription'

import { toggleSubscription } from '../actions/userActions'

const UserInfo: React.FC<UserProps> = ({
  isCurrentUser,
  profileUser,
  initialIsFollowed,
  user,
}) => {
  const pathname = usePathname()
  const [isFollowed, setIsFollowed] = useState<boolean>(initialIsFollowed || false)
  const [totalFollowers, setTotalFollowers] = useState(profileUser.total_followers)

  const handleToggleFollow = async () => {
    try {
      const result = await toggleSubscription(profileUser.id)
      if (result === null) return
      if (result.error) {
        throw new Error(result.error)
      }

      setIsFollowed(result.isFollowed ?? false)
      setTotalFollowers(result.isFollowed ? totalFollowers + 1 : totalFollowers - 1)
    } catch (error) {
      console.error('Failed to toggle follow state:', error)
    }
  }

  return (
    <div className="border-0 md:h-full md:rounded-medium md:border md:px-5 md:py-8 lg:border-secondary-200">
      <div className="relative flex w-full flex-col items-center justify-between md:gap-3 lg:gap-5">
        <BVAvatar
          className="absolute bottom-0 left-0 h-14 w-14 text-mega md:relative md:bottom-auto md:left-auto md:h-20 md:w-20 2xl:h-36 2xl:w-36"
          src={profileUser.avatarUrl}
          alt={`${profileUser.username}'s avatar`}
        />
        <div className="text-semixlarge font-bold">{profileUser.username}</div>
        <div className="flex flex-row-reverse items-center gap-1 xl:flex-col">
          <div className="text-small text-secondary-500">Followers</div>
          <div className="text-small">{totalFollowers}</div>
        </div>
      </div>
      <div>
        {isCurrentUser ? (
          <BVButton as={Link} href="/user/edit" fullWidth className="mt-5">
            Edit Profile
          </BVButton>
        ) : !user ? (
          <BVButton
            as={Link}
            href={`/login?redirectedFrom=${pathname}`}
            fullWidth
            color="primary"
            className="mt-5"
          >
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
