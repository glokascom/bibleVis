'use client'

import React from 'react'

import { useToast } from './ToastProvider'

const NotificationButtons: React.FC = () => {
  const { success, error, neutral } = useToast()

  return (
    <div className="flex space-x-4">
      <button
        onClick={() =>
          success(
            'Письмо с инструкциями по восстановлению пароля отправлено на ваш адрес электронной почты'
          )
        }
        className="rounded bg-green-500 px-4 py-2 text-white"
      >
        Показать успешное уведомление
      </button>
      <button
        onClick={() => error('Произошла ошибка при отправке письма')}
        className="rounded bg-red-500 px-4 py-2 text-white"
      >
        Показать ошибку
      </button>
      <button
        onClick={() => neutral('Пожалуйста, подождите...')}
        className="rounded bg-gray-500 px-4 py-2 text-white"
      >
        Показать нейтральное уведомление
      </button>
    </div>
  )
}

export default NotificationButtons
