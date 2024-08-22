'use client'

import { useEffect, useState } from 'react'

import NextImage from 'next/image'

import { Image } from '@nextui-org/image'

import ImageUploadDragDrop from '@/app/components/ImageUploadDragDrop'

export default function Upload() {
  const [error, setError] = useState(null)
  const [errorImage, setErrorImage] = useState(null)

  const handleImageChange = (file, errorMessage) => {
    setError(errorMessage)
    if (errorMessage) {
      setErrorImage(file ? URL.createObjectURL(file) : null)
    } else {
      if (errorImage) {
        URL.revokeObjectURL(errorImage)
      }
      setErrorImage(null)
    }
  }

  useEffect(() => {
    return () => {
      if (errorImage) {
        URL.revokeObjectURL(errorImage)
      }
    }
  }, [errorImage])

  return (
    <>
      {error ? (
        <div className="mb-7 flex flex-row items-center justify-center rounded-medium bg-gradient-to-r from-danger-300 to-danger-400 px-5 py-6 text-secondary-50 md:mb-5 md:gap-10 md:p-6">
          <div className="flex items-center md:gap-4">
            <Image
              as={NextImage}
              src="/error.svg"
              alt="error"
              width={116}
              height={116}
              className="hidden md:block"
            />
            <div className="w-44 max-w-96 md:w-auto">
              <p className="mb-5 text-xlarge leading-6 md:text-mega md:leading-10">
                Error
              </p>
              <p className="text-balance text-small md:text-large">{error}</p>
            </div>
          </div>
          {errorImage !== null && (
            <div className="relative h-24 w-36 grow overflow-hidden rounded-medium md:h-28 md:w-44 md:grow-0">
              <div className="absolute inset-0 z-0">
                <Image
                  as={NextImage}
                  src={errorImage}
                  alt="Background blur"
                  width={176}
                  height={112}
                  className="object-cover blur"
                />
              </div>
              <div className="relative z-10">
                <Image
                  width={176}
                  height={112}
                  as={NextImage}
                  src={errorImage}
                  alt="Error image"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-5 mt-20 text-center">
          <p className="text-xxlarge">Upload your image</p>
          <p className="my-5 text-medium">
            Join our community of creators and showcase your talent by uploading your
            media! Learn more about the BibleVis Content License.
          </p>
        </div>
      )}
      <div>
        <ImageUploadDragDrop onImageChange={handleImageChange} />
      </div>
    </>
  )
}
