import ImageUpload from './ImageUpload'
import UsernameEdit from './UsernameEdit'

function Profile({ userInfo }) {
  return (
    <div>
      <div className="flex w-full flex-col gap-5 sm:flex-row">
        <div className="w-auto sm:w-1/2">
          <UsernameEdit userInfo={userInfo} />
        </div>
        <div className="flex w-auto flex-col gap-5 sm:w-1/2">
          <ImageUpload
            label="Avatar"
            buttonLabel="Upload new avatar"
            isAvatar={true}
            userInfo={userInfo}
          />
          <ImageUpload
            label="Cover image"
            buttonLabel="Upload new cover image"
            requiredWidth={1280}
            requiredHeight={400}
            previewSize={{ width: 384, height: 120 }}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
