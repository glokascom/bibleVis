import { NextResponse } from 'next/server'

import { ApiResponse } from '@/app/types/api'

export function jsonResponse<T>(
  response: ApiResponse<T>,
  statusCode: number = 200
): NextResponse {
  return NextResponse.json(response, {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}
