import { NextRequest, NextResponse } from 'next/server'

import { getUser } from '@/app/actions/getUser'
import { createClient } from '@/app/supabase/server'
import { ApiError, ApiResponse } from '@/app/types/api'

import { jsonResponse } from '../../response'

type SuccessResponse = {
  message: string
  user: object
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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

  const { user } = await getUser()

  const successResponse: ApiResponse<SuccessResponse> = {
    status: 'success',
    data: { message: 'Login successful', user },
  }
  return jsonResponse(successResponse, 200)
}
