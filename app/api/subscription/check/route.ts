import { ApiError } from 'next/dist/server/api-utils'

import { ApiResponse } from '@/app/types/api'

import { jsonResponse } from '../../response'
import { checkIfSubscribed } from '../actions'

export async function POST(request: Request) {
  try {
    const { followerUuid, followingUuid } = await request.json()

    if (followerUuid || !followingUuid) {
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message: 'Missing followerUuid or followingUuid',
      }
      return jsonResponse(errorResponse, 400)
    }

    const isFollowed = await checkIfSubscribed(followerUuid, followingUuid)

    if (isFollowed === null) {
      const errorResponse: ApiResponse<ApiError> = {
        status: 'error',
        message: 'Error checking subscription status',
      }
      return jsonResponse(errorResponse, 500)
    }

    const successResponse: ApiResponse<{ isFollowed: boolean }> = {
      status: 'success',
      data: { isFollowed: isFollowed ?? false },
    }
    return jsonResponse(successResponse, 200)
  } catch (err) {
    console.error(err)
    const errorResponse: ApiResponse<ApiError> = {
      status: 'error',
      message: 'An unexpected error occurred.',
    }
    return jsonResponse(errorResponse, 500)
  }
}
