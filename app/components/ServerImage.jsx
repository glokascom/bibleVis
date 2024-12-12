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
        className="w-1/1 cursor-zoom-in rounded-medium border-3 border-orange-700 object-contain md:aspect-video"
      />
      {isShowImage && (
        <FullScreenImage image={image} onHideImage={onHideImage} emergence={emergence} />
      )}
    </>
  )
}

export default ServerImage
