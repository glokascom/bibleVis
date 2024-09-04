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
    <div>
      <div className="mb-4 flex items-center">
        <h3 className="mr-4 text-3xl font-bold">Gallary</h3>
        <span className="mt-1 text-xl font-bold">Images</span>
        <span className="ml-2 mt-2 text-gray-500">{totalImages}</span>
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
              <div key={image.id} className="group relative">
                <ImageForGallery
                  userId={userId}
                  image={image}
                  toggleLike={toggleLike}
                  deleteImage={deleteImage}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="text-center text-white">
                    <button className="mb-2 block">Edit image</button>
                    <button>Delete</button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm">Title {image.title}</p>
                  <p className="text-xs text-gray-500">{image.username}</p>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  )
}

export default Gallery
