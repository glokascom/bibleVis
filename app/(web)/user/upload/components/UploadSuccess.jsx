import Image from 'next/image'
import Link from 'next/link'

import { BVAvatar } from '@/app/components/BVAvatar'
import BVButton from '@/app/components/BVButton'

export default function UploadSuccess({ user, imageId, size, imageUrl }) {
  return (
    <div className="mx-auto mb-12 mt-11 flex max-w-3xl flex-col items-center justify-center text-center">
      <div className="relative mb-36 w-full rounded-medium bg-secondary-50 md:mb-12">
        <Image
          src={imageUrl}
          width={size.width}
          height={size.height}
          alt="Uploaded image"
          className="aspect-video h-auto w-full rounded-medium object-contain"
        />

        <Link
          href={`/user/${imageId}`}
          className="absolute left-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background md:left-5 md:top-5 md:h-11 md:w-11"
        >
          <Image height={17} width={17} src="/pencil.svg" alt="pencil" />
        </Link>
      </div>

      <BVAvatar as={Link} href={`/@${user.username}`} size="md" src={user.avatarUrl} />

      <p className="pb-7 pt-5 text-large font-semibold md:pb-12 md:pt-6">
        {`Great, ${user.username}! Your image has been uploaded successfully`}
      </p>

      <div className="mb-10 flex justify-center gap-2">
        <BVButton
          as={Link}
          href={`/@${user.username}`}
          className="w-1/2 bg-secondary-50 text-inherit"
        >
          View my profile
        </BVButton>
        <BVButton as="a" href="/user/upload" className="w-1/2">
          Upload an image
        </BVButton>
      </div>
    </div>
  )
}
