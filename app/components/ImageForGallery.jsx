'use client'

import { useOptimistic, useState } from 'react'

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

function ImageForGallery({ userId, image }) {
  const [optimisticState, toggleOptimisticState] = useOptimistic(
    image.liked_by_current_user,
    (prevLiked, newValue) => newValue
  )
  // const optimisticState = image.liked_by_current_user

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  const handleToggleLike = async () => {
    toggleOptimisticState(!optimisticState)
    await updateGallery('toggleLike', userId, image.id)
  }

  const is_current_user_image = image.isOwnedByCurrentUser

  const handleDeleteImage = async () => {
    const result = await updateGallery('deleteImage', userId, image.id)

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

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setIsDeleteSuccess(false)
    setDeleteError(null)
  }

  return (
    <div
      className={`group relative h-0 w-full ${
        image.orientation === 'portrait' ? 'pb-[146%]' : 'pb-[60%]'
      } overflow-hidden`}
    >
      <BVLink
        className="absolute inset-0 h-full w-full group-hover:opacity-80"
        href={`/image/${image.title}`}
      >
        <Image
          src={image.imagePath}
          alt="image of gallery"
          removeWrapper={true}
          className="h-full w-full object-cover"
        />
      </BVLink>
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
        className={`absolute right-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 ${optimisticState ? 'opacity-100' : 'group-hover:opacity-100'} md:p-3`}
        onClick={handleToggleLike}
      >
        <Image
          src={optimisticState ? '/heart-filled.svg' : '/heart-empty.svg'}
          alt="heart"
        />
      </div>
      {is_current_user_image && (
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
              <BVLink href={`/user/edit-image`}>Edit Image</BVLink>
            </DropdownItem>
            <DropdownItem key="delete" onClick={openDeleteModal}>
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
    </div>
  )
}

export default ImageForGallery
