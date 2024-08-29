'use client'

import { useEffect, useState } from 'react'

import NextImage from 'next/image'

import { Image } from '@nextui-org/image'
import { Switch } from '@nextui-org/react'

import { BVButton } from '@/app/components/BVButton'
import TagInput from '@/app/components/TagInput'

import { openFileDialog, validateAndLoadImage } from '../utils/imageUpload'
import { Modal } from './Modal'

function ImageFormDisplay({
  initialFormData,
  imageFile = null,
  isFormFilled = false,
  setFormData = () => {},
  handleCancel = () => {},
  handleSubmit = () => {},
  setValidImage = () => {},
}) {
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const [errorImage, setErrorImage] = useState(null)
  const [isAIGeneration, setIsAIGeneration] = useState(
    typeof initialFormData?.isAIGeneration === 'boolean'
      ? initialFormData.isAIGeneration
      : true
  )
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false)

  const closeModal = () => {
    setIsSaveModalOpen(false)
    setIsDeleteModalOpen(false)
    setIsDeleteSuccess(false)
  }

  const handleFormSubmit = (e) => {
    handleSubmit(e)
    closeModal()
  }

  const initialSoftwareTags = [
    'Leonardo',
    'Playground.ai',
    'DALL-E 2 by OpenAI',
    'MidJourney',
    'Stable Diffusion',
    'Artbreeder',
    'Deep Dream Generator',
    'Runway ML',
    'NightCafe Studio',
    'Craiyon',
    'DeepArt',
    `Let's Enhance`,
    'This Person Does Not Exist',
    'Pix2Pix by TensorFlow',
    'BigGAN by DeepMind',
    'Artisto',
    'Deep Dream by Google',
  ]

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [imageFile])

  const handleAIGenerationChange = (value) => {
    setIsAIGeneration(value)
    handleInputBlur('isAIGeneration')({ value })

    if (!value) {
      setFormData((prev) => ({
        ...prev,
        prompt: '',
        software: [],
      }))
    }
  }

  const handleInputBlur =
    (field) =>
    ({ value }) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

  const handleReplaceImage = () => {
    openFileDialog((file) => {
      validateAndLoadImage(file, handleImageChange)
    })
  }

  const handleImageChange = (file, errorMessage) => {
    setError(errorMessage)
    if (errorMessage) {
      if (file) {
        setErrorImage(URL.createObjectURL(file))
      } else {
        setErrorImage(null)
      }
      setValidImage(null)
    } else {
      if (file) {
        setValidImage(file)
      }
      if (errorImage) {
        URL.revokeObjectURL(errorImage)
      }
      setErrorImage(null)
    }
  }

  const handleDelete = () => {
    setValidImage(null)
    setIsDeleteSuccess(true)

    setTimeout(() => {
      closeModal()
    }, 2000)
  }

  return (
    <div className="my-11 md:mt-20">
      {error && (
        <div className="mb-7 flex flex-row justify-center rounded-medium bg-gradient-to-r from-danger-300 to-danger-400 px-5 py-6 text-secondary-50 md:mb-5 md:gap-12 md:p-6">
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
      )}

      <div className="flex flex-col gap-7 md:flex-row md:gap-5">
        <div className="md:w-2/3">
          <div className="relative">
            {imageFile ? (
              <Image
                src={imageUrl}
                alt="Uploaded image"
                className="rounded-medium border"
              />
            ) : (
              <div className="flex h-64 animate-pulse flex-col items-center justify-center text-balance rounded-medium bg-secondary-50 p-5 text-center md:h-96">
                <p className="text-mega">No Image</p>
                <p>Failed to display image. Please make sure the file was uploaded.</p>
              </div>
            )}
            <button
              className="absolute bottom-2.5 right-2.5 z-10 rounded-full border-white/50 bg-secondary-400/50 px-7 py-4 font-semibold text-white backdrop-blur-[25px] md:bottom-7 md:right-9"
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

          {!imageFile && (
            <div className="mt-14 hidden flex-row gap-10 px-4 text-large md:flex">
              <p className="md:w-1/3">
                <span className="font-bold">File Formats and Size:</span> Acceptable
                formats are JPG and PNG, with a maximum file size of 4MB and at least 1920
                pixels on one side.
              </p>
              <p className="md:w-1/3">
                <span className="font-bold">Ownership:</span> Only upload original media
                to which you own the rights.
              </p>
              <p className="md:w-1/3">
                <span className="font-bold">Content Restrictions:</span> Do not upload
                images containing graphic nudity, violence, or hate speech.
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="md:w-1/3">
          <div className="flex flex-col gap-5 rounded-medium border p-5">
            <TagInput
              label="Title"
              isTagInput={false}
              isSmallHeight={true}
              limitLettersAllTags={140}
              placeholder="Add title of the image"
              onBlur={handleInputBlur('title')}
              initialValue={initialFormData?.title || ''}
            />
            <TagInput
              label="Description"
              isTagInput={false}
              limitLettersAllTags={280}
              placeholder="Add optional description of the image"
              onBlur={handleInputBlur('description')}
              initialValue={initialFormData?.description || ''}
            />
            <Switch
              isSelected={isAIGeneration}
              onValueChange={handleAIGenerationChange}
              classNames={{
                wrapper: 'mr-5',
              }}
            >
              This media is AI generation
            </Switch>
            {isAIGeneration && (
              <div className="flex flex-col gap-5">
                <TagInput
                  label="Prompt"
                  isTagInput={false}
                  limitLettersAllTags={280}
                  placeholder="Add AI prompt that you used to create the image"
                  onBlur={handleInputBlur('prompt')}
                  initialValue={initialFormData?.prompt || ''}
                />
                <TagInput
                  label="Software Used"
                  showCounter={false}
                  onBlur={handleInputBlur('software')}
                  initialTags={initialSoftwareTags}
                  initialValue={initialFormData?.software || []}
                />
              </div>
            )}
            <TagInput
              label="Image tags"
              onBlur={handleInputBlur('tags')}
              initialValue={initialFormData?.tags || []}
            />

            <p
              onClick={() => setIsDeleteModalOpen(true)}
              className={`${!initialFormData ? 'hidden' : ''} cursor-pointer text-center text-small text-danger`}
            >
              Delete
            </p>
          </div>

          <BVButton
            onClick={() => setIsSaveModalOpen(true)}
            isDisabled={!isFormFilled}
            className={`my-7 w-full ${initialFormData ? '' : 'bg-secondary-50 text-inherit'}`}
          >
            {initialFormData ? 'Save' : 'Publish'}
          </BVButton>
          <p
            onClick={handleCancel}
            className="cursor-pointer text-center text-small text-primary"
          >
            Cancel
          </p>

          {isSaveModalOpen && (
            <Modal isImageForm={true} closeModal={closeModal}>
              <div className="m-5 rounded-xlarge bg-background p-10 text-semixlarge font-medium">
                <p className="px-7">Are you sure you need to save the file?</p>
                <div className="mt-12 flex justify-center gap-2">
                  <BVButton
                    className="w-1/2 bg-secondary-50 text-inherit"
                    onClick={closeModal}
                  >
                    Cancel
                  </BVButton>
                  <BVButton
                    type="submit"
                    onClick={handleFormSubmit}
                    className="w-1/2 bg-primary"
                  >
                    Save
                  </BVButton>
                </div>
              </div>
            </Modal>
          )}
        </form>
      </div>

      {isDeleteModalOpen && (
        <Modal isImageForm={true} closeModal={closeModal}>
          <div className="m-5 rounded-xlarge bg-background p-10 text-semixlarge font-medium">
            {isDeleteSuccess ? (
              <p className="py-7">The image was successfully deleted</p>
            ) : (
              <>
                <p className="px-7">Are you sure to delete file?</p>
                <div className="mt-12 flex justify-center gap-2">
                  <BVButton
                    className="w-1/2 bg-secondary-50 text-inherit"
                    onClick={closeModal}
                  >
                    Cancel
                  </BVButton>
                  <BVButton onClick={handleDelete} className="w-1/2 bg-danger">
                    Delete
                  </BVButton>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ImageFormDisplay