import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'
import { supabaseService } from '@/app/supabase/service'
import { ApiError, ApiResponse } from '@/app/types/api'

import { jsonResponse } from '../../response'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await request.json()
    const errors: { field?: string; message: string }[] = []

    if (!email) {
      errors.push({ field: 'email', message: 'Email is required' })
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message: '',
        errors,
      }
      return jsonResponse(errorResponse, 400)
    }

    const supabaseServer = createClient()
    const { data: user, error: userError } = await supabaseService
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (userError) {
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message: userError.message || 'An unknown error occurred.',
      }
      return jsonResponse(errorResponse, 500)
    }

    if (!user) {
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message:
          'Your email address was not found in our system. Please double-check your email and try again',
      }
      return jsonResponse(errorResponse, 401)
    }

    const { data: authUserData, error: authUserError } =
      await supabaseService.auth.admin.getUserById(user.id)

    if (authUserError) {
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message: authUserError.message || 'An unknown error occurred.',
      }
      return jsonResponse(errorResponse, 500)
    }

    if (authUserData.user.app_metadata.provider !== 'email') {
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message:
          'Your email address was not found in our system. Please double-check your email and try again',
      }
      return jsonResponse(errorResponse, 401)
    }
    const { error } = await supabaseServer.auth.resetPasswordForEmail(email, {
      redirectTo: `${request.nextUrl.origin}/reset-password`,
    })

    if (error) {
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message: error.message || 'An unknown error occurred. Please try again later.',
      }
      return jsonResponse(errorResponse, 500)
    }

    const successResponse: ApiResponse<{ message: string }> = {
      status: 'success',
      data: { message: 'Reset password successful' },
    }
    return jsonResponse(successResponse, 200)
  } catch (error) {
    console.error(error)
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: 'An unknown internal error occurred.',
    }
    return jsonResponse(errorResponse, 500)
  }
}
