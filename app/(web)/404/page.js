import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Sorry, this page isnt available.</p>

      <div className="mt-8 flex items-center justify-center">
        <Image src="/star.svg" alt="404 illustration" width={256} height={256} priority />
      </div>

      <p className="mt-6 text-gray-600">
        The link you followed may be broken, or the page may have been removed.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  )
}
