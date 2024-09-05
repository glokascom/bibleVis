'use client'

import { useEffect, useRef, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import ImageForGallery from '@/app/components/ImageForGallery'

import { loadNextPage } from '../actions/imagesActions'

function Gallery({ userId, followUserId, toggleLike, deleteImage }) {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [totalImages, setTotalImages] = useState(0) // Track total images
  const isLoadingRef = useRef(false)

  useEffect(() => {
    const initialize = async () => {
      await loadMoreImages()
      setMounted(true)
    }

    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadMoreImages = async () => {
    if (isLoadingRef.current || !hasMore) return

    isLoadingRef.current = true
    const { images: newImages, totalCount } = await loadNextPage(
      userId,
      followUserId,
      page
    )

    setImages((prevImages) => {
      const existingImageIds = new Set(prevImages.map((img) => img.id))
      const filteredNewImages = newImages.filter((img) => !existingImageIds.has(img.id))
      return [...prevImages, ...filteredNewImages]
    })

    setTotalImages(totalCount) // Update total images count

    setPage((prevPage) => prevPage + 1)

    if (newImages.length < 10) {
      setHasMore(false)
    }

    isLoadingRef.current = false
  }

  if (!mounted) return null

  return (
    <>
      <div className="mb-4 flex items-center">
        <h3 className="mr-4 font-sans text-5xl text-secondary">Gallary</h3>
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
                  toggleLike={toggleLike}
                  deleteImage={deleteImage}
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
