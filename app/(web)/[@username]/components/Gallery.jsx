'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import dynamic from 'next/dynamic'

import InfiniteScroll from 'react-infinite-scroll-component'

import { BVButton } from '@/app/components/BVButton'
import ImageForGallery from '@/app/components/ImageForGallery'

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
  isMainPage = false,
  isShowHeader = true,
  searchQuery = null,
  imageFilter = null,
  orientationFilter = null,
  sortDirection = 2,
}) {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalImages, setTotalImages] = useState(0)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    loadMoreImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, imageFilter, orientationFilter])

  const loadMoreImages = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return

    isLoadingRef.current = true
    const { images: newImages, totalCount } = await loadNextPage(
      profileUserId,
      page,
      searchQuery,
      imageFilter,
      orientationFilter,
      sortDirection
    )

    setImages((prevImages) => {
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
  }, [profileUserId, page, hasMore, searchQuery, imageFilter, orientationFilter])

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
              Photos
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
        next={loadMoreImages}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more images</p>}
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 1280: 3 }}>
          <Masonry gutter="10px">
            {images.map((image, index) => (
              <div key={image.id}>
                <ImageForGallery
                  image={image}
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
