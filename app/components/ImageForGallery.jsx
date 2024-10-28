'use client'

import { useCallback, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'

import {
  deleteImage,
  getLikeCountForImage,
  toggleLike as toggleLikeAction,
} from '../(web)/[@username]/actions/imagesActions'
import { useGallery } from '../GaleryContext'
import { BVAvatar } from './BVAvatar'
import { BVLink } from './BVLink'
import ConfirmationModal from './ConfirmationModal'
import { useToast } from './ToastProvider'

function ImageForGallery({ image, onClick, onDelete, allImages, isAuthenticated }) {
  const { error: showToastError } = useToast()
  const [isLiked, setIsLiked] = useState(!!image.liked_by_current_user)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const searchParams = useSearchParams()
  const { setSearchParams } = useGallery()
  useEffect(() => {
    setSearchParams(searchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setIsDropdownOpen(false)
  }

  const handleToggleLike = useCallback(() => {
    if (!isAuthenticated) return

    setIsLiked((prevIsLiked) => {
      const updatedIsLiked = !prevIsLiked
      const imageIndex = allImages.findIndex((img) => img.id === image.id)
      if (imageIndex !== -1) {
        allImages[imageIndex].isLike = updatedIsLiked
      }
      return updatedIsLiked
    })
  }, [isAuthenticated, allImages, image.id])

  const handleLikeClick = async () => {
    if (isLoading) return
    setIsLoading(true)

    let isMounted = true
    try {
      handleToggleLike()
      const result = await toggleLikeAction(image.id)
      if (result.error) {
        if (isMounted) handleToggleLike()
        throw new Error(result.error)
      }
      const imageIndex = allImages.findIndex((img) => img.id === image.id)
      if (isMounted) {
        allImages[imageIndex].total_likes = await getLikeCountForImage(image.id)
      }
    } catch (error) {
      console.error('Failed to toggle like state:', error)
    } finally {
      if (isMounted) setIsLoading(false)
    }

    return () => {
      isMounted = false
    }
  }

  const handleDeleteImage = async () => {
    const result = await deleteImage(image.id)

    if (result.error) {
      showToastError('Failed to delete image, please try again later')
      setIsDeleteSuccess(false)
    } else {
      setIsDeleteSuccess(true)
      setTimeout(() => {
        setIsDeleteModalOpen(false)
        setIsDeleteSuccess(false)
        onDelete(image.id)
      }, 1000)
    }
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setIsDeleteSuccess(false)
  }
  return (
    <div
      className={`group relative h-0 w-full ${
        image.orientation === 'portrait' ? 'pb-[146%]' : 'pb-[60%]'
      } overflow-hidden`}
    >
      <Link
        className="group absolute h-full w-full cursor-pointer"
        href={{
          pathname: `/image/${image.url_slug}`,
          query: searchParams.toString(),
        }}
        onClick={onClick}
        scroll={false}
      >
        <Image
          src={image.imagePath}
          alt={image.title}
          blurDataURL={`data:image/jpeg;base64,${image.preview}`}
          placeholder="blur"
          width={image.file_sizes.original.width}
          height={image.file_sizes.original.height}
          className="h-full w-full rounded-medium object-cover"
          sizes="(max-width: 1280px) 50vw, 33vw"
        />
        <div
          className={`absolute inset-0 z-10 rounded-medium bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        ></div>
      </Link>

      <div className="absolute bottom-5 left-5 z-10 hidden flex-col font-bold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
        <div className="ml-12 group-hover:opacity-80">{image.title}</div>
        <BVLink className="flex items-center gap-2" href={`/@${image.users.username}`}>
          <BVAvatar className="h-10 w-10" src={image.users.avatarUrl} />
          <div className="text-large font-bold text-background">
            @{image.users.username}
          </div>
        </BVLink>
      </div>
      {isAuthenticated && (
        <button
          className={`absolute right-5 top-5 z-10 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background opacity-0 transition-opacity duration-300 md:flex ${isLiked ? 'opacity-100' : 'group-hover:opacity-100'}`}
          onClick={handleLikeClick}
          disabled={isLoading}
        >
          <Image
            src={isLiked ? '/heart-filled.svg' : '/heart-empty.svg'}
            alt="heart"
            className="pt-1"
            width={20}
            height={18}
          />
        </button>
      )}
      {image.isCurrentUser && (
        <Dropdown
          className="bg-secondary-50"
          classNames={{
            content: 'py-1 px-2 shadow-none',
          }}
          placement="right-start"
          onOpenChange={(open) => setIsDropdownOpen(open)}
          isOpen={isDropdownOpen}
        >
          <DropdownTrigger>
            <button
              className={`absolute left-5 top-5 z-10 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background transition-opacity duration-300 md:flex ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <Image
                src="/pencil.svg"
                width={17}
                height={17}
                alt="edit"
                className="rounded-none"
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Image Actions"
            closeOnSelect={false}
            variant="light"
            as="div"
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
            <DropdownItem key="delete" onClick={openDeleteModal}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      {isDeleteModalOpen && (
        <ConfirmationModal
          closeModal={closeDeleteModal}
          handle={handleDeleteImage}
          isHandleSuccess={isDeleteSuccess}
          type="delete"
        />
      )}
    </div>
  )
}

export default ImageForGallery
