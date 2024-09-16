'use client'

import { useOptimistic, useState, useTransition } from 'react'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { Image } from '@nextui-org/image'

import { updateGallery } from '../(web)/[@username]/actions/updateGallery'
import { BVAvatar } from './BVAvatar'
import { BVLink } from './BVLink'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import ImagePageContent from './ImagePageContent'
import { Modal } from './Modal'

function ImageForGallery({ image, fullInfo, allImages, currentIndex }) {
  const [isLiked, setIsLiked] = useOptimistic(fullInfo.isLike)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false)
  const [deleteError, setDeleteError] = useState(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)
  const handleToggleLike = async () => {
    startTransition(async () => {
      setIsLiked(!isLiked)
      const result = await updateGallery('toggleLike', image.id)
      if (result.error) {
        console.error('Error toggling like:', result.error)
        setIsLiked(isLiked)
      }
    })
  }

  const handleDeleteImage = async () => {
    const result = await updateGallery('deleteImage', image.id)

    if (result.error) {
      setDeleteError(result.error)
      setIsDeleteSuccess(false)
    } else {
      setIsDeleteSuccess(true)
      setDeleteError(null)
      setTimeout(() => {
        setIsDeleteModalOpen(false)
        setIsDeleteSuccess(false)
      }, 2000)
    }
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setIsDeleteSuccess(false)
    setDeleteError(null)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))
  }

  return (
    <div
      className={`group relative h-0 w-full ${
        image.orientation === 'portrait' ? 'pb-[146%]' : 'pb-[60%]'
      } overflow-hidden`}
    >
      <div
        className="absolute inset-0 h-full w-full cursor-pointer group-hover:opacity-80"
        onClick={() => setIsImageModalOpen(true)}
      >
        <Image
          src={image.imagePath}
          alt="image of gallery"
          removeWrapper={true}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-5 z-10 flex flex-col font-bold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="ml-12 group-hover:opacity-80">{image.title}</div>
        <BVLink className="flex items-center gap-2" href={`/@${image.users.username}`}>
          <BVAvatar className="h-8 w-8 md:h-10 md:w-10" />
          <div className="text-large font-bold text-background">
            @{image.users.username}
          </div>
        </BVLink>
      </div>
      <div
        className={`absolute right-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 ${isLiked ? 'opacity-100' : 'group-hover:opacity-100'} md:p-3`}
        onClick={handleToggleLike}
      >
        <Image
          src={isLiked ? '/heart-filled.svg' : '/heart-empty.svg'}
          alt="heart"
          radius="none"
          className={isPending ? 'opacity-50' : ''}
        />
      </div>
      {fullInfo.isCurrentUser && (
        <Dropdown
          className="bg-secondary-50"
          classNames={{
            content: 'py-1 px-2 shadow-none',
          }}
          placement="right-start"
        >
          <DropdownTrigger>
            <div className="absolute left-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-3">
              <Image src="/pencil.svg" alt="edit" className="rounded-none" />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Image Actions"
            closeOnSelect={false}
            variant="light"
            as={`div`}
            color="primary"
            classNames={{ list: 'divide-y-1 divide-secondary-100' }}
            itemClasses={{
              title: 'font-[600] text-medium',
              base: 'py-2.5 rounded-none',
            }}
          >
            <DropdownItem key="edit">
              <BVLink href={`/user/${image.id}`}>Edit Image</BVLink>
            </DropdownItem>
            <DropdownItem key="delete" onClick={() => setIsDeleteModalOpen(true)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <DeleteConfirmationModal
        isDeleteModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDeleteImage}
        isDeleteSuccess={isDeleteSuccess}
        deleteError={deleteError}
      />

      {isImageModalOpen && (
        <Modal
          showCloseButton={true}
          closeModal={() => {
            setIsImageModalOpen(false)
            setCurrentImageIndex(currentIndex)
          }}
        >
          <ImagePageContent
            isModal={true}
            imageInfo={allImages[currentImageIndex].fullInfo.imageInfo}
            relatedImages={allImages[currentImageIndex].fullInfo.relatedImages}
            isFollowed={allImages[currentImageIndex].fullInfo.isFollowed}
            isLike={allImages[currentImageIndex].fullInfo.isLike}
            isCurrentUser={allImages[currentImageIndex].fullInfo.isCurrentUser}
            onPrevImage={handlePrevImage}
            onNextImage={handleNextImage}
          />
        </Modal>
      )}
    </div>
  )
}

export default ImageForGallery
