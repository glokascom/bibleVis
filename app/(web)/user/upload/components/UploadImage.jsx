'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { Image as NextuiImage } from '@nextui-org/react'

import ConfirmationModal from '@/app/components/ConfirmationModal'
import ImageFormDisplay from '@/app/components/ImageFormDisplay'
import ImageUploadDragDrop from '@/app/components/ImageUploadDragDrop'
import { useToast } from '@/app/components/ToastProvider'

import { updateUploadImage } from '../actions/UpdateActions'
import UploadSuccess from './UploadSuccess'

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
  const [size, setSize] = useState({ width: 0, height: 0 })

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
        data: { imageId, size },
      } = await response.json()
      setImageId(imageId)
      setSize(size)
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
      <UploadSuccess
        imageId={imageId}
        size={size}
        imageUrl={submittedImageUrl}
        user={user}
      />
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
          softwareOptions={softwareOptions}
          tagsOptions={tagsOptions}
          handleCancel={() => setIsModalOpen(true)}
          setValidImage={setValidImage}
          isLoading={isLoading}
        />
        {isModalOpen && (
          <ConfirmationModal
            closeModal={closeModal}
            handle={() => {
              setValidImage(null)
              closeModal()
            }}
            type="cancel"
          />
        )}
      </>
    )
  }

  return (
    <>
      {error && (
        <div className="mb-5 flex flex-row justify-center rounded-medium bg-gradient-to-r from-danger-300 to-danger-400 p-5 text-secondary-50 md:gap-12">
          <div className="flex md:gap-4">
            <Image
              src="/error.svg"
              alt="error"
              width={80}
              height={80}
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
            <NextuiImage
              src={errorImage}
              alt="Error image"
              className="h-24 w-40 object-contain 2xl:h-28 2xl:w-44"
            />
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
    </>
  )
}
