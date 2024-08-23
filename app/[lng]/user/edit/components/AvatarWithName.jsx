import { BVAvatar } from '@/app/components/BVAvatar'

function AvatarWithName({ userInfo }) {
  const url = userInfo.avatar_file_exists
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${userInfo.id}/avatars/normal.jpg`
    : null
  return (
    <div>
      <div className="hidden items-center gap-4 sm:flex">
        <BVAvatar size="xl" src={url} />
        <div className="flex flex-col">
          <span className="text-small">Settings</span>
          <span className="font-bold">{userInfo.userName}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 sm:hidden">
        <BVAvatar size="xxl" src={url} />
        <div className="flex flex-col items-center">
          <span>Settings</span>
          <span className="font-bold">{userInfo.userName}</span>
        </div>
      </div>
    </div>
  )
}

export default AvatarWithName
