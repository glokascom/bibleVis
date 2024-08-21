export type errorField = {
  field?: string
  message: string
}

export type ApiError = {
  status: 'error'
  message: string
  errors?: errorField[]
}

export type ApiSuccess<T> = {
  status: 'success'
  data: T
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError
