'use client'

import { useEffect, useState } from 'react'

import NextImage from 'next/image'
import { useRouter } from 'next/navigation'

import { Image } from '@nextui-org/image'
import { Switch } from '@nextui-org/react'

import { BVButton } from '@/app/components/BVButton'
import TagInput from '@/app/components/TagInput'

import { deleteImage } from '../(web)/[@username]/actions/imagesActions'
import { openFileDialog, validateAndLoadImage } from '../utils/imageUpload'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import SaveConfirmationModal from './SaveConfirmationModal'
import { useToast } from './ToastProvider'

function ImageFormDisplay({
  initialFormData,
  imageFile = null,
  isFormFilled = false,
  setFormData = () => {},
  handleCancel = () => {},
  handleSubmit = () => {},
  setValidImage = () => {},
  softwareOptions = [],
  tagsOptions = [],
  isLoading = false,
}) {
  const [imageUrl, setImageUrl] = useState(initialFormData?.imagePath || '')
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

  const router = useRouter()
  const { success: showToastSuccess, error: showToastError } = useToast()

  const closeModal = () => {
    setIsSaveModalOpen(false)
    setIsDeleteModalOpen(false)
    setIsDeleteSuccess(false)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleSubmit(e)
      closeModal()
    } catch (error) {
      console.error('Error uploading the image:', error)
    }
  }

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
        const url = URL.createObjectURL(file)
        setImageUrl(url)
      }
    }
  }

  const handleDeleteImage = async () => {
    const result = await deleteImage(initialFormData.id)
    if (result.error) {
      showToastError(result.error)
    } else {
      showToastSuccess('Image deleted successfully')
      router.push(`/@${initialFormData.username}`)
    }
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

      <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-2.5">
        <div className="rounded-medium bg-secondary-50 md:w-2/3 md:p-2.5">
          <div className="relative rounded-medium bg-secondary-50">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Uploaded image"
                classNames={{
                  img: 'w-full h-auto aspect-video object-contain',
                }}
                layout="fill"
              />
            ) : (
              <div className="flex aspect-video animate-pulse flex-col items-center justify-center text-balance rounded-medium bg-secondary-50 p-5 text-center">
                <p className="text-mega">No Image</p>
                <p>Failed to display image. Please make sure the file was uploaded.</p>
              </div>
            )}

            <button
              className={`absolute bottom-2.5 right-2.5 z-10 rounded-full border-white/50 bg-secondary-400/50 px-7 py-4 font-semibold text-white backdrop-blur-[25px] md:bottom-7 md:right-9 ${initialFormData?.imagePath ? 'hidden' : ''}`}
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

          {!imageUrl && (
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
          <div className="flex flex-col gap-5 rounded-medium border p-5 shadow-small">
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
              <TagInput
                label="Prompt"
                isTagInput={false}
                limitLettersAllTags={280}
                placeholder="Add AI prompt that you used to create the image"
                onBlur={handleInputBlur('prompt')}
                initialValue={initialFormData?.prompt || ''}
              />
            )}
            <TagInput
              label="Software Used"
              showCounter={false}
              onBlur={handleInputBlur('software')}
              initialTags={softwareOptions}
              allowAddOnEnter={false}
              initialValue={initialFormData?.software || []}
              isAIGeneration={isAIGeneration}
            />
            <TagInput
              label="Image tags"
              onBlur={handleInputBlur('tags')}
              initialTags={tagsOptions}
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
            isDisabled={!isFormFilled || isLoading}
            className={`my-7 w-full ${initialFormData ? '' : 'bg-secondary-50 text-inherit'}`}
          >
            {initialFormData ? 'Save' : 'Publish'}
          </BVButton>
          <p
            onClick={handleCancel}
            className="cursor-pointer pb-12 text-center text-small text-primary"
          >
            Cancel
          </p>

          <SaveConfirmationModal
            isSaveModalOpen={isSaveModalOpen}
            closeModal={closeModal}
            handleFormSubmit={handleFormSubmit}
            isLoading={isLoading}
            isNewImage={!initialFormData}
          />
        </form>
      </div>

      <DeleteConfirmationModal
        isDeleteModalOpen={isDeleteModalOpen}
        closeModal={closeModal}
        handleDelete={handleDeleteImage}
        isDeleteSuccess={isDeleteSuccess}
      />
    </div>
  )
}

export default ImageFormDisplay
