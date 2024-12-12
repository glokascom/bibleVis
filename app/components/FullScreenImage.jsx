import React from 'react'

import Image from 'next/image'

import { Modal } from './Modal'

function FullScreenImage({ image, onHideImage, emergence }) {
  return (
    <Modal
      isCloseButton={false}
      isFullScreen={true}
      className="object-contain duration-200"
    >
      <div className="pointer-events-none fixed right-5 top-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background">
        <Image src="/maximize.png" alt="edit" width={17} height={17} radius="none" />
      </div>
      <Image
        onClick={onHideImage}
        src={image.imagePath}
        alt={image.title}
        width={image.file_sizes.original.width}
        height={image.file_sizes.original.height}
        className={`${emergence} w-full cursor-zoom-out object-cover`}
      />
    </Modal>
  )
}

export default FullScreenImage
