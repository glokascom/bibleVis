'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { forgotPassword, login, signup } from './actions'
import { generatePassword } from './utils'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [generatedPassword, setGeneratedPassword] = useState('')

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
    setGeneratedPassword(password)
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
          type="password"
          required
          className="w-64 rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleGeneratePassword}
          className="mt-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Сгенерировать пароль
        </button>
        {generatedPassword && (
          <div className="mt-2 rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-700">
            <p>Сгенерированный пароль:</p>
            <input
              type="text"
              readOnly
              value={generatedPassword}
              className="w-64 rounded-md border border-gray-300 bg-white px-4 py-2 text-black"
            />
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(generatedPassword)}
              className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Скопировать пароль
            </button>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
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
        </div>
      </form>
    </div>
  )
}
