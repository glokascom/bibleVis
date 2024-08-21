export type ApiError = {
  status: 'error'
  message: string
  errors?: {
    field?: string
    message: string
  }[]
}

export type ApiSuccess<T> = {
  status: 'success'
  data: T
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError
