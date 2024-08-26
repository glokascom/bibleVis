export default function UsersLayout({ children }) {
  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <section className="flex h-screen flex-col">
        <nav></nav>
        {children}
      </section>
    </main>
  )
}
