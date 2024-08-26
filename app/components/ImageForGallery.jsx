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
  const is_current_image_liked = true // TODO: проверка на то, что эту картинку уже лайкнул текущий юзер
  const handleToggleFollow = () => {
    console.log('follow/unfollow')
    // TODO: с помощью серверной функции в базе поменять значение, в функции сделат ревалидейт
  }
  const is_current_user_image = true // TODO: проверка на то, что это картинка текущего юзера
  return (
    <div className="group relative w-fit">
      <BVLink href={`/image/${image.uuid}`}>
        <Image src={image.url} alt="random image" />
      </BVLink>
      <div className="absolute bottom-4 left-5 z-10 flex flex-col font-bold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="ml-12">{image.title}</div>
        <BVLink className="flex items-center gap-2" href={`/@${image.user.username}`}>
          <BVAvatar />
          <div className="text-large font-bold text-background">
            @{image.user.username}
          </div>
        </BVLink>
      </div>
      {!is_current_user_image ? (
        <div
          className="absolute right-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={handleToggleFollow}
        >
          <Image
            src={is_current_image_liked ? '/heart-filled.svg' : '/heart-empty.svg'}
            alt="heart"
          />
        </div>
      ) : (
        <Dropdown
          className="bg-secondary-50"
          classNames={{
            content: 'py-1 px-2 shadow-none mt-4',
          }}
        >
          <DropdownTrigger>
            <div className="absolute left-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Image src="/pencil.svg" alt="edit" className="w-6" />
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
              <BVLink href={`/image/${image.uuid}`}>Edit Image</BVLink>
            </DropdownItem>
            <DropdownItem key="delete">Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  )
}

export default ImageForGallery
