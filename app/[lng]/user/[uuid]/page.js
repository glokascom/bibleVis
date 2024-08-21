import { getUserInfoById } from './actions/userService'
import UserUpload from './components/UserUpload'

export default async function Page({ params }) {
  const { uuid } = params

  let userInfo = null
  let error = null

  try {
    userInfo = await getUserInfoById(uuid)
  } catch (e) {
    error = 'Error fetching user details: ' + e.message
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!userInfo) {
    return <div>Loading...</div>
  }

  const { username, avatar_file_exists, cover_file_exists, email } = userInfo

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
        <strong>Avatar Exists:</strong> {avatar_file_exists ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Cover Exists:</strong> {cover_file_exists ? 'Yes' : 'No'}
      </p>
      <UserUpload uuid={uuid} />
    </div>
  )
}
