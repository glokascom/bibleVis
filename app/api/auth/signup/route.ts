import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'
import { ApiError, ApiResponse } from '@/app/types/api'
import {
  validateCharacters,
  validateContent,
  validateEmail,
  validateLength,
  validatePassword,
} from '@/app/utils/validation'

import { jsonResponse } from '../../response'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email, password, username } = await request.json()
  const errors: ApiError['errors'] = []

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' })
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  }

  if (!username) {
    errors.push({ field: 'username', message: 'Username is required' })
  }

  if (errors.length > 0) {
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: 'Validation errors occurred',
      errors,
    }
    return jsonResponse(errorResponse, 400)
  }

  const emailError = validateEmail(email)
  if (emailError) errors.push({ field: 'email', message: emailError })

  const lengthError = validateLength(username)
  if (lengthError) errors.push({ field: 'username', message: lengthError })

  const characterError = validateCharacters(username)
  if (characterError) errors.push({ field: 'username', message: characterError })

  const contentError = validateContent(username)
  if (contentError) errors.push({ field: 'username', message: contentError })

  const passwordErrors = validatePassword(password)
  if (passwordErrors) {
    passwordErrors.forEach((err) => errors.push({ field: 'password', message: err }))
  }

  if (errors.length > 0) {
    const validationErrorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: 'Validation errors occurred',
      errors,
    }
    return jsonResponse(validationErrorResponse, 400)
  }
  const supabase = createClient()
  const { data, error: dbError } = await supabase
    .from('users')
    .select('username, email')
    .or(`username.eq.${username},email.eq.${email}`)

  if (dbError) {
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: dbError.message || 'An unknown error occurred.',
    }
    return jsonResponse(errorResponse, 500)
  }

  if (data && data.length > 0) {
    const conflictErrors: ApiError['errors'] = []
    if (data[0].username === username) {
      conflictErrors.push({ field: 'username', message: 'Username already exists' })
    }
    if (data[0].email === email) {
      conflictErrors.push({ field: 'email', message: 'Email already exists' })
    }
    if (conflictErrors.length > 0) {
      const conflictResponse: ApiResponse<ApiError> = {
        status: 'error',
        message: 'Conflict errors occurred',
        errors: conflictErrors,
      }
      return jsonResponse(conflictResponse, 409)
    }
  }

  const { error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  })

  if (signupError) {
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: signupError.message || 'An unknown error occurred.',
    }
    return jsonResponse(errorResponse, 401)
  }

  const successResponse: ApiResponse<{ message: string }> = {
    status: 'success',
    data: { message: 'Signup successful' },
  }
  return jsonResponse(successResponse, 200)
}
