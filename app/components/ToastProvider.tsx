'use client'

import React, { createContext, ReactNode, useContext } from 'react'

import { toast, ToastOptions } from 'react-hot-toast'

import CustomToast, { CustomToastProps } from './CustomToast'

interface ToastContextProps {
  success: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  neutral: (message: string, options?: ToastOptions) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const showToast = (
    type: CustomToastProps['type'],
    message: string,
    options?: ToastOptions
  ) => {
    toast.custom((t) => <CustomToast message={message} type={type} id={t.id} />, options)
  }

  const success = (message: string, options?: ToastOptions) =>
    showToast('success', message, options)
  const error = (message: string, options?: ToastOptions) =>
    showToast('error', message, options)
  const neutral = (message: string, options?: ToastOptions) =>
    showToast('neutral', message, options)

  return (
    <ToastContext.Provider value={{ success, error, neutral }}>
      {children}
    </ToastContext.Provider>
  )
}
