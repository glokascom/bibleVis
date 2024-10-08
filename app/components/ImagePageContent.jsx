'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import CreatorDetails from '@/app/components/CreatorDetails'
import Description from '@/app/components/Description'
import Download from '@/app/components/Download'
import RelatedImages from '@/app/components/RelatedImages'
import SoftwareUsed from '@/app/components/SoftwareUsed'
import TagList from '@/app/components/TagList'

import { useGallery } from '../GaleryContext'
import BVButton from './BVButton'

function ImagePageContent({
  imageInfo,
  relatedImages,
  isFollowed,
  isLike,
  totalLikes,
  isCurrentUser,
  isAuthenticated,
  isModal = false,
  children,
}) {
  const { images, currentIndex, setCurrentIndex } = useGallery()
  const [totalDownloads, setTotalDownloads] = useState(imageInfo.total_downloads || 0)
  const incrementDownloads = () => {
    setTotalDownloads((prevTotalDownloads) => prevTotalDownloads + 1)
  }
  return (
    <div
      className={`${isModal ? 'rounded-t-medium bg-background p-5 md:h-[90vh] md:w-[90vw] md:bg-transparent md:p-0' : 'px-5 md:px-0'}`}
    >
      <div
        className={`flex flex-col md:flex-row md:items-start ${!isModal ? 'gap-7' : ''} md:gap-2.5`}
      >
        <div className="relative rounded-medium bg-secondary-50 md:w-3/4 md:p-2.5">
          {imageInfo.imagePath ? (
            <>
              {children}
              {isCurrentUser && (
                <Link
                  href={`/user/${imageInfo.id}`}
                  className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background"
                >
                  <Image
                    src="/pencil.svg"
                    alt="edit"
                    width={17}
                    height={17}
                    radius="none"
                  />
                </Link>
              )}
            </>
          ) : (
            <p className="text-center">Image not available</p>
          )}
          {images.length > 1 && isModal && (
            <div className="hidden md:block">
              <Link
                href={`/image/${images[currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1]}`}
                onClick={() => {
                  setCurrentIndex(
                    currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1
                  )
                }}
                className="absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-50"
                scroll={false}
              >
                <Image width={14} height={16} src="/polygon.svg" alt="previous image" />
              </Link>
              <Link
                href={`/image/${images[currentIndex + 1 > images.length - 1 ? 0 : currentIndex + 1]}`}
                onClick={() => {
                  setCurrentIndex((currentIndex + 1) % images.length)
                }}
                className="absolute right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 rotate-180 items-center justify-center rounded-full bg-secondary-50"
                scroll={false}
              >
                <Image width={14} height={16} src="/polygon.svg" alt="next image" />
              </Link>
            </div>
          )}
        </div>

        {isModal && images.length > 1 && (
          <div className="my-2.5 flex justify-between md:hidden">
            <Link
              href={`/image/${images[currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1]}`}
              onClick={() => {
                setCurrentIndex(
                  currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1
                )
              }}
              scroll={false}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50"
            >
              <Image width={14} height={16} src="/polygon.svg" alt="previous image" />
            </Link>
            <Link
              href={`/image/${images[currentIndex + 1 > images.length - 1 ? 0 : currentIndex + 1]}`}
              onClick={() => {
                setCurrentIndex((currentIndex + 1) % images.length)
              }}
              scroll={false}
              className="flex h-10 w-10 rotate-180 items-center justify-center rounded-full bg-secondary-50"
            >
              <Image width={14} height={16} src="/polygon.svg" alt="next image" />
            </Link>
          </div>
        )}

        <div className="rounded-medium md:w-1/4 md:bg-secondary-50 md:p-2.5">
          <div className="flex flex-col gap-5 rounded-medium pb-28 md:pb-0">
            <div className="rounded-medium border bg-background p-5 shadow-small">
              <Download imageInfo={imageInfo} onDownload={incrementDownloads} />

              {isCurrentUser && (
                <BVButton
                  as={Link}
                  href={`/user/${imageInfo.id}`}
                  fullWidth
                  color="secondary"
                  className="mt-5"
                >
                  Edit image
                </BVButton>
              )}

              <Description
                imageInfo={imageInfo}
                totalDownloads={totalDownloads}
                isLike={isLike}
                isAuthenticated={isAuthenticated}
                totalLikes={totalLikes}
              />
              <CreatorDetails
                creator={imageInfo.users}
                followUserId={imageInfo.users.id}
                isFollowed={isFollowed}
                isCurrentUser={isCurrentUser}
                isAuthenticated={isAuthenticated}
              />
            </div>

            {!isModal && imageInfo.software?.length > 0 && (
              <div className="hidden rounded-medium border bg-background p-5 shadow-small md:block">
                <SoftwareUsed software={imageInfo.software} />
              </div>
            )}

            {imageInfo.tags?.length > 0 && (
              <div className="rounded-medium border bg-background p-5 shadow-small">
                <TagList tags={imageInfo.tags} />
              </div>
            )}

            <div className="rounded-medium border bg-background p-5 shadow-small">
              <RelatedImages
                relatedImages={relatedImages}
                username={imageInfo.users.username}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePageContent
