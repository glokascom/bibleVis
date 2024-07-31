import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <div className="cursor-pointer rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600">
        <h1 className="text-xl font-bold">About</h1>
      </div>
      <Link href="/">
        <div className="cursor-pointer rounded-lg bg-green-500 p-4 text-white hover:bg-green-600">
          <span className="text-lg font-semibold">Home</span>
        </div>
      </Link>
    </div>
  )
}
