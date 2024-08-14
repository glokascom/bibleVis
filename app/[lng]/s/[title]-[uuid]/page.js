'use client'

import { useRouter } from 'next/navigation'

export default function SearchPage() {
  const router = useRouter()
  const { title, uuid } = router.query

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500 underline">{title}</h1>
      <p className="text-2xl text-gray-500">UUID: {uuid}</p>
    </div>
  )
}
