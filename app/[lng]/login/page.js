'use client'

import { useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { forgotPassword, login, signup } from './actions'
import { generatePassword } from './utils'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
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
      } else if (action === 'forgotPassword') {
        await forgotPassword(formData)
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка.')
    }
  }

  const handleGoogleLogin = () => {
    router.push('/api/auth/google')
  }

  const handleGeneratePassword = () => {
    const password = generatePassword()
    if (passwordInputRef.current) {
      passwordInputRef.current.value = password
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800">Войти или зарегистрироваться</h2>
        <label htmlFor="email" className="text-lg text-gray-800">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-64 rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="password" className="text-lg text-gray-800">
          Пароль:
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          ref={passwordInputRef}
          required
          className="w-64 rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={toggleShowPassword}
            className="h-4 w-4 text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="showPassword" className="text-gray-800">
            Показать пароль
          </label>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            name="login"
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Войти
          </button>
          <button
            name="signup"
            type="submit"
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Регистрация
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Войти через Google
          </button>
          <button
            name="forgotPassword"
            type="submit"
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Забыли пароль?
          </button>
          <button
            type="button"
            onClick={handleGeneratePassword}
            className="mt-2 rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
          >
            Сгенерировать пароль
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  )
}
