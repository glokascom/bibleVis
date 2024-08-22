import Link from 'next/link'

export default function UserGreeting({ email }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-medium bg-white p-8 text-center shadow-lg">
        <h1 className="text-xlarge font-bold text-gray-800">Hi, {email}!</h1>
        <p className="my-4 text-gray-600">Welcome to the BibleVis website.</p>
        <Link
          href="/api/auth/logout?redirectTo=/login"
          className="mt-6 rounded-medium bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
        >
          Log out
        </Link>
      </div>
    </div>
  )
}
