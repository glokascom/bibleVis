import { createContext, ReactNode, useContext, useState } from 'react'

import ReactDOM from 'react-dom'
import { ToastOptions } from 'react-hot-toast'

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
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: CustomToastProps['type'] }>
  >([])

  const addToast = (
    message: string,
    type: CustomToastProps['type'],
    options?: ToastOptions
  ) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, message, type }])

    const customOptions: ToastOptions = {
      ...options,
      duration: 4000,
      position: 'top-center',
    }

    setTimeout(() => removeToast(id), customOptions.duration)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const showToast = (
    type: CustomToastProps['type'],
    message: string,
    options?: ToastOptions
  ) => {
    addToast(message, type, options)
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

      {toasts.map((toast, index) => {
        const topOffset = 7 + index * 5

        return ReactDOM.createPortal(
          <div
            key={toast.id}
            style={{
              position: 'fixed',
              top: `${topOffset}rem`,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <CustomToast
              message={toast.message}
              type={toast.type}
              id={toast.id}
              onClose={() => removeToast(toast.id)}
            />
          </div>,
          document.body
        )
      })}
    </ToastContext.Provider>
  )
}
