'use client'

import { useRouter } from 'next/navigation'

import { Image } from '@nextui-org/image'

function RelatedImages({ relatedImages, username }) {
  const router = useRouter()

  const handleImageClick = (imageId) => {
    router.push(`/image/${imageId}`)
  }

  return (
    <>
      <p className="font-bold">More by {username}</p>
      <div className="mt-5 md:grid md:grid-cols-3 md:gap-2">
        {relatedImages.map((image) => (
          <Image
            key={image.id}
            src={image.imagePath}
            alt={image.title}
            isZoomed
            className="mt-5 cursor-pointer md:mt-0"
            classNames={{ img: 'md:aspect-square w-full h-auto' }}
            onClick={() => handleImageClick(image.id)}
          />
        ))}
      </div>
    </>
  )
}

export default RelatedImages
