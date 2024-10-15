import { Suspense } from 'react'

import AuthForm from '@/app/components/AuthForm'

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

export default function LoginPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  )
}
