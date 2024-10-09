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
import { useToast } from '@/app/components/ToastProvider'

import { updateUploadImage } from '../actions/getSoftwares'

export default function UploadImage({ user, softwareOptions, tagsOptions }) {
  const [error, setError] = useState(null)
  const [errorImage, setErrorImage] = useState(null)
  const [validImage, setValidImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedImageUrl, setSubmittedImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { error: showToastError } = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prompt: '',
    isAIGeneration: true,
    software: [],
    tags: [],
  })
  const [imageId, setImageId] = useState(null)

  useEffect(() => {
    const updateTagsOnChange = async () => {
      if (imageId) {
        try {
          await updateUploadImage()
        } catch (error) {
          console.error('Error updating tags:', error)
        }
      }
    }
    updateTagsOnChange()
  }, [imageId])
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validImage) {
      setError('Please upload a valid image.')
      return
    }

    setIsLoading(true)

    const { title, description, prompt, isAIGeneration, software, tags } = formData
    const formDataToSend = new FormData()
    formDataToSend.append('title', title)
    formDataToSend.append('description', description)
    formDataToSend.append('prompt', prompt)
    formDataToSend.append('is_ai_generated', isAIGeneration)
    formDataToSend.append('validImage', validImage)
    formDataToSend.append('software', JSON.stringify(software))
    formDataToSend.append('tags', JSON.stringify(tags))

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message || 'Failed to upload image.')
      }

      const {
        data: { imageId },
      } = await response.json()
      setImageId(imageId)
      setIsSubmitted(true)
      setSubmittedImageUrl(URL.createObjectURL(validImage))
    } catch (error) {
      setError(error.message)
      showToastError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (file, errorMessage) => {
    if (errorImage) {
      URL.revokeObjectURL(errorImage)
      setErrorImage(null)
    }

    setError(errorMessage)

    if (file) {
      if (errorMessage) {
        setErrorImage(URL.createObjectURL(file))
      } else {
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
        <div className="relative mb-36 w-full rounded-medium bg-secondary-50 md:mb-12">
          <Image
            src={submittedImageUrl}
            alt="Uploaded image"
            classNames={{
              img: 'w-full h-auto aspect-video object-contain shadow-large',
            }}
          />

          <Link
            href={`/user/${imageId}`}
            className="absolute left-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background md:left-5 md:top-5 md:h-11 md:w-11"
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

        <BVAvatar size="md" src={user.avatarUrl} />

        <p className="pb-7 pt-5 text-large font-semibold md:pb-12 md:pt-6">
          {`Great, ${user.username || 'User'}! Your image has been uploaded successfully`}
        </p>

        <div className="mb-10 flex justify-center gap-2">
          <BVButton
            as={Link}
            href={`/@${user.username}`}
            className="w-1/2 bg-secondary-50 text-inherit"
          >
            View my profile
          </BVButton>
          <BVButton
            onClick={() => {
              setValidImage(null)
              setFormData({
                title: '',
                description: '',
                prompt: '',
                isAIGeneration: true,
                software: [],
                tags: [],
              })
              setError(null)
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
          softwareOptions={softwareOptions}
          tagsOptions={tagsOptions}
          isLoading={isLoading}
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
    <div className="flex flex-col pt-10">
      <div className="my-10 text-balance text-center font-medium md:hidden">
        <p className="text-xxlarge">Upload your image</p>
        <p className="mt-5 text-wrap text-small text-secondary-400">
          Join our community of creators and showcase your talent by uploading your media!
          Learn more about the BibleVis{' '}
          <a href="/pages/license" className="underline">
            Content License
          </a>
          .
        </p>
      </div>

      {error && (
        <div className="mb-5 flex flex-row justify-center rounded-medium bg-gradient-to-r from-danger-300 to-danger-400 p-5 text-secondary-50 md:gap-12">
          <div className="flex md:gap-4">
            <Image
              src="/error.svg"
              alt="error"
              className="hidden h-20 w-20 md:block 2xl:h-24 2xl:w-24"
            />
            <div className="w-44 max-w-96 md:w-auto">
              <h2 className="mb-2 text-xlarge leading-6 md:text-semimega md:leading-10 2xl:mb-5 2xl:text-mega">
                Error
              </h2>
              <p className="text-balance text-small md:text-medium 2xl:text-large">
                {error}
              </p>
            </div>
          </div>
          {errorImage && (
            <div className="relative overflow-hidden rounded-medium">
              <div className="absolute inset-0 z-0">
                <Image
                  src={errorImage}
                  alt="Background blur"
                  className="h-24 w-40 object-cover blur 2xl:h-28 2xl:w-44"
                />
              </div>
              <div className="relative z-10">
                <Image
                  src={errorImage}
                  alt="Error image"
                  className="h-24 w-40 object-contain 2xl:h-28 2xl:w-44"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <ImageUploadDragDrop onImageChange={handleImageChange} />

      <div className="mt-12 flex flex-col gap-10 md:w-11/12 md:flex-row md:self-center 2xl:w-2/3">
        <p className="md:w-1/3">
          <span className="font-bold">File Formats and Size:</span> Acceptable formats are
          JPG and PNG, with a maximum file size of 4MB and at least 1000 pixels on one
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
    </div>
  )
}
