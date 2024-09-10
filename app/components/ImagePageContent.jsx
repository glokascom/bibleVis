import { Image } from '@nextui-org/image'

import CreatorDetails from '@/app/components/CreatorDetails'
import Description from '@/app/components/Description'
import Download from '@/app/components/Download'
import SoftwareUsed from '@/app/components/SoftwareUsed'
import TagList from '@/app/components/TagList'

function ImagePageContent({ relatedImages }) {
  return (
    <>
      <div className="px-5">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="flex h-56 items-center justify-center rounded-medium bg-secondary-50 p-0 md:h-[45rem] md:w-3/4 md:p-2.5">
            <p className="h-full w-full content-center rounded-medium bg-secondary-100 text-center">
              Image Here
            </p>
          </div>

          <div className="rounded-medium md:w-1/4 md:bg-secondary-50 md:p-2.5">
            <div className="flex flex-col gap-5 rounded-medium">
              <div className="rounded-medium border bg-background p-5 shadow-small">
                <Download />
                <Description />
                <CreatorDetails />
              </div>

              <div className="hidden rounded-medium border bg-background p-5 shadow-small md:block">
                <SoftwareUsed />
              </div>

              <div className="rounded-medium border bg-background p-5 shadow-small">
                <TagList />
              </div>

              <div className="hidden rounded-medium border bg-background p-5 shadow-small md:block">
                <p className="font-bold">More by Author Name</p>
                <div className="mt-5 md:grid md:grid-cols-3 md:gap-2">
                  {relatedImages.map((image) => (
                    <Image
                      key={image.id}
                      src={image.url}
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
              src={image.url}
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
