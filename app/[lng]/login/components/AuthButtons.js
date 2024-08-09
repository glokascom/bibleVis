import Link from 'next/link'

export default function AuthButtons({ email, password }) {
  return (
    <div className="flex flex-col space-y-4">
      <Link
        href={`/api/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`}
        className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Login
      </Link>
      <Link
        href={`/api/auth/signup?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`}
        className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Registration
      </Link>
      <Link
        href="/api/auth/google"
        className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Log in via Google
      </Link>
      <Link
        href={`/api/auth/forgot-password?email=${encodeURIComponent(email)}`}
        className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        Forgot your password?
      </Link>
    </div>
  )
}
