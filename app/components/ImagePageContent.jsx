import { Image } from '@nextui-org/image'

import CreatorDetails from '@/app/components/CreatorDetails'
import Description from '@/app/components/Description'
import Download from '@/app/components/Download'
import RelatedImages from '@/app/components/RelatedImages'
import SoftwareUsed from '@/app/components/SoftwareUsed'
import TagList from '@/app/components/TagList'

function ImagePageContent({
  imageInfo,
  relatedImages,
  isFollowed,
  isLike,
  isCurrentUser,
  onPrevImage,
  onNextImage,
  isModal = false,
}) {
  return (
    <>
      <div className={`${isModal ? 'h-[90vh] w-[90vw]' : 'px-5'}`}>
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="relative rounded-medium bg-secondary-50 md:w-3/4 md:p-2.5">
            {imageInfo.imagePath ? (
              <Image
                src={imageInfo.imagePath}
                alt={imageInfo.title}
                className="w-full bg-secondary-50"
                classNames={{
                  img: 'w-full h-auto aspect-video object-contain',
                }}
              />
            ) : (
              <p className="text-center">Image not available</p>
            )}
            {isModal && (
              <>
                <button
                  onClick={onPrevImage}
                  className="absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background"
                >
                  <Image src="/polygon.svg" alt="prew image" />
                </button>
                <button
                  onClick={onNextImage}
                  className="absolute right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 rotate-180 items-center justify-center rounded-full bg-background"
                >
                  <Image src="/polygon.svg" alt="next image" />
                </button>
              </>
            )}
          </div>

          <div className="rounded-medium md:w-1/4 md:bg-secondary-50 md:p-2.5">
            <div className="flex flex-col gap-5 rounded-medium">
              <div className="rounded-medium border bg-background p-5 shadow-small">
                <Download />
                <Description imageInfo={imageInfo} isLike={isLike} />
                <CreatorDetails
                  creator={imageInfo.users}
                  followUserId={imageInfo.users.id}
                  isFollowed={isFollowed}
                  isCurrentUser={isCurrentUser}
                />
              </div>

              {!isModal && (
                <div className="hidden rounded-medium border bg-background p-5 shadow-small md:block">
                  <SoftwareUsed software={imageInfo.software} />
                </div>
              )}

              <div className="rounded-medium border bg-background p-5 shadow-small">
                <TagList tags={imageInfo.tags} />
              </div>

              <div className="hidden rounded-medium border bg-background p-5 shadow-small md:block">
                <RelatedImages
                  relatedImages={relatedImages}
                  username={imageInfo.users.username}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t px-5 py-10 md:hidden">
        <RelatedImages
          relatedImages={relatedImages}
          username={imageInfo.users.username}
        />
      </div>
    </>
  )
}

export default ImagePageContent
