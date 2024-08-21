import { useRef, useState } from 'react'

import NextImage from 'next/image'

import { Image } from '@nextui-org/image'

import { BVButton } from './BVButton'

function ImageUploadDragDrop({ onImageChange }) {
  const [isOverDropZone, setIsOverDropZone] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
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
      validateAndSetImage(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      validateAndSetImage(files[0])
    }
  }

  const validateAndSetImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png']
    if (!validTypes.includes(file.type)) {
      onImageChange(file, 'Invalid file format. Please upload JPG or PNG.')
      setImageSrc(null)
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      onImageChange(file, 'The file is too large. Maximum size is 4MB.')
      setImageSrc(null)
      return
    }

    const img = new window.Image()
    img.onload = function () {
      if (this.width < 1920 && this.height < 1920) {
        onImageChange(
          file,
          'The image is too small. The minimum size is 1920 pixels on one side.'
        )
        setImageSrc(null)
      } else {
        onImageChange(file, null)
        setImageSrc(URL.createObjectURL(file))
      }
    }
    img.onerror = function () {
      onImageChange(file, 'Failed to load image. Please try another file.')
      setImageSrc(null)
    }
    img.src = URL.createObjectURL(file)

    return () => {
      URL.revokeObjectURL(img.src)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current.click()
  }

  return (
    <div
      className={`${isOverDropZone ? '' : 'border border-dashed p-2.5 md:p-9'} h-full rounded-medium shadow-lg`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex h-full flex-col items-center justify-center rounded-medium bg-gradient-to-r from-secondary-750 to-primary-750 text-center">
        {!imageSrc && (
          <>
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
                <p className="mb-5 text-xlarge font-medium md:hidden">Add a file</p>

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
                  <p className="mt-5 text-mega">Drag and Drop</p>
                  <p className="my-7 text-xlarge">or</p>
                </div>

                <BVButton onClick={openFileDialog}>Browse file</BVButton>
              </>
            )}
          </>
        )}

        {imageSrc && (
          <div className="relative h-full w-full">
            <Image
              removeWrapper
              as={NextImage}
              src={imageSrc}
              alt="Uploaded image"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
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
