'use client'

import { useCallback, useState } from 'react'

import Image from 'next/image'

import FullScreenImage from './FullScreenImage'

function ServerImage({ image }) {
  const [isShowImage, setIsShowImage] = useState(false)
  const [emergence, setEmergence] = useState('opacity-0')

  const onShowImage = useCallback(() => {
    setIsShowImage(true)
    setTimeout(() => {
      setEmergence('opacity-1')
    }, 0)
  }, [setIsShowImage])

  const onHideImage = useCallback(() => {
    setEmergence('opacity-0')
    setTimeout(() => {
      setIsShowImage(false)
    }, 100)
  }, [setIsShowImage])

  const objectClass =
    image.file_sizes.original.width > image.file_sizes.original.height
      ? 'object-cover md:aspect-video w-full'
      : 'object-contain'

  return (
    <>
      <Image
        onClick={onShowImage}
        src={image.imagePath}
        alt={image.title}
        blurDataURL={`data:image/jpeg;base64,${image.preview}`}
        placeholder="blur"
        width={image.file_sizes.original.width}
        height={image.file_sizes.original.height}
        className={`cursor-zoom-in rounded-medium ${objectClass}`}
      />
      {isShowImage && (
        <FullScreenImage image={image} onHideImage={onHideImage} emergence={emergence} />
      )}
    </>
  )
}

export default ServerImage
