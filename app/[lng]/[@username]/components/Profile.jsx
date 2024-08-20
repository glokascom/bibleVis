import AvatarEdit from './AvatarEdit'
import CoverEdit from './CoverEdit'
import UserNameEdit from './UserNameEdit'

function Profile() {
  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex w-full gap-5">
        <div className="grow">
          <UserNameEdit />
        </div>
        <div className="flex flex-grow flex-col gap-5">
          <AvatarEdit />
          <CoverEdit />
        </div>
      </div>
    </div>
  )
}

export default Profile
