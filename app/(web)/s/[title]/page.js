'use client'

import { useParams, useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const { title } = useParams()
  const searchParams = useSearchParams()

  const decodedTitle = title ? decodeURIComponent(title) : null

  const order = searchParams.get('order')
  const orientation = searchParams.get('orientation')

  console.log('Decoded Title:', decodedTitle)
  console.log('Order:', order)
  console.log('Orientation:', orientation)

  if (!decodedTitle) {
    return <p className="text-red-500">Invalid URL format</p>
  }

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <div>
        <h1 className="text-3xl font-bold text-blue-500 underline">{decodedTitle}</h1>
        <p className="text-red-500">Order: {order}</p>
        <p className="text-red-500">Orientation: {orientation}</p>
      </div>
    </main>
  )
}
