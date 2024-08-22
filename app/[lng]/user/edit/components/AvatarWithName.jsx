import { BVAvatar } from '@/app/components/BVAvatar'

function AvatarWithName({
  userName = '',
  url = 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
}) {
  return (
    <div>
      <div className="hidden items-center gap-4 sm:flex">
        <BVAvatar size="xl" src={url} />
        <div className="flex flex-col">
          <span className="text-small">Settings</span>
          <span className="font-bold">{userName}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 sm:hidden">
        <BVAvatar size="xxl" src={url} />
        <div className="flex flex-col items-center">
          <span>Settings</span>
          <span className="font-bold">{userName}</span>
        </div>
      </div>
    </div>
  )
}

export default AvatarWithName
