'use client'

import { useEffect, useState } from 'react'

import NextImage from 'next/image'
import Link from 'next/link'

import { Image } from '@nextui-org/image'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'
import ImageFormDisplay from '@/app/components/ImageFormDisplay'
import ImageUploadDragDrop from '@/app/components/ImageUploadDragDrop'
import { Modal } from '@/app/components/Modal'

export default function Upload() {
  const [error, setError] = useState(null)
  const [errorImage, setErrorImage] = useState(null)
  const [validImage, setValidImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedImageUrl, setSubmittedImageUrl] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prompt: '',
    software: [],
    tags: [],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Stored data:', {
      image: validImage,
      ...formData,
    })
    setIsSubmitted(true)
    if (validImage) {
      const url = URL.createObjectURL(validImage)
      setSubmittedImageUrl(url)
    }
  }

  const handleImageChange = (file, errorMessage) => {
    if (errorImage) {
      URL.revokeObjectURL(errorImage)
      setErrorImage(null)
    }

    setError(errorMessage)

    if (errorMessage) {
      if (file) {
        setErrorImage(URL.createObjectURL(file))
      }
    } else {
      if (file) {
        setValidImage(file)
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    return () => {
      if (errorImage) {
        URL.revokeObjectURL(errorImage)
      }
      if (submittedImageUrl) {
        URL.revokeObjectURL(submittedImageUrl)
      }
    }
  }, [errorImage, submittedImageUrl])

  useEffect(() => {
    const isAnyFieldFilled = Object.entries(formData).some(([key, value]) => {
      if (key === 'isAIGeneration') return false
      return Array.isArray(value) ? value.length > 0 : Boolean(value)
    })
    setIsFormFilled(isAnyFieldFilled && validImage !== null)
  }, [formData, validImage])

  if (isSubmitted) {
    return (
      <div className="mx-auto mb-12 mt-11 flex max-w-3xl flex-col items-center justify-center text-center">
        <div className="relative mb-36 md:mb-12">
          <Image
            src={submittedImageUrl}
            alt="Uploaded image"
            className="rounded-medium border shadow-large"
          />

          <Link
            href="/user/edit-image"
            className="absolute left-2.5 top-2.5 z-10 rounded-full bg-background p-3 md:left-5 md:top-5"
          >
            <Image
              removeWrapper
              as={NextImage}
              height={17}
              width={17}
              src="/pencil.svg"
              alt="pencil"
              radius="none"
            />
          </Link>
        </div>

        <BVAvatar size="md" />

        <p className="pb-7 pt-5 text-large font-semibold md:pb-12 md:pt-6">
          Great, User! Your image has been uploaded successfully
        </p>

        <div className="flex justify-center gap-2">
          <BVButton as={Link} href="/user" className="w-1/2 bg-secondary-50 text-inherit">
            View my profile
          </BVButton>
          <BVButton
            onClick={() => {
              setValidImage(null)
              setIsSubmitted(false)
            }}
            className="w-1/2"
          >
            Upload an image
          </BVButton>
        </div>
      </div>
    )
  }

  if (validImage) {
    return (
      <>
        <ImageFormDisplay
          imageFile={validImage}
          setFormData={setFormData}
          isFormFilled={isFormFilled}
          handleSubmit={handleSubmit}
          handleCancel={() => setIsModalOpen(true)}
          setValidImage={setValidImage}
        />

        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <div className="rounded-xlarge bg-background p-10 text-semixlarge font-medium">
              <p>Are you sure you want to cancel?</p>
              <div className="mt-12 flex justify-center gap-2">
                <BVButton
                  className="w-1/2 bg-secondary-50 text-inherit"
                  onClick={closeModal}
                >
                  Cancel
                </BVButton>
                <BVButton
                  className="w-1/2 bg-danger"
                  onClick={() => {
                    setValidImage(null)
                    closeModal()
                  }}
                >
                  Confirm
                </BVButton>
              </div>
            </div>
          </Modal>
        )}
      </>
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
          {errorImage && (
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
        <div className="mb-5 mt-20 text-balance text-center md:mb-7 md:mt-16 md:w-2/5 md:self-center">
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
