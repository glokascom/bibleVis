'use client'

import { useRouter } from 'next/navigation'

export default function UserDetail() {
  const router = useRouter()
  const { uuid } = router.query

  return <div className="text-red-500">User Page for UUID: {uuid}</div>
}
