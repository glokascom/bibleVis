import { FC } from 'react'

import Link from 'next/link'

import { useTranslation } from '@/app/i18n'

type Props = {
  params: {
    lng: string
  }
}

const Page: FC<Props> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Link
        href="/doc"
        className="cursor-pointer rounded-lg bg-purple-500 p-4 text-white hover:bg-purple-600"
      >
        <span className="text-lg font-semibold">API Documentation</span>
      </Link>
      <Link
        href="/login"
        className="cursor-pointer rounded-lg bg-yellow-500 p-4 text-white hover:bg-yellow-600"
      >
        <span className="text-lg font-semibold">{t('login')} </span>
      </Link>
    </div>
  )
}

export default Page
