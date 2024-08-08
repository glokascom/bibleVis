import Link from 'next/link'

import ButtonsBlock from '@/app/components/ButtonsBlock'
import { useTranslation } from '@/app/i18n'

export const metadata = {
  title: 'Home Page',
}

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <div className="cursor-pointer bg-blue-500 p-4 text-white">
        <h1 className="text-xl font-bold">Welcome to Home Page</h1>
        <h2 className="text-lg">Home Page</h2>
      </div>
      <Link href="/about">
        <div className="cursor-pointer rounded-lg bg-green-500 p-4 text-white hover:bg-green-600">
          <span className="text-lg font-semibold">About</span>
        </div>
      </Link>
      <ButtonsBlock t={t} />
      <Link href="/doc">
        <div className="cursor-pointer rounded-lg bg-purple-500 p-4 text-white hover:bg-purple-600">
          <span className="text-lg font-semibold">API Documentation</span>
        </div>
      </Link>
      <Link href="/login">
        <div className="cursor-pointer rounded-lg bg-yellow-500 p-4 text-white hover:bg-yellow-600">
          <span className="text-lg font-semibold">Authentication</span>
        </div>
      </Link>
    </div>
  )
}
