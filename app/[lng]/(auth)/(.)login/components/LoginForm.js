'use client'

import { useRef, useState } from 'react'

import Link from 'next/link'

import { login, signup } from '../actions'
import AuthButton from './AuthButton'
import Checkbox from './Checkbox'
import ErrorMessage from './ErrorMessage'
import InputField from './InputField'
import PasswordGenerator from './PasswordGenerator'
import SocialAuthButton from './SocialAuthButton'

export default function LoginForm() {
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const passwordInputRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const action = event.nativeEvent.submitter.name

    try {
      if (action === 'login') {
        await login(formData)
      } else if (action === 'signup') {
        await signup(formData)
      }
    } catch (err) {
      setError(err.message || 'An error has occurred.')
    }
  }

  const handleGeneratePassword = (generatedPassword) => {
    setPassword(generatedPassword)
    if (passwordInputRef.current) {
      passwordInputRef.current.value = generatedPassword
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800">Log in or register</h2>
        <InputField id="email" name="email" type="email" required label="Email" />
        <InputField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          ref={passwordInputRef}
          required
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox
          id="showPassword"
          checked={showPassword}
          onChange={toggleShowPassword}
          label="Show password"
        />
        <div className="flex flex-col space-y-4">
          <AuthButton
            name="login"
            type="submit"
            label="Login"
            className="bg-blue-500 hover:bg-blue-600"
          />
          <AuthButton
            name="signup"
            type="submit"
            label="Registration"
            className="bg-green-500 hover:bg-green-600"
          />
          <SocialAuthButton
            href="/api/auth/google"
            className="bg-red-500 hover:bg-red-600"
          >
            Log in via Google
          </SocialAuthButton>
          <Link
            href="/forgot-password"
            className="hover: hover:tex cursor-pointer rounded-lg p-4 text-gray-600 hover:text-gray-800"
          >
            <span className="text-lg font-semibold">Забыли пароль?</span>
          </Link>
          <PasswordGenerator onGenerate={handleGeneratePassword} />
          <ErrorMessage message={error} />
        </div>
      </form>
    </div>
  )
}
