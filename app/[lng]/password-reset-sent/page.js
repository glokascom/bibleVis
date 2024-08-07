'use client'
export default function PasswordResetSentPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Письмо отправлено</h2>
        <p className="text-lg text-gray-800">
          Если этот email зарегистрирован в нашей системе, вы получите письмо со ссылкой
          для сброса пароля.
        </p>
        <p className="text-sm text-gray-600">
          Проверьте вашу почту и следуйте инструкциям в письме.
        </p>
        <button
          onClick={() => (window.location.href = '/login')}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Вернуться на страницу входа
        </button>
      </div>
    </div>
  )
}
