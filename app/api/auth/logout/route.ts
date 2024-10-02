import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/app/supabase/server'
import { ApiError, ApiResponse } from '@/app/types/api'

import { jsonResponse } from '../../response'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const redirectTo = request.nextUrl.searchParams.get('redirectedFrom') ?? '/'

  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: error.message || 'An unknown error occurred.',
    }
    return jsonResponse(errorResponse, 500)
  }
  return NextResponse.redirect(`${request.nextUrl.origin}${redirectTo}`)
}
