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
}) {
  return (
    <>
      <div className="px-5">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="rounded-medium bg-secondary-50 md:w-3/4 md:p-2.5">
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

              <div className="hidden rounded-medium border bg-background p-5 shadow-small md:block">
                <SoftwareUsed software={imageInfo.software} />
              </div>

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
