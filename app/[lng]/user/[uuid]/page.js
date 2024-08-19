'use client'

import { useParams } from 'next/navigation'

export default function UserDetail() {
  const { uuid } = useParams()

  return <div className="text-red-500">User Page for UUID: {uuid}</div>
}
