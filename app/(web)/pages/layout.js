export default function PagesLayout({ children }) {
  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <section className="flex h-screen flex-col">
        <div className="h-full w-full bg-blue-500"></div>
        {children}
      </section>
    </main>
  )
}
