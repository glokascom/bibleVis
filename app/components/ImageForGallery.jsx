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
    //P.s. эта фунцкция не нужна в данной реализации, если займёт много времени
  }
  const is_current_user_image = false // TODO: проверка на то, что это картинка текущего юзера
  const deleteImage = (uuid) => {
    console.log('delete image', uuid)
  }
  return (
    <div
      className={`group relative h-0 w-full ${
        image.orientation === 'portrait' ? 'pb-[146%]' : 'pb-[60%]'
      } overflow-hidden`}
    >
      <BVLink className="absolute inset-0 h-full w-full" href={`/image/${image.uuid}`}>
        <Image
          src={image.url}
          alt="image of gallery"
          removeWrapper={true}
          className="h-full w-full object-cover"
        />
      </BVLink>
      <div className="absolute bottom-4 left-5 z-10 flex flex-col font-bold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="ml-12">{image.title}</div>
        <BVLink className="flex items-center gap-2" href={`/@${image.user.username}`}>
          <BVAvatar className="h-8 w-8 md:h-10 md:w-10" />
          <div className="text-large font-bold text-background">
            @{image.user.username}
          </div>
        </BVLink>
      </div>
      {!is_current_user_image ? (
        <div
          className="absolute right-4 top-5 z-10 cursor-pointer rounded-full bg-background p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-3"
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
              <BVLink href={`/image/${image.uuid}`}>Edit Image</BVLink>
            </DropdownItem>
            <DropdownItem key="delete" onClick={() => deleteImage(image.uuid)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  )
}

export default ImageForGallery
