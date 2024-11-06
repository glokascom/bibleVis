'use client'

import Link from 'next/link'

import { Image } from '@nextui-org/image'

function RelatedImages({ relatedImages, username }) {
  return (
    <>
      <p className="font-bold">More by {username}</p>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {relatedImages.map((image) => (
          <Link key={image.url_slug} scroll={false} href={`/image/${image.url_slug}`}>
            <Image
              src={image.imagePath}
              alt={image.title}
              isZoomed
              className="cursor-pointer"
              classNames={{ img: 'aspect-square w-full h-auto' }}
            />
          </Link>
        ))}
      </div>
    </>
  )
}

export default RelatedImages
