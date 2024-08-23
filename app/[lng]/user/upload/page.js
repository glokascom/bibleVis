'use client'

import { useEffect, useState } from 'react'

import NextImage from 'next/image'

import { Image } from '@nextui-org/image'

import ImageUploadDragDrop from '@/app/components/ImageUploadDragDrop'
import TagInput from '@/app/components/TagInput'
import { openFileDialog, validateAndLoadImage } from '@/app/utils/imageUpload'

export default function Upload() {
  const [error, setError] = useState(null)
  const [errorImage, setErrorImage] = useState(null)
  const [validImage, setValidImage] = useState(null)

  const handleImageChange = (file, errorMessage) => {
    setError(errorMessage)
    if (errorMessage) {
      setErrorImage(file ? URL.createObjectURL(file) : null)
      setValidImage(null)
    } else {
      if (file) {
        if (validImage) {
          URL.revokeObjectURL(validImage)
        }
        setValidImage(URL.createObjectURL(file))
      }
      if (errorImage) {
        URL.revokeObjectURL(errorImage)
      }
      setErrorImage(null)
    }
  }

  const handleReplaceImage = () => {
    openFileDialog((file) => {
      validateAndLoadImage(file, handleImageChange)
    })
  }

  useEffect(() => {
    return () => {
      if (errorImage) {
        URL.revokeObjectURL(errorImage)
      }
      if (validImage) {
        URL.revokeObjectURL(validImage)
      }
    }
  }, [errorImage, validImage])

  if (validImage) {
    return (
      <div className="mb-12 mt-11 flex flex-col gap-7 md:flex-row md:gap-5">
        <div>
          <div className="relative">
            <Image src={validImage} alt="Uploaded image" radius="md" />
            <button
              className="absolute bottom-2.5 right-2.5 z-10 rounded-full border-white/30 bg-[rgba(150,150,150,0.5)] px-7 py-4 font-semibold text-white backdrop-blur-[25px] md:bottom-7 md:right-9"
              onClick={handleReplaceImage}
            >
              <Image
                removeWrapper
                as={NextImage}
                height={24}
                width={24}
                src="/reload.svg"
                alt="reload"
                radius="none"
                className="md:hidden"
              />
              <p className="hidden text-large md:block">Replace the image</p>
            </button>
          </div>

          <div className="hidden flex-row gap-10 md:mt-12 md:flex md:px-4">
            <p className="md:w-1/3">
              <span className="font-bold">File Formats and Size:</span> Acceptable formats
              are JPG and PNG, with a maximum file size of 4MB and at least 1920 pixels on
              one side.
            </p>
            <p className="md:w-1/3">
              <span className="font-bold">Ownership:</span> Only upload original media to
              which you own the rights.
            </p>
            <p className="md:w-1/3">
              <span className="font-bold">Content Restrictions:</span> Do not upload
              images containing graphic nudity, violence, or hate speech.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-medium border p-5">
          <TagInput
            label="Title"
            isTagInput={false}
            limitLettersAllTags={140}
            placeholder="Add title of the image"
          />
          <TagInput
            label="Description"
            isTagInput={false}
            limitLettersAllTags={280}
            placeholder="Add optional description of the image"
          />
          <TagInput
            label="Prompt"
            limitLettersAllTags={280}
            placeholder="Add AI prompt that you used to create the image"
          />
          <TagInput label="Software Used" showCounter={false} />
          <TagInput label="Image tags" />
        </div>
      </div>
    )
  }

  return (
    <>
      {error ? (
        <div className="mb-7 mt-14 flex flex-row justify-center rounded-medium bg-gradient-to-r from-danger-300 to-danger-400 px-5 py-6 text-secondary-50 md:mb-5 md:mt-20 md:gap-12 md:p-6">
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
              <p className="mb-5 text-xlarge leading-6 md:text-mega md:leading-10">
                Error
              </p>
              <p className="text-balance text-small md:text-large">{error}</p>
            </div>
          </div>
          {errorImage !== null && (
            <div className="relative overflow-hidden rounded-medium">
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
      ) : (
        <div className="mb-5 mt-20 text-center md:mb-7 md:mt-16 md:w-2/5 md:self-center">
          <p className="text-xxlarge md:text-mega">Upload your image</p>
          <p className="my-5 text-small text-secondary-400">
            Join our community of creators and showcase your talent by uploading your
            media! Learn more about the BibleVis{' '}
            <a href="/pages/license" className="underline">
              Content License
            </a>
            .
          </p>
        </div>
      )}

      <ImageUploadDragDrop onImageChange={handleImageChange} />

      <div className="mb-24 mt-10 flex flex-col gap-10 md:mt-12 md:w-3/4 md:flex-row md:self-center">
        <p className="md:w-1/3">
          <span className="font-bold">File Formats and Size:</span> Acceptable formats are
          JPG and PNG, with a maximum file size of 4MB and at least 1920 pixels on one
          side.
        </p>
        <p className="md:w-1/3">
          <span className="font-bold">Ownership:</span> Only upload original media to
          which you own the rights.
        </p>
        <p className="md:w-1/3">
          <span className="font-bold">Content Restrictions:</span> Do not upload images
          containing graphic nudity, violence, or hate speech.
        </p>
      </div>
    </>
  )
}
