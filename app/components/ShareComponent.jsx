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
    whatsapp: `https://wa.me/?text=${encodeURIComponent('Take a look at this awesome image on the BibleVis ' + currentUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent('Take a look at this awesome image on the BibleVis ' + currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent('Take a look at this awesome image on the BibleVis')}`,
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
  }

  const copyLinkToClipboard = useCallback(() => {
    navigator.clipboard.writeText(currentUrl)
    success('Link copied to clipboard!')
  }, [currentUrl, success])

  const toggleDropdown = useCallback(() => {
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

  return (
    <>
      <BVButton
        size="xl"
        variant="bordered"
        color="background"
        aria-label="Share"
        className="w-1/2 leading-4"
        onPress={toggleDropdown}
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
            {Object.entries(shareLinks).map(([key, link]) => (
              <li key={key} className="rounded-md hover:bg-blue-100">
                <a
                  href={link}
                  target="_blank"
                  className="block w-full p-2"
                  rel="noopener noreferrer"
                >
                  Share on {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              </li>
            ))}
            <li className="rounded-md hover:bg-blue-100">
              <button onClick={copyLinkToClipboard} className="w-full p-2 text-left">
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
