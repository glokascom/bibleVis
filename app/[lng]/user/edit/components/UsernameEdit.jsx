'use client'

import { useState } from 'react'

import { BVButton } from '@/app/components/BVButton'
import { BVInput } from '@/app/components/BVInput'

function UsernameEdit({ userInfo }) {
  const [username, setUsername] = useState(userInfo.username)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/update-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo.id,
          newUsername: username,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update username.')
      }

      setError('')
      alert('Username updated successfully!')
    } catch (err) {
      setError(err.message || 'An error occurred while updating the username.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col sm:gap-4" onSubmit={handleSave}>
      <div>
        <label htmlFor="username" className="mb-2 text-medium font-medium">
          *Username
        </label>
        <BVInput
          variant="bordered"
          size="sm"
          isRequired
          errorMessage={error}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <BVButton type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </BVButton>
    </form>
  )
}

export default UsernameEdit
