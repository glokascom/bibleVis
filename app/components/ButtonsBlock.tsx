import { Button } from '@nextui-org/react'
import { TFunction } from 'i18next'

const ButtonsBlock = ({ t }: { t: TFunction }) => {
  return (
    <div className="p-10">
      <div className="p-10">
        <Button color="default">{t('default')}</Button>
        <Button color="primary">{t('primary')}</Button>
        <Button color="secondary">{t('secondary')}</Button>
        <Button color="success">{t('success')}</Button>
        <Button color="warning">{t('warning')}</Button>
      </div>
    </div>
  )
}

export default ButtonsBlock
