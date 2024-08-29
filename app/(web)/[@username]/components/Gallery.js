'use client'

import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import ImageForGallery from '@/app/components/ImageForGallery'

import { getImages } from '../actions/images'

function Gallery() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    loadMoreImages()
    setMounted(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadMoreImages = async () => {
    const newImages = await getImages(page)
    setImages((prevImages) => [...prevImages, ...newImages])
    setPage(page + 1)

    if (newImages.length < 10) {
      setHasMore(false)
    }
  }

  if (!mounted) return null

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={loadMoreImages}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more images to load</p>}
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 640: 3, 1280: 4 }}>
        <Masonry gutter="10px">
          {images.map((image) => (
            <div key={image.uuid}>
              <ImageForGallery image={image} />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </InfiniteScroll>
  )
}

export default Gallery
