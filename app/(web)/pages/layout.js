export default function PagesLayout({ children }) {
  return (
    <main className="mx-auto w-full max-w-[1096px] flex-grow px-6 md:px-12">
      {children}
    </main>
  )
}
