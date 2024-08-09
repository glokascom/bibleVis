'use client'

//TODO: rewrite use server
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

export default function ErrorPage() {
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const message = query.get('message')
    if (message) {
      setErrorMessage(decodeURIComponent(message))
    }
  }, [router.query])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">An error has occurred</h2>
        <p className="text-red-500">{errorMessage || 'An unknown error has occurred.'}</p>
        <button
          onClick={() => router.push('/login')}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to authorization
        </button>
      </div>
    </div>
  )
}
