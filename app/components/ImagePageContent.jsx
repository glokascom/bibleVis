'use client'

import { useEffect, useMemo, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import CreatorDetails from '@/app/components/CreatorDetails'
import Description from '@/app/components/Description'
import Download from '@/app/components/Download'
import RelatedImages from '@/app/components/RelatedImages'
import SoftwareUsed from '@/app/components/SoftwareUsed'
import TagList from '@/app/components/TagList'

import { getImageStats } from '../(web)/[@username]/actions/imagesActions'
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
  const { images, currentIndex, setCurrentIndex, basePageUrl } = useGallery()
  const searchParams = useSearchParams()
  const [totalDownloads, setTotalDownloads] = useState(imageInfo.total_downloads || 0)
  const { push } = useRouter()
  const incrementDownloads = () => {
    setTotalDownloads((prevTotalDownloads) => prevTotalDownloads + 1)
  }

  const handlePreviousImage = async () => {
    const newIndex = currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)

    await getImageStats(imageInfo.id)
  }

  const handleNextImage = async () => {
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)

    await getImageStats(imageInfo.id)
  }

  const nextUrl = useMemo(() => {
    const nextIndex = (currentIndex + 1) % images.length
    return `/image/${images[nextIndex]}${searchParams ? `?${searchParams.toString()}` : ''}`
  }, [currentIndex, images, searchParams])

  const prevUrl = useMemo(() => {
    const previousIndex = currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1
    return `/image/${images[previousIndex]}${searchParams ? `?${searchParams.toString()}` : ''}`
  }, [currentIndex, images, searchParams])

  useEffect(() => {
    const handleKeyDown = async (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          await handlePreviousImage()
          push(prevUrl)
          break
        case 'ArrowRight':
          await handleNextImage()
          push(nextUrl)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`${isModal ? 'rounded-t-medium bg-background p-5 lg:h-[calc(100vh-6.5rem)] lg:w-[calc(100vw-13rem)] lg:bg-transparent lg:p-0' : 'px-5 lg:px-0'}`}
    >
      <div
        className={`flex flex-col lg:flex-row lg:items-start ${!isModal ? 'gap-7' : ''} md:gap-2.5`}
      >
        <div
          className={`relative w-full rounded-medium bg-secondary-50 md:p-2.5 lg:w-2/3 xl:w-3/4 ${isModal && images.length > 1 ? '' : 'mb-5'}`}
        >
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
                href={prevUrl}
                onClick={handlePreviousImage}
                className="absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-50"
                scroll={false}
              >
                <Image width={14} height={16} src="/polygon.svg" alt="previous image" />
              </Link>
              <Link
                href={nextUrl}
                onClick={handleNextImage}
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
              href={prevUrl}
              onClick={handlePreviousImage}
              scroll={false}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50"
            >
              <Image width={14} height={16} src="/polygon.svg" alt="previous image" />
            </Link>
            <Link
              href={nextUrl}
              onClick={handleNextImage}
              scroll={false}
              className="flex h-10 w-10 rotate-180 items-center justify-center rounded-full bg-secondary-50"
            >
              <Image width={14} height={16} src="/polygon.svg" alt="next image" />
            </Link>
          </div>
        )}

        <div className="w-full rounded-medium md:bg-secondary-50 md:p-2.5 lg:w-1/3 xl:w-1/4">
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
                isFollowed={isFollowed}
                isCurrentUser={isCurrentUser}
                isAuthenticated={isAuthenticated}
              />
            </div>
            {imageInfo.software?.length > 0 && (
              <div className="rounded-medium border bg-background p-5 shadow-small">
                <SoftwareUsed software={imageInfo.software} />
              </div>
            )}

            {imageInfo.tags?.length > 0 && (
              <div className="rounded-medium border bg-background p-5 shadow-small">
                <TagList tags={imageInfo.tags} />
              </div>
            )}

            <div className="rounded-medium border bg-background p-5 shadow-small">
              <p className="mb-5 font-bold">More by {imageInfo.users.username}</p>
              <RelatedImages images={relatedImages} baseUrl={basePageUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePageContent
