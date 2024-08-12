import Link from 'next/link'

export default function PasswordResetSentPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">The email has been sent</h2>
        <p className="text-lg text-gray-800">
          If this email is registered in our system, you will receive an email with a link
          to reset the password.
        </p>
        <p className="text-sm text-gray-600">
          Check your email and follow the instructions in the email.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Go back to the login page
        </Link>
      </div>
    </div>
  )
}
