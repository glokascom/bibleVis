'use client'

import Image from 'next/image'

import { BVLink } from '@/app/components/BVLink'
import { CoverProps } from '@/app/types/subscription'

function Cover({ isCurrentUser, followUserInfo }: CoverProps) {
  return (
    <div className="relative max-h-[400px] overflow-hidden rounded-medium">
      <Image
        src={followUserInfo.coverUrl}
        alt="cover"
        className="h-full object-cover"
        sizes="(max-width: 640px) 100vw, 50vw"
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

export default Cover
