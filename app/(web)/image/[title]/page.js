'use client'

import ImagePageContent from '@/app/components/ImagePageContent'

export default function ImagePage({ params }) {
  const { title } = params
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

  console.log('Search Text:', searchText)
  console.log('UUID:', uuid)

  if (!uuid) {
    return <p className="text-danger-500">Invalid URL format</p>
  }

  return (
    <main className="mx-auto w-full max-w-[1806px] md:px-12">
      <div className="px-5">
        <h1 className="text-3xl font-bold text-blue-500 underline">UUID: {uuid}</h1>
        <p className="text-red-500">Search Text: {searchText}</p>
      </div>

      <ImagePageContent relatedImages={relatedImages} />
    </main>
  )
}
