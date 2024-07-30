import Link from 'next/link'

import { useTranslation } from '@/app/i18n'

import ButtonsBlock from '../components/ButtonsBlock'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1>{t('title')}</h1>
        <ButtonsBlock t={t} />
        <Link href="/about">About</Link>
      </div>
    </>
  )
}
