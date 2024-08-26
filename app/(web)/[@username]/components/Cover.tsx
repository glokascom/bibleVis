'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { BVLink } from '@/app/components/BVLink'

interface FollowUserInfo {
  id: string
  cover_file_exists: boolean
}

interface CoverProps {
  isCurrentUser: boolean
  followUserInfo: FollowUserInfo
}

function Cover({ isCurrentUser, followUserInfo }: CoverProps) {
  const smallCover = followUserInfo.cover_file_exists
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${followUserInfo.id}/covers/original.jpg`
    : `/cover.svg`

  const largeCover = followUserInfo.cover_file_exists
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${followUserInfo.id}/covers/original.jpg`
    : `/cover.svg`

  const [viewportWidth, setViewportWidth] = useState<number>(0)

  useEffect(() => {
    setViewportWidth(window.innerWidth)
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const imageSrc = viewportWidth <= 640 ? smallCover : largeCover

  return (
    <div className="relative max-h-[400px] overflow-hidden rounded-medium">
      <Image
        src={imageSrc}
        alt="cover"
        className="object-contain"
        width={1280}
        height={400}
      />
      {isCurrentUser && (
        <BVLink
          className="absolute right-2.5 top-2.5 rounded-full bg-secondary-50 p-3 md:left-8 md:right-auto md:top-8"
          href="/user/edit"
        >
          <Image src="/pencil.svg" alt="edit" width={18} height={18} />
        </BVLink>
      )}
    </div>
  )
}
/*TODO
1. Взять изображение обложки для 2 размеров из сторейджа

*/

export default Cover
