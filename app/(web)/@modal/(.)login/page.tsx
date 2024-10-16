import AuthForm from '@/app/components/AuthForm'
import { Modal } from '@/app/components/Modal'

import { openGraph } from '../../meta'

export const metadata = {
  title: 'Login',
  description:
    'Discover BibleVis, a unique platform for creating and sharing AI-generated Bible and Christian-themed visuals',
  openGraph: {
    ...openGraph,
    title: 'Login | BibleVis',
    description:
      'Discover BibleVis, a unique platform for creating and sharing AI-generated Bible and Christian-themed visuals',
  },
}

export default function LoginModal() {
  return (
    <Modal isCloseButton={true}>
      <AuthForm />
    </Modal>
  )
}
