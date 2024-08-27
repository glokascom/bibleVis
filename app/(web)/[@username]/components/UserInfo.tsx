'use client'

import { Link } from '@nextui-org/link'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

interface User {
  username: string
  total_followers: number
  avatar: string
}
interface UserInfoProps {
  isCurrentUser: boolean
}
const is_followed = false

const UserInfo: React.FC<UserInfoProps> = ({ isCurrentUser }) => {
  const user: User = { username: 'AlenaAenami', total_followers: 0, avatar: '' }
  const handleToggleFollow = () => {}

  return (
    <div className="border-0 md:h-full md:rounded-medium md:px-5 md:py-4 2xl:border 2xl:border-secondary-200">
      <div className="relative flex w-full flex-col items-center md:gap-3 2xl:gap-5">
        <BVAvatar
          className="absolute bottom-0 left-0 h-14 w-14 md:relative md:bottom-auto md:left-auto md:h-20 md:w-20 2xl:h-36 2xl:w-36"
          src={user.avatar}
        />
        <div className="text-semixlarge font-bold">{user.username}</div>
        <div className="flex flex-row-reverse items-center gap-1 xl:flex-col">
          <div className="text-small text-secondary-500">Followers</div>
          <div className="md:medium text-small">{user.total_followers}</div>
        </div>
      </div>
      <div>
        {isCurrentUser ? (
          <BVButton fullWidth href="/user/edit" as={Link} className="mt-5">
            Edit Profile
          </BVButton>
        ) : (
          <BVButton
            fullWidth
            color={is_followed ? 'secondary' : 'primary'}
            className="mt-5"
            onClick={handleToggleFollow}
          >
            {is_followed ? 'Unfollow' : 'Follow'}
          </BVButton>
        )}
      </div>
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
