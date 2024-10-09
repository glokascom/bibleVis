'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { Image } from '@nextui-org/image'

import { toggleLike as toggleLikeAction } from '../(web)/[@username]/actions/imagesActions'
import { BVButton } from './BVButton'
import ShareDropdown from './ShareDropdown'

function LikesCounter({ imageInfo, isLike, isAuthenticated, totalLikes }) {
  const [isLiked, setIsLiked] = useState(!!isLike)
  const [count, setCount] = useState(totalLikes)
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const dropdownRef = useRef(null)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

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

  const handleShare = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const commonButtonClasses = 'w-1/2 leading-4'

  return (
    <div className="relative flex items-center gap-2.5">
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
            height={18}
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

      <ShareDropdown
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        currentUrl={currentUrl}
      />
    </div>
  )
}

export default LikesCounter
