'use client'

import { useEffect, useRef, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import ImageForGallery from '@/app/components/ImageForGallery'

import { loadNextPage } from '../actions/imagesActions'

function Gallery({ userId, followUserId, initialImages }) {
  const [images, setImages] = useState(initialImages || [])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalImages, setTotalImages] = useState(0)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    setImages(initialImages)
  }, [initialImages])

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

    setTotalImages(totalCount)

    setPage((prevPage) => prevPage + 1)

    if (newImages.length < 10) {
      setHasMore(false)
    }

    isLoadingRef.current = false
  }

  return (
    <>
      <div className="mb-4 flex items-center">
        <h3 className="mr-4 font-sans text-5xl text-secondary">Gallery</h3>
        <span className="mt-6 font-sans text-base text-secondary">Images</span>
        <span className="ml-2 mt-7 text-secondary-500">{totalImages}</span>
      </div>
      <InfiniteScroll
        dataLength={images?.length}
        next={loadMoreImages}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more images</p>}
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 640: 3, 1280: 4 }}>
          <Masonry gutter="10px">
            {images?.map((image) => (
              <div key={image.id}>
                <ImageForGallery userId={userId} image={image} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </>
  )
}

export default Gallery
