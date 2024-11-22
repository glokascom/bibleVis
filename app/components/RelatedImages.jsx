'use client'

import Link from 'next/link'

import { Image } from '@nextui-org/image'

import { useGallery } from '../GaleryContext'

function RelatedImages({ images, baseUrl }) {
  const { setImages: setGalleryImages, setCurrentIndex, setBasePageUrl } = useGallery()
  const onClick = (idx) => {
    setGalleryImages(images.map((image) => image.url_slug))
    setCurrentIndex(idx)
    setBasePageUrl(baseUrl)
  }
  return images.length > 0 ? (
    <div className="grid grid-cols-3 gap-2">
      {images.map((image, idx) => (
        <Link
          key={image.url_slug}
          scroll={false}
          onClick={() => onClick(idx)}
          href={`/image/${image.url_slug}`}
        >
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
  ) : (
    <div className="flex items-center justify-center px-4 py-6">
      <p>No related images</p>
    </div>
  )
}

export default RelatedImages
