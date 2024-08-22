'use client'

import { useParams } from 'next/navigation'

import UserInfo from './components/UserInfo'

export default function UserDetail() {
  const { uuid } = useParams()

  return (
    <div>
      User Page for UUID: {uuid}
      <UserInfo />
    </div>
  )
}
