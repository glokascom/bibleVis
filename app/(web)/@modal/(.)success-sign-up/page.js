import { Modal } from '@/app/components/Modal'
import SuccessSignUpForm from '@/app/components/SuccessSignUp'

export default function SuccessSignUpPageModa() {
  return (
    <Modal showCloseButton={true}>
      <SuccessSignUpForm />
    </Modal>
  )
}
