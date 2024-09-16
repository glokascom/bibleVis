'use client'

import { useCallback, useEffect, useState } from 'react'

import { Image } from '@nextui-org/image'

import { toggleLike as toggleLikeAction } from '../(web)/[@username]/actions/imagesActions'
import { BVButton } from './BVButton'

function LikesCounter({ imageInfo, isLike }) {
  const [isLiked, setIsLiked] = useState(!!isLike)
  const [count, setCount] = useState(imageInfo.total_likes)
  const [isLoading, setIsLoading] = useState(false)
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

  const handleShare = useCallback(() => {
    alert('share button')
  }, [])

  const commonButtonClasses = 'w-1/2 leading-4'

  return (
    <div className="flex items-center gap-2.5">
      <BVButton
        size="xl"
        variant="bordered"
        color="background"
        className={commonButtonClasses}
        onClick={handleLikeClick}
        disabled={isLoading}
        startContent={
          <Image
            src={isLiked ? '/heart-filled.svg' : '/heart-empty.svg'}
            alt="heart"
            width={20}
            height={20}
            radius="none"
          />
        }
      >
        {count}
      </BVButton>

      <BVButton
        size="xl"
        variant="bordered"
        color="background"
        aria-label="Share"
        className={commonButtonClasses}
        onClick={handleShare}
        isIconOnly
      >
        <Image src="/share.svg" alt="share" radius="none" width={20} height={20} />
      </BVButton>
    </div>
  )
}

export default LikesCounter
