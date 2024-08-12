import { FC } from 'react'

import Link from 'next/link'

import ButtonsBlock from '@/app/components/ButtonsBlock'
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
      <div className="cursor-pointer bg-blue-500 p-4 text-white">
        <h1 className="text-xl font-bold">{t('title')}</h1>
      </div>
      <Link
        href="/about"
        className="cursor-pointer rounded-lg bg-green-500 p-4 text-white hover:bg-green-600"
      >
        <span className="text-lg font-semibold">About</span>
      </Link>
      <ButtonsBlock t={t} />
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
        <span className="text-lg font-semibold">Authentication</span>
      </Link>
    </div>
  )
}

export default Page
