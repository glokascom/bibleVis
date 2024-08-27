'use client'

import { useEffect, useState } from 'react'

import NextImage from 'next/image'

import { Image } from '@nextui-org/image'
import { Switch } from '@nextui-org/react'

import { BVButton } from '@/app/components/BVButton'
import TagInput from '@/app/components/TagInput'

function ImageFormDisplay({
  initialFormData,
  initialSoftwareTags = [],
  isAIGeneration = true,
  imageFile = null,
  handleCancel = () => {},
  handleSubmit = () => {},
  handleInputBlur = () => {},
  setIsAIGeneration = () => {},
  handleReplaceImage = () => {},
}) {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [imageFile])

  return (
    <div className="mb-12 mt-11 flex flex-col gap-7 md:flex-row md:gap-5">
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

        <div className="mt-14 hidden flex-row gap-10 px-4 text-large md:flex">
          <p className="md:w-1/3">
            <span className="font-bold">File Formats and Size:</span> Acceptable formats
            are JPG and PNG, with a maximum file size of 4MB and at least 1920 pixels on
            one side.
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
            onValueChange={setIsAIGeneration}
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
        </div>

        <BVButton type="submit" className="my-7 w-full bg-secondary-50 text-inherit">
          {initialFormData ? 'Update' : 'Publish'}
        </BVButton>
        <p
          onClick={handleCancel}
          className="cursor-pointer text-center text-small text-primary"
        >
          Cancel
        </p>
      </form>
    </div>
  )
}

export default ImageFormDisplay
