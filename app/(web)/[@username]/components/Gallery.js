'use client'

import { useEffect, useRef, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import ImageForGallery from '@/app/components/ImageForGallery'

import { loadNextPage } from '../actions/imagesActions'

function Gallery({ userId, followUserId, initialImages, totalCount }) {
  const [images, setImages] = useState(initialImages)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [totalImages, setTotalImages] = useState(totalCount)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    setImages(initialImages)
    setTotalImages(totalCount)
  }, [initialImages, totalCount])

  useEffect(() => {
    const initialize = async () => {
      await loadMoreImages()
      setMounted(true)
    }

    initialize()
  }, [])

  const loadMoreImages = async () => {
    if (isLoadingRef.current || !hasMore) return

    isLoadingRef.current = true
    const { images: newImages, totalCount } = await loadNextPage(followUserId, page)

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
  }

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

  if (!mounted) return null

  return (
    <>
      <div className="mb-4 flex items-center">
        <h3 className="mr-4 font-sans text-5xl text-secondary">Gallery</h3>
        <span className="mt-6 font-sans text-base text-secondary">Images</span>
        <span className="ml-2 mt-7 text-secondary-500">{totalImages}</span>
      </div>
      <InfiniteScroll
        dataLength={images.length}
        next={loadMoreImages}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more images</p>}
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 640: 3, 1280: 4 }}>
          <Masonry gutter="10px">
            {images.map((image) => (
              <div key={image.id}>
                <ImageForGallery
                  userId={userId}
                  image={image}
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
