'use client'

import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import ImageForGallery from '@/app/components/ImageForGallery'

import { getImages } from '../actions/imagesActions'

function Gallery({ userId, followUserId }) {
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
    const newImages = await getImages(userId, followUserId, page)

    setImages((prevImages) => {
      const existingImageIds = new Set(prevImages.map((img) => img.id))
      // Фильтруем новые изображения, чтобы избежать дубликатов
      const filteredNewImages = newImages.filter((img) => !existingImageIds.has(img.id))

      const updatedImages = [...prevImages, ...filteredNewImages]
      return updatedImages
    })

    setPage((prevPage) => prevPage + 1)

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
      endMessage={<p></p>}
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 640: 3, 1280: 4 }}>
        <Masonry gutter="10px">
          {images.map((image) => (
            <div key={image.id}>
              <ImageForGallery image={image} />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </InfiniteScroll>
  )
}

export default Gallery
