import { BVAvatar } from '@/app/components/BVAvatar'

function AvatarWithName({
  userName,
  url = 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
}) {
  return (
    <div className="flex items-center gap-4">
      <BVAvatar size="xl" src={url} />
      <div className="flex flex-col">
        <span>Settings</span>
        <span className="font-bold">{userName}</span>
      </div>
    </div>
  )
}

export default AvatarWithName
