export default function UsersLayout({ children }) {
  return (
    <section className="h-screen-with-appbar flex flex-col">
      <nav></nav>
      {children}
    </section>
  )
}
