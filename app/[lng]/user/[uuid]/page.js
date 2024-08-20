import {
  getAvatarFilePathById,
  getCoverFilePathById,
  getEmailFilePathById,
  getUsernameById,
} from './actions/userService'

export default async function UserDetail({ params }) {
  const { uuid } = params

  let username = null
  let email = null
  let error = null
  let avatarPath = null
  let coverPath = null

  try {
    username = await getUsernameById(uuid)
    email = await getEmailFilePathById(uuid)
    avatarPath = getAvatarFilePathById(uuid)
    coverPath = getCoverFilePathById(uuid)
  } catch (e) {
    error = 'Error fetching user details: ' + e.message
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>AvatarPath:</strong> {avatarPath}
      </p>
      <p>
        <strong>CoverPath:</strong> {coverPath}
      </p>
    </div>
  )
}
