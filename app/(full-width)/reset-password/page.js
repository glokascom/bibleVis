import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import ResetForm from '@/app/components/ResetForm'

export default async function ResetPassword({ searchParams }) {
  const headersList = headers()
  const host = headersList.get('host') // Получаем хост
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const origin = `${protocol}://${host}`
  const code = searchParams['code']

  if (!code) {
    // return the user to an error page with instructions
    return redirect(`${origin}/auth/auth-code-error`)
  }

  return <ResetForm />
}
