'use client'

import { useCallback, useRef, useState } from 'react'

import { usePathname } from 'next/navigation'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { Image } from '@nextui-org/image'

import {
  checkIfLiked,
  deleteImage,
  getImageStats,
  getLikeCountForImage,
  incrementImageViews,
  toggleLike as toggleLikeAction,
} from '../(web)/[@username]/actions/imagesActions'
import { BVAvatar } from './BVAvatar'
import { BVLink } from './BVLink'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import ImagePageContent from './ImagePageContent'
import { Modal } from './Modal'

function ImageForGallery({ image, onDelete, allImages, currentIndex, isAuthenticated }) {
  const [isLiked, setIsLiked] = useState(!!image.liked_by_current_user)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false)
  const [deleteError, setDeleteError] = useState(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setIsDropdownOpen(false)
  }

  const pathname = usePathname()
  const originalPathname = useRef(pathname)

  const handleToggleLike = useCallback(() => {
    if (!isAuthenticated) return

    setIsLiked((prevIsLiked) => !prevIsLiked)

    const imageIndex = allImages.findIndex((img) => img.id === image.id)
    if (imageIndex !== -1) {
      allImages[imageIndex].fullInfo.isLike = !isLiked
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiked, allImages, image.id])

  const handleLikeClick = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      handleToggleLike()
      const result = await toggleLikeAction(image.id)
      if (result.error) {
        handleToggleLike()
        throw new Error(result.error)
      }
      const imageIndex = allImages.findIndex((img) => img.id === image.id)
      allImages[imageIndex].total_likes = await getLikeCountForImage(image.id)
    } catch (error) {
      console.error('Failed to toggle like state:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteImage = async () => {
    const result = await deleteImage(image.id)

    if (result.error) {
      setDeleteError(result.error)
      setIsDeleteSuccess(false)
    } else {
      setIsDeleteSuccess(true)
      setDeleteError(null)
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
    setDeleteError(null)
  }

  const handlePrevImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1
    setCurrentImageIndex(newIndex)
    updateUrl(allImages[newIndex].id)
  }

  const handleNextImage = () => {
    const newIndex = currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(newIndex)
    updateUrl(allImages[newIndex].id)
  }

  const updateUrl = (imageId) => {
    const newUrl = `/image/${imageId}`
    window.history.pushState(null, '', newUrl)
  }

  const openImageModal = async () => {
    setIsImageModalOpen(true)
    originalPathname.current = pathname
    updateUrl(image.id)

    const imageIndex = allImages.findIndex((img) => img.id === image.id)

    allImages[imageIndex].total_views += 1
    if (!(await incrementImageViews(image.id))) {
      allImages[imageIndex].total_views -= 1
    }
  }

  const closeImageModal = async () => {
    setIsImageModalOpen(false)
    setCurrentImageIndex(currentIndex)
    window.history.pushState(null, '', originalPathname.current)

    const { existingLike } = await checkIfLiked(image.id)
    setIsLiked(!!existingLike)

    const imageIndex = allImages.findIndex((img) => img.id === image.id)
    allImages[imageIndex].total_likes = await getLikeCountForImage(image.id)
    allImages[imageIndex].fullInfo.isLike = !!existingLike

    const { totalViews, totalDownloads } = await getImageStats(image.id)
    allImages[imageIndex].total_views = totalViews
    allImages[imageIndex].total_downloads = totalDownloads
  }

  return (
    <div
      className={`group relative h-0 w-full ${
        image.orientation === 'portrait' ? 'pb-[146%]' : 'pb-[60%]'
      } overflow-hidden`}
    >
      <div
        className="group absolute h-full w-full cursor-pointer"
        onClick={openImageModal}
      >
        <Image
          src={image.imagePath}
          alt="image of gallery"
          removeWrapper={true}
          className="h-full w-full object-cover"
          onLoad={() => setIsImageLoaded(true)}
        />
        <div
          className={`absolute inset-0 z-10 rounded-medium bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        ></div>
      </div>

      {isImageLoaded && (
        <>
          <div className="absolute bottom-4 left-5 z-10 flex flex-col font-bold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="ml-12 group-hover:opacity-80">{image.title}</div>
            <BVLink
              className="flex items-center gap-2"
              href={`/@${image.users.username}`}
            >
              <BVAvatar className="h-8 w-8 md:h-10 md:w-10" />
              <div className="text-large font-bold text-background">
                @{image.users.username}
              </div>
            </BVLink>
          </div>
          {isAuthenticated && (
            <button
              className={`absolute right-4 top-5 z-10 h-11 w-11 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 ${isLiked ? 'opacity-100' : 'group-hover:opacity-100'} md:p-3`}
              onClick={handleLikeClick}
              disabled={isLoading}
            >
              <Image
                src={isLiked ? '/heart-filled.svg' : '/heart-empty.svg'}
                alt="heart"
                radius="none"
              />
            </button>
          )}
          {image.fullInfo.isCurrentUser && (
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
                  className={`absolute left-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 transition-opacity duration-300 ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} md:p-3`}
                >
                  <Image src="/pencil.svg" alt="edit" className="rounded-none" />
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
        </>
      )}

      <DeleteConfirmationModal
        isDeleteModalOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDeleteImage}
        isDeleteSuccess={isDeleteSuccess}
        deleteError={deleteError}
      />
      {isImageModalOpen && (
        <Modal showCloseButton={true} closeModal={closeImageModal}>
          <ImagePageContent
            isModal={true}
            imageInfo={allImages[currentImageIndex]}
            relatedImages={allImages[currentImageIndex].fullInfo.relatedImages}
            isFollowed={allImages[currentImageIndex].fullInfo.isFollowed}
            isLike={allImages[currentImageIndex].fullInfo.isLike}
            totalLikes={allImages[currentImageIndex].totalLikes}
            isCurrentUser={allImages[currentImageIndex].fullInfo.isCurrentUser}
            onPrevImage={handlePrevImage}
            onNextImage={handleNextImage}
            isAuthenticated={isAuthenticated}
          />
        </Modal>
      )}
    </div>
  )
}

export default ImageForGallery
