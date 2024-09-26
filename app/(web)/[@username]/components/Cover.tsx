'use client'

import Image from 'next/image'

import { BVLink } from '@/app/components/BVLink'
import { CoverProps } from '@/app/types/subscription'

function Cover({ isCurrentUser, profileUser }: CoverProps) {
  return (
    <div className="relative h-full max-h-[400px] overflow-hidden rounded-medium">
      <Image
        src={profileUser.coverUrl}
        alt="cover"
        className="h-full object-cover"
        sizes="(max-width: 640px) 100vw, 50vw"
        width={1280}
        height={400}
      />
      {isCurrentUser && (
        <BVLink
          className="absolute right-2.5 top-2.5 z-10 rounded-full bg-secondary-50 p-3 md:left-8 md:right-auto md:top-8"
          href="/user/edit"
        >
          <Image src="/pencil.svg" alt="edit" width={18} height={18} />
        </BVLink>
      )}

      {profileUser.coverUrl === '/cover.svg' && (
        <p className="absolute inset-0 flex items-center justify-center text-center text-4xl font-semibold text-white">
          Add image
        </p>
      )}
    </div>
  )
}

export default Cover
