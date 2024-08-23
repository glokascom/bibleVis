'use client'

import { Image } from '@nextui-org/react'

import { BVAvatar } from './BVAvatar'

function ImageForGallery({ image }) {
  const is_current_user_following = false
  const handleToggleFollow = () => {
    console.log('follow/unfollow')
  }
  const is_current_user_image = true
  return (
    <div className="group relative">
      <Image src={image.url} alt="random image" />
      <div className="absolute bottom-4 left-5 z-10 flex flex-col font-bold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="ml-12">{image.title}</div>
        <div className="flex items-center gap-2">
          <BVAvatar />
          <div className="text-large">{image.user.username}</div>
        </div>
      </div>
      {!is_current_user_image ? (
        <div
          className="absolute right-4 top-5 z-10 rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={handleToggleFollow}
        >
          <Image
            src={is_current_user_following ? '/heart-filled.svg' : '/heart-empty.svg'}
            alt="heart"
          />
        </div>
      ) : (
        <div
          className="absolute left-4 top-5 z-10 rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={handleToggleFollow}
        >
          <Image src="/pencil.svg" alt="edit" className="w-6" />
        </div>
      )}
    </div>
  )
}

export default ImageForGallery
