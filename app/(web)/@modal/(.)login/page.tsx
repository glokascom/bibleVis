import AuthForm from '@/app/components/AuthForm'
import { Modal } from '@/app/components/Modal'

export default function LoginModal() {
  return (
    <Modal showCloseButton={true}>
      <AuthForm />
    </Modal>
  )
}
