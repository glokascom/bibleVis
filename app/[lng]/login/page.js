import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="flex flex-col items-center space-y-4">
      <label htmlFor="email" className="text-lg">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="password" className="text-lg">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        formAction={login}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Log in
      </button>
      <button
        formAction={signup}
        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Sign up
      </button>
    </form>
  )
}
