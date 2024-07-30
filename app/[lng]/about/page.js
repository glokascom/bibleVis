import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>About</h1>
      <Link href="/">Home</Link>
    </div>
  )
}
