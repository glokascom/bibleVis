import ImageUpload from './ImageUpload'
import UsernameEdit from './UsernameEdit'

function Profile() {
  return (
    <div>
      <div className="hidden w-full gap-5 sm:flex">
        <div className="w-1/2">
          <UsernameEdit />
        </div>
        <div className="flex w-1/2 flex-grow flex-col gap-5">
          <ImageUpload
            id="avatar-upload"
            label="Avatar"
            buttonLabel="Upload new avatar"
            isAvatar={true}
            defaultSrc={null}
          />
          <ImageUpload
            id="cover-upload"
            label="Cover image"
            buttonLabel="Upload new cover image"
            requiredWidth={1282}
            requiredHeight={400}
            previewSize={{ width: 328, height: 109 }}
            defaultSrc="/cover.svg"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 sm:hidden">
        <UsernameEdit />
        <div className="flex flex-grow flex-col gap-5">
          <ImageUpload
            id="avatar-upload"
            label="Avatar"
            buttonLabel="Upload new avatar"
            isAvatar={true}
            defaultSrc={null}
          />
          <ImageUpload
            id="cover-upload"
            label="Cover image"
            buttonLabel="Upload new cover image"
            requiredWidth={851}
            requiredHeight={735}
            previewSize={{ width: 328, height: 109 }}
            defaultSrc="/cover.svg"
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
