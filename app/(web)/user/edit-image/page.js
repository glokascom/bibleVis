'use client'

import { useEffect, useState } from 'react'

import ImageFormDisplay from '@/app/components/ImageFormDisplay'

export default function EditImage() {
  const [validImage, setValidImage] = useState(null)
  const [isFormFilled, setIsFormFilled] = useState(false)
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
    // setIsSubmitted(true)
    if (validImage) {
      // const url = URL.createObjectURL(validImage)
      // setSubmittedImageUrl(url)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <ImageFormDisplay
        initialFormData={formData}
        setFormData={setFormData}
        imageFile={validImage}
        isFormFilled={isFormFilled}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        setValidImage={setValidImage}
      />
    </>
  )
}
