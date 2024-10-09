'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { Image } from '@nextui-org/image'

import { toggleLike as toggleLikeAction } from '../(web)/[@username]/actions/imagesActions'
import { BVButton } from './BVButton'
import { useToast } from './ToastProvider'

function LikesCounter({ imageInfo, isLike, isAuthenticated, totalLikes }) {
  const [isLiked, setIsLiked] = useState(!!isLike)
  const [count, setCount] = useState(totalLikes)
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const dropdownRef = useRef(null)
  const { success } = useToast()
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

  const copyLinkToClipboard = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(currentUrl)
      success('Link copied to clipboard!')
    }
  }, [currentUrl, success])

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
  }

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

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full z-10 mt-2 w-48 rounded-lg border bg-white shadow-lg"
        >
          <ul className="flex flex-col gap-2 p-2">
            <li className="rounded-md p-2 hover:bg-blue-100">
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                Share on WhatsApp
              </a>
            </li>
            <li className="rounded-md p-2 hover:bg-blue-100">
              <a href={shareLinks.telegram} target="_blank" rel="noopener noreferrer">
                Share on Telegram
              </a>
            </li>
            <li className="rounded-md p-2 hover:bg-blue-100">
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                Share on Facebook
              </a>
            </li>
            <li className="rounded-md p-2 hover:bg-blue-100">
              <a href={shareLinks.x} target="_blank" rel="noopener noreferrer">
                Share on X
              </a>
            </li>
            <li className="rounded-md p-2 hover:bg-blue-100">
              <button onClick={copyLinkToClipboard} className="w-full text-left">
                Copy Link
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default LikesCounter
