'use client'

import { useParams } from 'next/navigation'

import ProfileCard from './components/ProfileCard'

export default function UsernamePage() {
  const params = useParams()
  const username = decodeURIComponent(params['@username']).replace('@', '')

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800">Profile Page for {username}</h1>
      <ProfileCard />
    </div>
  )
}
