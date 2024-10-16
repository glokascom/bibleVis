import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { openGraph } from '@/app/(web)/meta'
import ResetForm from '@/app/components/ResetForm'

export const metadata = {
  title: 'Reset Password',
  description:
    'Discover BibleVis, a unique platform for creating and sharing AI-generated Bible and Christian-themed visuals',
  openGraph: {
    ...openGraph,
    title: 'Reset Password | BibleVis',
    description:
      'Discover BibleVis, a unique platform for creating and sharing AI-generated Bible and Christian-themed visuals',
  },
}

export default async function ResetPassword({ searchParams }) {
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const origin = `${protocol}://${host}`
  const code = searchParams['code'] ?? false

  if (!code) {
    return redirect(`${origin}/auth/auth-code-error`)
  }

  return <ResetForm />
}
