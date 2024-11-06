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

export interface ModalProps {
  children: React.ReactNode
  isCloseButton?: boolean
  showCloseOnMobile?: boolean
  closeModal?: () => void
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError
