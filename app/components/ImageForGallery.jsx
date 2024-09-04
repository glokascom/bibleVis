'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { Image } from '@nextui-org/image'

import { BVAvatar } from './BVAvatar'
import { BVLink } from './BVLink'

function ImageForGallery({ image }) {
  const is_current_image_liked = image.liked_by_current_user
  const handleToggleLike = (imageId) => {
    console.log('like/unlike', imageId)
    // TODO: с помощью серверной функции в базе поменять значение, в функции сделат ревалидейт
    //P.s. эта фунцкция не нужна в данной реализации, если займёт много времени
  }
  const is_current_user_image = image.isOwnedByCurrentUser
  const deleteImage = (imageId) => {
    console.log('delete image', imageId)
  }
  return (
    <div
      className={`group relative h-0 w-full ${
        image.orientation === 'portrait' ? 'pb-[146%]' : 'pb-[60%]'
      } overflow-hidden`}
    >
      <BVLink
        className="absolute inset-0 h-full w-full group-hover:opacity-80"
        href={`/image/${image.title}`}
      >
        <Image
          src={image.imagePath}
          alt="image of gallery"
          removeWrapper={true}
          className="h-full w-full object-cover"
        />
      </BVLink>
      <div className="absolute bottom-4 left-5 z-10 flex flex-col font-bold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="ml-12 group-hover:opacity-80">{image.title}</div>
        <BVLink className="flex items-center gap-2" href={`/@${image.users.username}`}>
          <BVAvatar className="h-8 w-8 md:h-10 md:w-10" />
          <div className="text-large font-bold text-background">
            @{image.users.username}
          </div>
        </BVLink>
      </div>
      <div
        className={`absolute right-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 ${is_current_image_liked ? 'opacity-100' : 'group-hover:opacity-100'} md:p-3`}
        onClick={() => handleToggleLike(image.id)}
      >
        <Image
          src={is_current_image_liked ? '/heart-filled.svg' : '/heart-empty.svg'}
          alt="heart"
        />
      </div>
      {is_current_user_image && (
        <Dropdown
          className="bg-secondary-50"
          classNames={{
            content: 'py-1 px-2 shadow-none',
          }}
          placement="right-start"
        >
          <DropdownTrigger>
            <div className="absolute left-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-3">
              <Image src="/pencil.svg" alt="edit" className="rounded-none" />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Image Actions"
            closeOnSelect={false}
            variant="light"
            as={`div`}
            color="primary"
            classNames={{ list: 'divide-y-1 divide-secondary-100' }}
            itemClasses={{
              title: 'font-[600] text-medium',
              base: 'py-2.5 rounded-none',
            }}
          >
            <DropdownItem key="edit">
              <BVLink href={`/image/${image.id}`}>Edit Image</BVLink>
            </DropdownItem>
            <DropdownItem key="delete" onClick={() => deleteImage(image.id)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  )
}

export default ImageForGallery
