import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'
import { ApiError, ApiResponse } from '@/app/types/api'

import { jsonResponse } from '../../response'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email, password, username } = await request.json()
  const errors: { field?: string; message: string }[] = []

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

  const validationErrors: Record<string, string[]> = {}

  // Валидация email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    validationErrors.email = validationErrors.email || []
    validationErrors.email.push('Unsupported email format')
  }

  // Валидация username
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    validationErrors.username = validationErrors.username || []
    validationErrors.username.push(
      'Only letters A-Z, a-z, numbers or underscore please (no spaces or special characters).'
    )
  }

  if (username.length < 5 || username.length > 20) {
    validationErrors.username = validationErrors.username || []
    validationErrors.username.push('Username must be between 5 and 20 characters long.')
  }

  // Валидация пароля
  if (password.length < 6) {
    validationErrors.password = validationErrors.password || []
    validationErrors.password.push('The password must be at least 6 characters')
  }

  let validGroups = 0
  if (/\d/.test(password)) validGroups++
  if (/[a-z]/.test(password)) validGroups++
  if (/[A-Z]/.test(password)) validGroups++
  if (/[^\w]/.test(password)) validGroups++

  if (validGroups < 2) {
    validationErrors.password = validationErrors.password || []
    validationErrors.password.push(
      'The password must contain at least 2 groups: digits, lowercase letters, uppercase letters, special characters'
    )
  }

  if (Object.keys(validationErrors).length > 0) {
    const validationErrorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: 'Validation errors occurred',
      errors: Object.entries(validationErrors).flatMap(([field, messages]) =>
        messages.map((message) => ({ field, message }))
      ),
    }
    return jsonResponse(validationErrorResponse, 400)
  } // Проверка на существование пользователя
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
      return jsonResponse(conflictResponse, 409) // 409 Conflict
    }
  }

  // Регистрация пользователя
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
    console.log({ signupError })
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
