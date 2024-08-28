'use client'

import { useEffect, useState } from 'react'

import { BVButton } from '@/app/components/BVButton'
import ImageFormDisplay from '@/app/components/ImageFormDisplay'
import { Modal } from '@/app/components/Modal'

export default function EditImage() {
  const [validImage, setValidImage] = useState(null)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    isAIGeneration: true,
    title: 'заголовок',
    description: 'описание',
    prompt: 'промт ',
    software: ['Leonardo', 'Playground.ai', 'MidJourney'],
    tags: ['top', 'good', 'ship', 'art'],
  })

  useEffect(() => {
    const isAnyFieldFilled = Object.values(formData).some((value) =>
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    )
    setIsFormFilled(isAnyFieldFilled)
  }, [formData])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Stored data:', {
      image: validImage,
      ...formData,
    })
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <ImageFormDisplay
        initialFormData={formData}
        imageFile={validImage}
        setFormData={setFormData}
        isFormFilled={isFormFilled}
        handleSubmit={handleSubmit}
        handleCancel={() => setIsModalOpen(true)}
        setValidImage={setValidImage}
      />

      {isModalOpen && (
        <Modal isImageForm={true} closeModal={closeModal}>
          <div className="m-5 rounded-xlarge bg-background p-10 text-semixlarge font-medium">
            <p className="px-7">Are you sure you want to cancel?</p>
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
