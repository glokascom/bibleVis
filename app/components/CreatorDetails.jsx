'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Image } from '@nextui-org/image'

import { toggleSubscription } from '../(web)/[@username]/actions/userActions'
import { BVAvatar } from './BVAvatar'
import { BVButton } from './BVButton'

function CreatorDetails({
  creator,
  followUserId,
  isFollowed,
  isCurrentUser,
  isAuthenticated,
}) {
  const [follow, setFollow] = useState(isFollowed)
  const [isNarrow, setIsNarrow] = useState(false)
  const [totalFollowers, setTotalFollowers] = useState(creator.total_followers || 0)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef(null)
  const resizeObserverRef = useRef(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const container = containerRef.current

    const checkWidth = () => {
      if (container) {
        setIsNarrow(container.offsetWidth < 350)
      }
    }

    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(checkWidth)
    }

    checkWidth()

    if (container) {
      resizeObserverRef.current.observe(container)
    }

    return () => {
      if (container && resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(container)
      }
    }
  }, [])

  const handleToggleFollow = async () => {
    if (isLoading) return

    const previousFollow = follow
    const previousTotalFollowers = totalFollowers

    setFollow(!follow)
    setTotalFollowers(follow ? totalFollowers - 1 : totalFollowers + 1)
    setIsLoading(true)

    try {
      const result = await toggleSubscription(followUserId)

      if (result === null || result.error) {
        setFollow(previousFollow)
        setTotalFollowers(previousTotalFollowers)
        throw new Error(result?.error || 'Failed to toggle subscription')
      }

      setFollow(result.isFollowed ?? false)
      setTotalFollowers(result.isFollowed ? totalFollowers + 1 : totalFollowers - 1)
    } catch (error) {
      console.error('Failed to toggle follow state:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarClick = () => {
    if (isMounted) {
      router.push(`/@${creator.username}`)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`flex items-center ${isNarrow ? 'flex-col space-y-7' : 'flex-row justify-between pl-4'} text-large font-semibold`}
    >
      <div className="flex items-center gap-5">
        <BVAvatar
          as="button"
          className="transition-transform"
          name={creator.username}
          size="md"
          src={creator.avatarUrl}
          onClick={handleAvatarClick}
        />
        <div className="max-w-32">
          <p className="truncate" title={creator.username}>
            {creator.username}
          </p>
          <p className="mt-2.5 text-small text-secondary-400">
            {totalFollowers} followers
          </p>
        </div>
      </div>

      {!isCurrentUser && isAuthenticated && (
        <BVButton
          variant="light"
          color="background"
          className="rounded-medium px-4 text-large"
          onClick={handleToggleFollow}
          disabled={isLoading}
          startContent={
            <Image
              src={follow ? '/unfollow.svg' : '/follow.svg'}
              alt={follow ? 'unfollow' : 'follow'}
              width={20}
              height={20}
              radius="none"
            />
          }
        >
          {follow ? 'Unfollow' : 'Follow'}
        </BVButton>
      )}
    </div>
  )
}

export default CreatorDetails
