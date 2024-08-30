import { useRef, useState } from 'react'

import NextImage from 'next/image'

import { Image } from '@nextui-org/image'

import { validateAndLoadImage } from '../utils/imageUpload'
import { BVButton } from './BVButton'

function ImageUploadDragDrop({ onImageChange }) {
  const [isOverDropZone, setIsOverDropZone] = useState(false)
  const fileInputRef = useRef(null)

  function preventEventPropagation(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    preventEventPropagation(e)
    setIsOverDropZone(true)
  }

  const handleDragLeave = (e) => {
    preventEventPropagation(e)
    const rect = e.currentTarget.getBoundingClientRect()
    if (
      e.clientY < rect.top ||
      e.clientY >= rect.bottom ||
      e.clientX < rect.left ||
      e.clientX >= rect.right
    ) {
      setIsOverDropZone(false)
    }
  }

  const handleDragOver = (e) => {
    preventEventPropagation(e)
    setIsOverDropZone(true)
  }

  const handleDrop = (e) => {
    preventEventPropagation(e)
    setIsOverDropZone(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      if (files.length > 1) {
        onImageChange(null, 'Please drop only one image file.')
        return
      }
      validateAndLoadImage(files[0], onImageChange)
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      validateAndLoadImage(files[0], onImageChange)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current.click()
  }

  return (
    <div
      className={`${isOverDropZone ? '' : 'border border-dashed p-2.5 md:p-9'} h-full rounded-medium shadow-small`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex h-full flex-col items-center justify-center rounded-medium bg-gradient-to-r from-[#73ABC2]/30 to-primary-500/30 py-14 text-center md:pb-32 md:pt-24">
        {isOverDropZone ? (
          <>
            <Image
              removeWrapper
              as={NextImage}
              height={226}
              width={226}
              src="/star-white.svg"
              alt="white star"
              radius="none"
            />
            <p className="mt-16 text-mega font-medium text-white">Drop</p>
          </>
        ) : (
          <>
            <p className="mb-7 text-xxlarge font-medium md:hidden">Add a file</p>

            <div className="hidden flex-col items-center justify-center font-medium md:flex">
              <Image
                removeWrapper
                as={NextImage}
                height={93}
                width={93}
                src="/star.svg"
                alt="Star"
                radius="none"
              />
              <p className="mt-5 text-mega leading-9">Drag and Drop</p>
              <p className="my-7 text-xlarge">or</p>
            </div>

            <BVButton size="lg" onClick={openFileDialog}>
              Browse file
            </BVButton>
          </>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept="image/jpeg,image/png"
        />
      </div>
    </div>
  )
}

export default ImageUploadDragDrop
