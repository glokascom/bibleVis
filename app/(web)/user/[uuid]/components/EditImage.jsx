'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { BVButton } from '@/app/components/BVButton'
import ImageFormDisplay from '@/app/components/ImageFormDisplay'
import { Modal } from '@/app/components/Modal'
import { useToast } from '@/app/components/ToastProvider'

export default function EditImage({ imageInfo, softwareOptions, tagsOptions }) {
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: imageInfo.id,
    username: imageInfo.users.username,
    isAIGeneration: imageInfo.is_ai_generated,
    title: imageInfo.title,
    description: imageInfo.description,
    prompt: imageInfo.prompt,
    software: imageInfo.software,
    tags: imageInfo.tags,
    imagePath: imageInfo.imagePath,
  })

  const [validImage, setValidImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { success: showToastSuccess, error: showToastError } = useToast()

  useEffect(() => {
    const isAnyFieldFilled = Object.entries(formData).some(([key, value]) => {
      if (key === 'isAIGeneration') return false

      if (Array.isArray(value)) return value.length > 0
      if (typeof value === 'string') return value.trim().length > 0

      return Boolean(value)
    })

    setIsFormFilled(isAnyFieldFilled)
  }, [formData, validImage])

  const handleSubmit = async () => {
    setIsLoading(true)
    const { title, description, prompt, isAIGeneration, software, tags } = formData
    const formDataToSend = new FormData()

    formDataToSend.append('imageId', imageInfo.id)
    formDataToSend.append('title', title)
    formDataToSend.append('description', description)
    formDataToSend.append('prompt', prompt)
    formDataToSend.append('is_ai_generated', isAIGeneration)
    formDataToSend.append('validImage', validImage)
    formDataToSend.append('software', JSON.stringify(software))
    formDataToSend.append('tags', JSON.stringify(tags))

    try {
      const response = await fetch('/api/upload-image', {
        method: 'PUT',
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse?.message || 'Failed to upload image.')
      }

      await response.json()

      showToastSuccess('Form successfully submitted')
      closeModal()
    } catch (error) {
      console.error('Error during image loading:', error)
      showToastError(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setIsCancelModalOpen(false)
  }

  return (
    <>
      <ImageFormDisplay
        initialFormData={formData}
        imageFile={validImage}
        setFormData={setFormData}
        isFormFilled={isFormFilled}
        handleSubmit={handleSubmit}
        handleCancel={() => setIsCancelModalOpen(true)}
        softwareOptions={softwareOptions}
        tagsOptions={tagsOptions}
        setValidImage={setValidImage}
        isLoading={isLoading}
      />

      {isCancelModalOpen && (
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
              <BVButton as={Link} href="/user" className="w-1/2 bg-danger">
                Confirm
              </BVButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
