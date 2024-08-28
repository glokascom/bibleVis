'use client'

import { useState } from 'react'

import { BVButton } from '@/app/components/BVButton'
import { BVInput } from '@/app/components/BVInput'

import { updateUsername } from '../actions/updateUsername'

function UsernameEdit({ userInfo }) {
  const [username, setUsername] = useState(userInfo.username)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error } = await updateUsername(username)
      if (error) {
        throw new Error(error)
      }
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
