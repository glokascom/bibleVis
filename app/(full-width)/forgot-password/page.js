import { openGraph } from '@/app/(web)/meta'
import ForgotForm from '@/app/components/ForgotForm'

export const metadata = {
  title: 'Forgot Password',
  description:
    'Discover BibleVis, a unique platform for creating and sharing AI-generated Bible and Christian-themed visuals',
  openGraph: {
    ...openGraph,
    title: 'Forgot Password | BibleVis',
    description:
      'Discover BibleVis, a unique platform for creating and sharing AI-generated Bible and Christian-themed visuals',
  },
}

export default async function ForgotPage() {
  return <ForgotForm />
}
