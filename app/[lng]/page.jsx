import Link from 'next/link'

import { useTranslation } from '@/app/i18n'

import ButtonsBlock from '../components/ButtonsBlock'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <div className="cursor-pointer bg-blue-500 p-4 text-white">
        <h1 className="text-xl font-bold">{t('title')}</h1>
      </div>
      <Link href="/about">
        <div className="cursor-pointer rounded-lg bg-green-500 p-4 text-white hover:bg-green-600">
          <span className="text-lg font-semibold">About</span>
        </div>
      </Link>
      <ButtonsBlock t={t} />
    </div>
  )
}
