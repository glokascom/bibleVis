import ImageUpload from './ImageUpload'
import UsernameEdit from './UsernameEdit'

function Profile({ userInfo }) {
  const avatarUrl = userInfo.avatar_file_exists
    ? {
        original: `http://127.0.0.1:55521/storage/v1/object/public/profile/${userInfo.id}/avatars/normal.jpg`,
        mobile: `http://127.0.0.1:55521/storage/v1/object/public/profile/${userInfo.id}/avatars/small.jpg`,
      }
    : null

  const coverUrl = userInfo.cover_file_exists
    ? {
        original: `http://127.0.0.1:55521/storage/v1/object/public/profile/${userInfo.id}/covers/original.jpg`,
        mobile: `http://127.0.0.1:55521/storage/v1/object/public/profile/${userInfo.id}/covers/mobile.jpg`,
      }
    : null

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
            userId={userInfo.id}
            defaultSrc={avatarUrl}
          />
          <ImageUpload
            label="Cover image"
            buttonLabel="Upload new cover image"
            userId={userInfo.id}
            defaultSrc={coverUrl}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
