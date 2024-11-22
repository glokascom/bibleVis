'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'
import { UserInfoProps } from '@/app/types/subscription'

import { toggleSubscription } from '../actions/userActions'

const UserInfo: React.FC<UserInfoProps> = ({
  isCurrentUser,
  profileUser,
  initialIsFollowed,
  user,
  className = '',
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
    <div className={className}>
      <div className="relative flex w-full flex-col items-center justify-between md:gap-3 lg:gap-5">
        {pathname === `/@${profileUser.username}` ? (
          <>
            <BVAvatar
              className="absolute bottom-0 left-0 h-14 w-14 text-mega md:relative md:bottom-auto md:left-auto md:h-20 md:w-20 2xl:h-36 2xl:w-36"
              src={profileUser.avatarUrl ?? ''}
              alt={`${profileUser.username}'s avatar`}
            />
            <div className="text-semixlarge font-bold">{profileUser.username}</div>
          </>
        ) : (
          <>
            <Link href={`/@${profileUser.username}`}>
              <BVAvatar
                className="absolute bottom-0 left-0 h-14 w-14 text-mega md:relative md:bottom-auto md:left-auto md:h-20 md:w-20 2xl:h-36 2xl:w-36"
                src={profileUser.avatarUrl ?? ''}
                alt={`${profileUser.username}'s avatar`}
              />
            </Link>
            <Link href={`/@${profileUser.username}`}>
              <div className="text-semixlarge font-bold">{profileUser.username}</div>
            </Link>
          </>
        )}
        <div className="flex flex-row-reverse items-center gap-1 xl:flex-col">
          <div className="text-small text-secondary-500">Followers</div>
          <div className="text-small">{totalFollowers}</div>
        </div>
      </div>
      <div className="flex justify-center">
        {isCurrentUser ? (
          <BVButton
            as={Link}
            href="/user/edit"
            color="primary"
            fullWidth
            className="mt-5"
          >
            Edit Profile
          </BVButton>
        ) : !user ? (
          <BVButton
            as={Link}
            href={`/login?redirectedFrom=${pathname}`}
            color="primary"
            className="mt-5 w-full md:w-auto md:min-w-48"
          >
            Follow
          </BVButton>
        ) : (
          <BVButton
            color={isFollowed ? 'secondary' : 'primary'}
            className="mt-5 w-full md:w-auto md:min-w-48"
            onPress={handleToggleFollow}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </BVButton>
        )}
      </div>
    </div>
  )
}

export default UserInfo
