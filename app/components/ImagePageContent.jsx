import { Image } from '@nextui-org/image'

import CreatorDetails from '@/app/components/CreatorDetails'
import Description from '@/app/components/Description'
import Download from '@/app/components/Download'
import SoftwareUsed from '@/app/components/SoftwareUsed'
import TagList from '@/app/components/TagList'

async function ImagePageContent({ imageInfo, relatedImages }) {
  return (
    <>
      <div className="px-5">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="flex h-56 items-center justify-center rounded-medium bg-secondary-50 p-0 md:h-[45rem] md:w-3/4 md:p-2.5">
            {imageInfo.imagePath ? (
              <Image
                src={imageInfo.imagePath}
                alt={imageInfo.title}
                className="h-full w-full rounded-medium object-cover"
                classNames={{ img: 'w-full h-full object-cover' }}
              />
            ) : (
              <p className="text-center">Image not available</p>
            )}
          </div>

          <div className="rounded-medium md:w-1/4 md:bg-secondary-50 md:p-2.5">
            <div className="flex flex-col gap-5 rounded-medium">
              <div className="rounded-medium border bg-background p-5 shadow-small">
                <Download />
                <Description imageInfo={imageInfo} />
                <CreatorDetails creator={imageInfo.users} />
              </div>

              <div className="hidden rounded-medium border bg-background p-5 shadow-small md:block">
                <SoftwareUsed software={imageInfo.software} />
              </div>

              <div className="rounded-medium border bg-background p-5 shadow-small">
                <TagList tags={imageInfo.tags} />
              </div>

              <div className="hidden rounded-medium border bg-background p-5 shadow-small md:block">
                <p className="font-bold">More by Author Name</p>
                <div className="mt-5 md:grid md:grid-cols-3 md:gap-2">
                  {relatedImages.map((image) => (
                    <Image
                      key={image.id}
                      src={image.imagePath}
                      alt={image.title}
                      isZoomed
                      className="mt-5 md:mt-0"
                      classNames={{ img: 'md:aspect-square' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t px-5 py-10 md:hidden">
        <p className="font-bold">More by Author Name</p>
        <div className="md:grid md:grid-cols-3 md:gap-2">
          {relatedImages.map((image) => (
            <Image
              key={image.id}
              src={image.imagePath}
              alt={image.title}
              isZoomed
              className="mt-5 md:mt-0"
              classNames={{ img: 'md:aspect-square' }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ImagePageContent
