'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { BVButton } from '@/app/components/BVButton'
import ImageFormDisplay from '@/app/components/ImageFormDisplay'
import { Modal } from '@/app/components/Modal'

export default function EditImage({ imageInfo, softwareOptions, tagsOptions }) {
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    isAIGeneration: imageInfo.is_ai_generated,
    title: imageInfo.title,
    description: imageInfo.description,
    prompt: imageInfo.prompt,
    software: imageInfo.software,
    tags: imageInfo.tags,
    imagePath: imageInfo.imagePath,
  })

  const validImage = null

  useEffect(() => {
    const isAnyFieldFilled = Object.entries(formData).some(([key, value]) => {
      if (key === 'isAIGeneration') return false
      return Array.isArray(value) ? value.length > 0 : Boolean(value)
    })
    setIsFormFilled(isAnyFieldFilled && validImage !== null)
  }, [formData, validImage])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Stored data:', {
      image: validImage,
      ...formData,
    })
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
