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
        <div className="mb-7 flex flex-row items-center justify-center rounded-lg bg-gradient-to-r from-[#EA4F5780] to-[#FF000080] px-5 py-6 text-[#F7F7F7] md:mb-5 md:gap-10 md:p-6">
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
            <div className="relative h-[92px] w-[142px] grow overflow-hidden rounded-lg md:h-[115px] md:w-[179px] md:grow-0">
              <div className="absolute inset-0 z-0">
                <Image
                  as={NextImage}
                  src={errorImage}
                  alt="Background blur"
                  width={179}
                  height={115}
                  className="object-cover blur"
                />
              </div>
              <div className="relative z-10">
                <Image
                  width={179}
                  height={115}
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
      <div className="h-[238px] md:h-[578px]">
        <ImageUploadDragDrop onImageChange={handleImageChange} />
      </div>
    </>
  )
}
