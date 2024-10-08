'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Image } from '@nextui-org/image'

import { BVButton } from './BVButton'
import { useToast } from './ToastProvider'

function ShareComponent({ currentUrl }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { success } = useToast()

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
  }

  const copyLinkToClipboard = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(currentUrl)
      success('Link copied to clipboard!')
    }
  }, [currentUrl, success])

  const handleShare = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const commonButtonClasses = 'w-1/2 leading-4'

  return (
    <>
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
    </>
  )
}

export default ShareComponent
