'use client'

import { useRouter } from 'next/navigation'

export default function SearchPage() {
  const router = useRouter()
  const { title, uuid } = router.query

  return (
    <div>
      <h1>{title}</h1>
      <p>UUID: {uuid}</p>
    </div>
  )
}
