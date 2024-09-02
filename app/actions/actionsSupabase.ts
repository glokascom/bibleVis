'use client'

import { ApiError, ApiResponse } from '@/app/types/api'

export async function forgotPassword({
  email,
}: {
  email: string
}): Promise<ApiResponse<unknown>> {
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      const successResponse = await response.json()
      return {
        status: 'success',
        data: successResponse.data,
      }
    } else {
      const errorResponse: ApiError = await response.json()
      return {
        status: 'error',
        message: errorResponse.message,
        errors: errorResponse.errors,
      }
    }
  } catch {
    return {
      status: 'error',
      message: 'An unknown error occurred.',
    }
  }
}

export async function login(
  email: string,
  password: string
): Promise<ApiResponse<unknown>> {
  const data = {
    email,
    password,
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // Проверяем, успешен ли ответ
    if (!response.ok) {
      const errorResponse: ApiError = await response.json()
      return {
        status: 'error',
        message: errorResponse.message,
        errors: errorResponse.errors,
      }
    }

    // Возвращаем успешный ответ
    const successResponse = await response.json()
    return {
      status: 'success',
      data: successResponse.data,
    }
  } catch {
    // Обработка сетевых ошибок и других исключений
    return {
      status: 'error',
      message: 'An unknown error occurred.',
    }
  }
}

export async function signup(
  email: string,
  password: string,
  username: string
): Promise<ApiResponse<unknown>> {
  const data = {
    email,
    password,
    username,
  }

  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // Проверяем, успешен ли ответ
    if (!response.ok) {
      const errorResponse: ApiError = await response.json()
      return {
        status: 'error',
        message: errorResponse.message,
        errors: errorResponse.errors,
      }
    }

    // Возвращаем успешный ответ
    const successResponse = await response.json()
    return {
      status: 'success',
      data: successResponse.data,
    }
  } catch {
    // Обработка сетевых ошибок и других исключений
    return {
      status: 'error',
      message: 'An unknown error occurred.',
    }
  }
}
