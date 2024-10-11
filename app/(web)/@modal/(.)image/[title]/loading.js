import { Spinner } from '@nextui-org/react'

import { Modal } from '@/app/components/Modal'

export default function Loading() {
  return (
    <Modal showCloseButton={false}>
      <Spinner />
    </Modal>
  )
}
