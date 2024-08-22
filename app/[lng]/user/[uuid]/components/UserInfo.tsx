'use client'

import { Link } from '@nextui-org/link'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

interface User {
  username: string
  total_followers: number
}
interface UserInfoProps {
  isCurrentUser: boolean
}
const is_followed = false

const UserInfo: React.FC<UserInfoProps> = ({ isCurrentUser }) => {
  const user: User = { username: 'AlenaAenami', total_followers: 0 }
  const handleToggleFollow = () => {
    console.log('подписался/отписался')
  }

  return (
    <div className="flex max-w-96 flex-col items-center rounded-medium border border-secondary-200 px-5 py-8">
      <BVAvatar size="mega" />
      <div className="mt-5 text-semixlarge font-bold">{user.username}</div>
      <div className="mt-5 text-small text-secondary-500">Followers</div>
      <div className="mt-1 text-medium">{user.total_followers}</div>
      {isCurrentUser ? (
        <BVButton
          fullWidth
          href="/user/edit"
          as={Link}
          color={'primary'}
          size="md"
          className="mt-5"
        >
          Edit Profile
        </BVButton>
      ) : (
        <BVButton
          fullWidth
          color={is_followed ? 'secondary' : 'primary'}
          size="md"
          className="mt-5"
          onClick={handleToggleFollow}
        >
          {is_followed ? 'Unfollow' : 'Follow'}
        </BVButton>
      )}
    </div>
  )
}
/*TODO
1. Нужен логин юзера, кол-во подписчиков.
2. Нужна проверка - текущий пользователь или нет.
3. Нужно проверка - подписан ли зарегистрированный юзер на юзера с этим UUID.
4. Если не подписан - при отправке запроса нужно сделать подписку, поменять у юзера кол-во подписчиков на +1.
5. Если подписан- при отправке запроса нужно удалить подписку, поменять у юзера кол-во подписчиков на -1.

*/
export default UserInfo
