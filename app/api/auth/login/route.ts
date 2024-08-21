import { NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'
import { ApiError, ApiResponse } from '@/app/types/api'

import { jsonResponse } from '../../response'

export async function POST(request: NextResponse): Promise<NextResponse> {
  const { email, password } = await request.json()
  const errors: { field?: string; message: string }[] = []

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' })
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  }
  if (errors.length > 0) {
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: 'Validation errors occurred',
      errors,
    }
    return jsonResponse(errorResponse, 400)
  }

  const supabaseServer = createClient()
  const { error: signInError } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: signInError.message || 'An unknown error occurred.',
    }
    return jsonResponse(errorResponse, 401)
  }

  const successResponse: ApiResponse<{ message: string }> = {
    status: 'success',
    data: { message: 'Login successful' },
  }
  return jsonResponse(successResponse, 200)
}
