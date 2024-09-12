'use client'

import { useState } from 'react'

import Image from 'next/image'

import { BVButton } from '@/app/components/BVButton'
import { BVInput } from '@/app/components/BVInput'

function Password({ userInfo }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo.email,
          oldPassword: currentPassword,
          newPassword: newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Something went wrong.')
      } else {
        setSuccessMessage(data.message || 'Password updated successfully.')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      console.error('Request error:', error)
      setErrorMessage('Failed to update password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex max-w-96 flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="currentPassword" className="mb-2 text-medium font-medium">
          Current Password
        </label>
        <BVInput
          variant="bordered"
          size="sm"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <Image
                  src={'/eye-open.svg'}
                  alt="eye open"
                  width={18}
                  height={18}
                  className="mr-4 h-[38px] w-[38px] p-2"
                />
              ) : (
                <Image
                  src={'/eye-close.svg'}
                  alt="eye close"
                  width={16}
                  height={16}
                  className="mr-4 h-9 w-9 p-2"
                />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          id="currentPassword"
          isRequired
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="mb-2 text-medium font-medium">
          New Password
        </label>
        <BVInput
          variant="bordered"
          size="sm"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          id="newPassword"
          isRequired
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="mb-2 text-medium font-medium">
          Confirm Password
        </label>
        <BVInput
          variant="bordered"
          size="sm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="confirmPassword"
          isRequired
        />
      </div>
      {errorMessage && <p className="text-danger-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <BVButton type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </BVButton>
    </form>
  )
}

export default Password
