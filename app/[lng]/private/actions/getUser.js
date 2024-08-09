import { redirect } from 'next/navigation'

import { createClient } from '@/app/supabase/server'

export async function getUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return data.user
}
