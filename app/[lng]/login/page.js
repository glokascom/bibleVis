'use client'

import { useRouter } from 'next/navigation'

import { forgotPassword, login, signup } from './actions'

export default function LoginPage() {
  const router = useRouter()

  const handleGoogleLogin = () => {
    router.push('/api/auth/google')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <form className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
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
        <div className="flex flex-col space-y-4">
          <button
            formAction={login}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Войти
          </button>
          <button
            formAction={signup}
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
            formAction={forgotPassword}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Забыли пароль?
          </button>
        </div>
      </form>
    </div>
  )
}
