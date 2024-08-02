'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    async function handleRedirect() {
      const response = await fetch('/api/auth/google/callback')
      if (response.ok) {
        router.push('/private')
      } else {
        console.error('Ошибка при обработке авторизации')
      }
    }

    handleRedirect()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      Загрузка...
    </div>
  )
}
