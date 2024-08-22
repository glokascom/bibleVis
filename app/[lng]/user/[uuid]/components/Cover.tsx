'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { BVLink } from '@/app/components/BVLink'

interface CoverProps {
  isCurrentUser: boolean
}

function Cover({ isCurrentUser }: CoverProps) {
  const smallCover = '/cover.svg' // TODO берем с базы данных
  const largeCover = '/cover.svg' // TODO берем с базы данных

  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    handleResize()

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
          className="absolute left-auto right-2.5 top-2.5 rounded-full bg-secondary-50 p-3 md:left-8 md:right-auto md:top-8"
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
