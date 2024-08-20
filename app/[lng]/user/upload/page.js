'use client'

import { useState } from 'react'

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
      setErrorImage(null)
    }
  }

  return (
    <>
      <div className="text-red-500">User Upload Page</div>
      {error && (
        <div className="mb-7 flex flex-row items-center justify-center rounded-lg bg-gradient-to-r from-red-450 to-red-550 px-5 py-6 text-gray-150 md:mb-5 md:gap-10 md:p-6">
          <div className="flex md:gap-4">
            <Image
              as={NextImage}
              src="/error.svg"
              alt="error"
              width={100}
              height={100}
              className="hidden md:block"
            />
            <div className="w-44 max-w-96 md:w-auto">
              <p className="mb-5 text-2xl md:text-5xl">Error</p>
              <p className="text-balance text-sm">{error}</p>
            </div>
          </div>
          {errorImage !== null && (
            <div className="relative h-24 w-36 grow overflow-hidden rounded-lg md:h-28 md:w-44 md:grow-0">
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
      )}
      <div className="h-60 md:h-[578px]">
        <ImageUploadDragDrop onImageChange={handleImageChange} />
      </div>
    </>
  )
}
