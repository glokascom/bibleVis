import AvatarUpload from './AvatarUpload'
import CoverUpload from './CoverUpload'
import UserNameEdit from './UserNameEdit'

function Profile() {
  return (
    <div>
      <div className="hidden w-full gap-5 sm:flex">
        <div className="w-1/2">
          <UserNameEdit />
        </div>
        <div className="flex w-1/2 flex-grow flex-col gap-5">
          <AvatarUpload />
          <CoverUpload />
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 sm:hidden">
        <UserNameEdit />
        <div className="flex flex-grow flex-col gap-5">
          <AvatarUpload />
          <CoverUpload />
        </div>
      </div>
    </div>
  )
}

export default Profile
