'use client'

import { useState } from 'react'

import { forgotPassword } from '../(.)login/actions'
import AuthButton from '../(.)login/components/AuthButton'
import ErrorMessage from '../(.)login/components/ErrorMessage'
import InputField from '../(.)login/components/InputField'

export default function ForgotForm() {
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const action = event.nativeEvent.submitter.name

    try {
      if (action === 'forgotPassword') {
        await forgotPassword(formData)
      }
    } catch (err) {
      setError(err.message || 'An error has occurred.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800">Reset password</h2>
        <InputField id="email" name="email" type="email" required label="Email" />

        <div className="flex flex-col space-y-4">
          <AuthButton
            name="forgotPassword"
            type="submit"
            label="Reset password"
            className="bg-gray-500 hover:bg-gray-600"
          />
          <ErrorMessage message={error} />
        </div>
      </form>
    </div>
  )
}
