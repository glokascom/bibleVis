'use client'

import { useCallback, useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { Image } from '@nextui-org/image'

import { toggleLike as toggleLikeAction } from '../(web)/[@username]/actions/imagesActions'
import { BVButton } from './BVButton'

function LikesCounter({ imageInfo, isLike, isAuthenticated, totalLikes }) {
  const [isLiked, setIsLiked] = useState(!!isLike)
  const [count, setCount] = useState(totalLikes)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleToggleLike = useCallback(() => {
    setIsLiked((prevIsLiked) => !prevIsLiked)
    setCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1))
  }, [isLiked])

  useEffect(() => {
    setIsLiked(isLike)
    setCount(imageInfo.total_likes)
  }, [isLike, imageInfo.total_likes])

  const handleLikeClick = async () => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push(`/login?redirectedFrom=${pathname}`)
      return
    }

    setIsLoading(true)

    try {
      handleToggleLike()
      const result = await toggleLikeAction(imageInfo.id)
      if (result.data) {
      } else if (result.error) {
        handleToggleLike()
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Failed to toggle like state:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const commonButtonClasses = 'w-1/2 leading-4'

  return (
    <>
      <BVButton
        size="xl"
        variant="bordered"
        color="background"
        className={commonButtonClasses}
        onPress={handleLikeClick}
        disabled={isLoading}
        startContent={
          <Image
            src={isLiked ? '/heart-filled.svg' : '/heart-empty.svg'}
            alt="heart"
            width={20}
            height={18}
            radius="none"
          />
        }
      >
        {count}
      </BVButton>
    </>
  )
}

export default LikesCounter
