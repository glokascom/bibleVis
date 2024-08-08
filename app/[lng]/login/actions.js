'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/supabase/server'

export async function forgotPassword(formData) {
  const supabaseServer = createClient()
  const email = formData.get('email')

  const { error } = await supabaseServer.auth.resetPasswordForEmail(email)

  if (error) {
    console.error('Error sending password reset email:', error)
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
  } else {
    redirect('/password-reset-sent')
  }
}

export async function login(formData) {
  const supabaseServer = createClient()
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabaseServer.auth.signInWithPassword(data)

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/private')
}

export async function signup(formData) {
  const supabaseServer = createClient()
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabaseServer.auth.signUp(data)
  if (error) {
    console.error(error)
    redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  redirect('/check-email')
}
