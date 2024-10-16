'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'

import InfiniteScroll from 'react-infinite-scroll-component'

import { BVButton } from '@/app/components/BVButton'
import ImageForGallery from '@/app/components/ImageForGallery'
import { useGallery } from '@/app/GaleryContext'

import { loadNextPage } from '../actions/imagesActions'

const ResponsiveMasonry = dynamic(
  () => import('react-responsive-masonry').then((mod) => mod.ResponsiveMasonry),
  {
    ssr: false,
  }
)
const Masonry = dynamic(
  () => import('react-responsive-masonry').then((mod) => mod.default),
  {
    ssr: false,
  }
)

function Gallery({
  isAuthenticated,
  profileUserId = null,
  backUrl = '/',
  isMainPage = false,
  isShowHeader = true,
  searchQuery = null,
}) {
  const { setImages: setGalleryImages, setCurrentIndex, setBasePageUrl } = useGallery()

  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalImages, setTotalImages] = useState(0)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    loadMoreImages()
    // TODO я думаю тут надо делать сброс страницы если поисковый запрос изменился. Тут больше бы подошло resetAndReloadImages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  useEffect(() => {
    setBasePageUrl(backUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backUrl])

  const loadMoreImages = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return

    isLoadingRef.current = true
    const { images: newImages, totalCount } = await loadNextPage(
      profileUserId,
      page,
      searchQuery,
      10
    )

    setImages((prevImages) => {
      // TODO не до конца понимаю, для чего тут фильтруются картинки и откуда тут дубликаты
      const existingImageIds = new Set(prevImages.map((img) => img.id))
      const filteredNewImages = newImages.filter((img) => !existingImageIds.has(img.id))
      return [...prevImages, ...filteredNewImages]
    })

    setTotalImages(totalCount)
    setPage((prevPage) => prevPage + 1)

    if (newImages.length < 10) {
      setHasMore(false)
    }

    isLoadingRef.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUserId, page, hasMore, searchQuery])

  useEffect(() => {
    setGalleryImages(images.map((image) => image.url_slug))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  const resetAndReloadImages = async () => {
    setPage(1)
    setHasMore(true)
    setImages([])
    await loadMoreImages()
  }

  const handleImageDelete = async (deletedImageId) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((img) => img.id !== deletedImageId)
      return updatedImages
    })

    setTotalImages((prevTotal) => prevTotal - 1)

    await resetAndReloadImages()
  }

  return (
    <>
      {isShowHeader && (
        <div className="mb-5 mt-10 flex items-center">
          {isMainPage ? (
            <BVButton color="secondary" isDisabled>
              Images
            </BVButton>
          ) : (
            <>
              <h3 className="mr-4 font-sans text-5xl text-secondary">Gallery</h3>
              <span className="mt-6 font-sans text-base text-secondary">Images</span>
              <span className="ml-2 mt-7 text-secondary-500">{totalImages}</span>
            </>
          )}
        </div>
      )}

      <InfiniteScroll
        dataLength={images.length}
        className="mb-16"
        next={loadMoreImages}
        hasMore={hasMore}
        loader={
          <div className="my-4 animate-pulse rounded-medium border border-secondary-200 p-4 text-center">
            Loading ...
          </div>
        }
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 1280: 3 }}>
          <Masonry gutter="10px">
            {images.map((image, index) => (
              <div key={image.url_slug}>
                <ImageForGallery
                  image={image}
                  onClick={() => setCurrentIndex(index)}
                  setCurrentIndex={setCurrentIndex}
                  allImages={images}
                  currentIndex={index}
                  isAuthenticated={isAuthenticated}
                  onDelete={handleImageDelete}
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </>
  )
}

export default Gallery
