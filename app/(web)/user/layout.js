export default function UsersLayout({ children }) {
  return (
    <main className="mx-auto w-full max-w-[1806px] px-5 md:px-12">
      <section className="h-screen-with-appbar flex flex-col">
        <nav></nav>
        {children}
      </section>
    </main>
  )
}
