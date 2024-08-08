import { useEffect, useState } from 'react'

import { fetchUser } from './UserAction'

function CustomUser() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUser()
      .then((data) => setUser(data))
      .catch((error) => setError(error))
  }, [])

  if (error) return <div>Error loading user</div>
  if (!user) return <div>Loading...</div>
  return <div>{user.name}</div>
}

export default CustomUser
