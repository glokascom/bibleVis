import { useEffect, useState } from 'react'

import { BVAvatar } from '@/app/components/BVAvatar'

function AvatarWithName({ userInfo }) {
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function fetchAvatar() {
      const res = await fetch(`/api/avatar?userId=${userInfo.id}`, {
        next: { tags: [`avatar-${userInfo.id}`] }, // Добавляем тег для инвалидации кеша
      })
      const data = await res.json()
      setAvatarUrl(data.url)
    }

    fetchAvatar()
  }, [userInfo.id])

  return (
    <div>
      <div className="hidden items-center gap-4 sm:flex">
        <BVAvatar size="xl" src={avatarUrl} />
        <div className="flex flex-col">
          <span className="text-small">Settings</span>
          <span className="font-bold">{userInfo.userName}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 sm:hidden">
        <BVAvatar size="xxl" src={avatarUrl} />
        <div className="flex flex-col items-center">
          <span>Settings</span>
          <span className="font-bold">{userInfo.userName}</span>
        </div>
      </div>
    </div>
  )
}

export default AvatarWithName
