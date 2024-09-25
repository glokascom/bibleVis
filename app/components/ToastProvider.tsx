import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

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
        return (
          <ToastPortal
            key={toast.id}
            toast={toast}
            index={index}
            totalToasts={toasts.length}
            removeToast={() => removeToast(toast.id)}
          />
        )
      })}
    </ToastContext.Provider>
  )
}

const ToastPortal: React.FC<{
  toast: { id: string; message: string; type: CustomToastProps['type'] }
  index: number
  totalToasts: number
  removeToast: () => void
}> = ({ toast, index, removeToast }) => {
  const toastRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (toastRef.current) {
      setHeight(toastRef.current.getBoundingClientRect().height)
    }
  }, [toastRef])

  const topOffset = Array.from({ length: index }, (_, i) => height + 10 * i).reduce(
    (acc, offset) => acc + offset,
    7
  )

  return ReactDOM.createPortal(
    <div
      ref={toastRef}
      style={{
        position: 'fixed',
        top: `${topOffset}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
      }}
    >
      <CustomToast
        message={toast.message}
        type={toast.type}
        id={toast.id}
        onClose={removeToast}
      />
    </div>,
    document.body
  )
}
