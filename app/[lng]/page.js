import { Button } from '@nextui-org/react'

import { useTranslation } from '@/app/i18n'

export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng)
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1>{t('title')}</h1>
        <div className="p-10">
          <Button color="default">{t('default')}</Button>
          <Button color="primary">{t('primary')}</Button>
          <Button color="secondary">{t('secondary')}</Button>
          <Button color="success">{t('success')}</Button>
          <Button color="warning">{t('warning')}</Button>
        </div>
      </div>
    </>
  )
}
