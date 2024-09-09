'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Image } from '@nextui-org/image'

import CreatorDetails from '@/app/components/CreatorDetails'
import Description from '@/app/components/Description'
import Download from '@/app/components/Download'
import SoftwareUsed from '@/app/components/SoftwareUsed'
import TagList from '@/app/components/TagList'

import { getImages } from '../../[@username]/actions/images'

export default function ImagePage({ params }) {
  const [relatedImages, setRelatedImages] = useState([])

  const { title } = params
  const router = useRouter()
  const parts = title ? title.split('-') : []
  let uuid = ''
  let searchText = ''

  if (parts.length > 1) {
    uuid = parts.pop() // забираем последний элемент как uuid
    searchText = parts.join(' ') // оставшиеся части объединяем в строку
  } else {
    uuid = title
    searchText = ''
  }

  useEffect(() => {
    if (uuid) {
      const formattedTitle = slugify(searchText)

      if (formattedTitle) {
        router.replace(`/image/${formattedTitle}-${uuid}`)
      } else {
        router.replace(`/image/${uuid}`)
      }
    }

    const fetchImages = async () => {
      const images = await getImages(1, 3)
      setRelatedImages(images)
    }

    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid, searchText])

  console.log('Search Text:', searchText)
  console.log('UUID:', uuid)

  if (!uuid) {
    return <p className="text-red-500">Invalid URL format</p>
  }

  return (
    <main className="mx-auto w-full max-w-[1806px] md:px-12">
      <div className="px-5">
        <h1 className="text-3xl font-bold text-blue-500 underline">UUID: {uuid}</h1>
        <p className="text-red-500">Search Text: {searchText}</p>

        <div className="flex flex-col md:flex-row md:items-start">
          <div className="flex h-56 items-center justify-center rounded-medium bg-secondary-50 p-2.5 md:h-[45rem] md:w-3/4">
            <p className="h-full w-full content-center rounded-medium bg-secondary-100 text-center">
              Image Here
            </p>
          </div>

          <div className="rounded-medium md:w-1/4 md:bg-secondary-50 md:p-2.5">
            <div className="flex flex-col gap-12 rounded-medium md:gap-5">
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
    </main>
  )
}

function slugify(text) {
  return text
    .toString()
    .normalize('NFD') // разбиваем символы, если есть акценты
    .replace(/[\u0300-\u036f]/g, '') // удаляем акценты
    .replace(/[^a-zA-Z0-9\s-]/g, '') // удаляем спецсимволы
    .trim() // удаляем пробелы с концов строки
    .replace(/\s+/g, '-') // заменяем пробелы на тире
    .toLowerCase() // приводим к нижнему регистру
}
