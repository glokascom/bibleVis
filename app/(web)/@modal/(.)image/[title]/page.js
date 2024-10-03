import ImagePageComponent from '@/app/components/ImagePage'
import { Modal } from '@/app/components/Modal'

export default async function ImagePage({ params }) {
  const { title } = params

  return (
    <Modal>
      <ImagePageComponent title={title} isModal />
    </Modal>
  )
}
