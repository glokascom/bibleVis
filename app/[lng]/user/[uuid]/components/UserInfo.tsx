import { Link } from '@nextui-org/link'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

interface User {
  username: string
  total_followers: number
}

const UserInfo: React.FC = () => {
  const user: User = { username: 'AlenaAenami', total_followers: 0 }

  return (
    <div className="flex max-w-96 flex-col items-center rounded-medium border border-secondary-200 px-5 py-8">
      <BVAvatar size="mega" />
      <div className="text-semixlarge mt-5 font-bold">{user.username}</div>
      <div className="mt-5 text-small text-secondary-500">Followers</div>
      <div className="mt-1 text-medium">{user.total_followers}</div>
      <BVButton
        fullWidth
        href="/user/edit"
        as={Link}
        color="primary"
        size="md"
        className="mt-5"
      >
        Edit Profile
      </BVButton>
    </div>
  )
}

export default UserInfo
