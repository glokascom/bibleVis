'use client'

import { useRouter } from 'next/navigation'

export default function UserGreeting({ email }) {
  const router = useRouter()

  const handleSignOut = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    })

    if (response.ok) {
      router.push('/login')
    } else {
      console.error('Error logging out')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">Hi, {email}!</h1>
        <p className="mt-4 text-gray-600">Welcome to the BibleVis website.</p>
        <button
          onClick={handleSignOut}
          className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
        >
          Log out
        </button>
      </div>
    </div>
  )
}
