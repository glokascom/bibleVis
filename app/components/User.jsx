import { useEffect, useState } from 'react'

function User() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => setError(error))
  }, [])

  if (error) return <div>Error loading user</div>
  if (!user) return <div>Loading...</div>
  return <div>{user.name}</div>
}

export default User
