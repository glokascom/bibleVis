'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Download from '@/app/components/Download'

export default function ImagePage({ params }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid, searchText])

  console.log('Search Text:', searchText)
  console.log('UUID:', uuid)

  if (!uuid) {
    return <p className="text-red-500">Invalid URL format</p>
  }

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <div>
        <h1 className="text-3xl font-bold text-blue-500 underline">UUID: {uuid}</h1>
        <p className="text-red-500">Search Text: {searchText}</p>

        <div className="flex flex-col gap-2.5 md:flex-row md:items-start">
          <div className="flex h-56 items-center justify-center rounded-medium border md:h-[45rem] md:w-3/4">
            Image Here
          </div>
          <div className="rounded-medium border p-5 md:w-1/4">
            <Download />
          </div>
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
