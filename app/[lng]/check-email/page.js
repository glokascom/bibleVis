'use client'

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Проверьте вашу почту</h2>
        <p className="text-lg text-gray-600">
          Мы отправили вам письмо с инструкциями по подтверждению регистрации. Пожалуйста,
          проверьте вашу почту и следуйте инструкциям, чтобы завершить регистрацию.
        </p>
        <p className="text-gray-600">
          Если вы не получили письмо, пожалуйста, проверьте папку спама или попробуйте
          зарегистрироваться снова.
        </p>
      </div>
    </div>
  )
}
