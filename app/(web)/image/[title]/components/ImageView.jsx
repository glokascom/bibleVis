'use client'

import ImagePageContent from '@/app/components/ImagePageContent'
import { ImageViewProvider } from '@/app/components/ImageViewProvider'

function ImageView({
  imageInfo,
  relatedImages,
  isFollowed,
  isLike,
  isCurrentUser,
  isAuthenticated,
  totalViews,
}) {
  return (
    <ImageViewProvider>
      <ImagePageContent
        imageInfo={imageInfo}
        relatedImages={relatedImages}
        isFollowed={isFollowed}
        isLike={isLike}
        isCurrentUser={isCurrentUser}
        isAuthenticated={isAuthenticated}
        totalViews={totalViews}
      />
    </ImageViewProvider>
  )
}

export default ImageView
