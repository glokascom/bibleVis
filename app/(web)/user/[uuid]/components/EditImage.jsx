'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import ConfirmationModal from '@/app/components/ConfirmationModal'
import ImageFormDisplay from '@/app/components/ImageFormDisplay'
import { useToast } from '@/app/components/ToastProvider'

export default function EditImage({ imageInfo, softwareOptions, tagsOptions }) {
  const { push, refresh } = useRouter()
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

  const [initialFormData] = useState(formData)
  const [validImage, setValidImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { success: showToastSuccess, error: showToastError } = useToast()

  useEffect(() => {
    const isAnyFieldChanged = Object.entries(formData).some(([key, value]) => {
      if (key === 'isAIGeneration') return value !== initialFormData.isAIGeneration

      if (Array.isArray(value))
        return JSON.stringify(value) !== JSON.stringify(initialFormData[key])
      if (typeof value === 'string') return value.trim() !== initialFormData[key].trim()

      return value !== initialFormData[key]
    })

    setIsFormFilled(isAnyFieldChanged || validImage !== null)
  }, [formData, validImage, initialFormData])

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
        throw new Error(errorResponse?.message || 'Failed to upload image')
      }

      await response.json()

      showToastSuccess('Image updated successfully')
      closeModal()
    } catch (error) {
      console.error('Error during image loading: ', error)
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
        handleCancel={() => {
          if (isFormFilled) {
            setIsCancelModalOpen(true)
          } else {
            push(`/@${initialFormData.username}`)
            refresh()
          }
        }}
        softwareOptions={softwareOptions}
        tagsOptions={tagsOptions}
        setValidImage={setValidImage}
        isLoading={isLoading}
      />
      {isCancelModalOpen && (
        <ConfirmationModal
          closeModal={closeModal}
          handle={() => {
            push(`/@${initialFormData.username}`)
            refresh()
          }}
          type="cancel"
        />
      )}
    </>
  )
}
