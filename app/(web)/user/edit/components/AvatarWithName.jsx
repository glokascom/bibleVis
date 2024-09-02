import { BVAvatar } from '@/app/components/BVAvatar'

function AvatarWithName({ userInfo }) {
  return (
    <div>
      <div className="hidden items-center gap-4 sm:flex">
        <BVAvatar size="xl" src={userInfo.avatarUrl} />
        <div className="flex flex-col">
          <span className="text-small">Settings</span>
          <span className="font-bold">{userInfo.username}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 sm:hidden">
        <BVAvatar size="xxl" src={userInfo.avatarUrl} />
        <div className="flex flex-col items-center">
          <span>Settings</span>
          <span className="text-large font-bold">{userInfo.username}</span>
        </div>
      </div>
    </div>
  )
}

export default AvatarWithName
