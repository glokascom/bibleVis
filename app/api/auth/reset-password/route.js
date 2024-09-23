import { redirect } from 'next/navigation'

import { createClient } from '@/app/supabase/server'
import { validatePassword } from '@/app/utils/validation'

import { jsonResponse } from '../../response'

export async function POST(request) {
  try {
    const { password, confirmPassword, code } = await request.json()
    if (!code) {
      const errorResponse = {
        status: 'error',
        message: 'Code is required, please try again.',
        errors: [],
      }
      return jsonResponse(errorResponse, 400)
    }

    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return redirect(`/auth/auth-code-error`)
    }

    if (!password || !confirmPassword) {
      const errorResponse = {
        status: 'error',
        message: 'Validation errors occurred',
        errors: [{ field: 'password', message: 'Password is required' }],
      }
      return jsonResponse(errorResponse, 400)
    }
    const errors = []
    const passwordErrors = validatePassword(password)
    if (passwordErrors) {
      passwordErrors.forEach((err) => errors.push({ field: 'password', message: err }))
    }

    if (password !== confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Passwords do not match' })
    }
    if (errors.length > 0) {
      const validationErrorResponse = {
        status: 'error',
        message: 'Validation errors occurred',
        errors,
      }
      return jsonResponse(validationErrorResponse, 400)
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      const errorResponse = {
        status: 'error',
        message: updateError?.message || 'Failed to update password.',
        errors: [],
      }
      return jsonResponse(errorResponse, 500)
    }

    const successResponse = {
      status: 'success',
      data: { message: 'Password updated successfully.' },
    }
    return jsonResponse(successResponse, 200)
  } catch (error) {
    const errorResponse = {
      status: 'error',
      message: error?.message || 'An unknown error occurred.',
      errors: [],
    }
    return jsonResponse(errorResponse, 500)
  }
}
