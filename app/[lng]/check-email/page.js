export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Check your email</h2>
        <p className="text-lg text-gray-600">
          We have sent you an email with instructions on how to confirm registration.
          Please, Check your email and follow the instructions to complete the
          registration.
        </p>
        <p className="text-gray-600">
          If you havent received the email, please check your spam folder or try register
          again.
        </p>
      </div>
    </div>
  )
}
