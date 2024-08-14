'use client'

import { useParams } from 'next/navigation'

export default function UsernamePage() {
  const params = useParams()
  const username = decodeURIComponent(params['@username']).replace('@', '')

  return (
    <div>
      <h1>Profile Page for {username}</h1>
    </div>
  )
}
