export default function UsersLayout({ children }) {
  return (
    <section className="flex h-screen flex-col">
      <nav></nav>
      {children}
    </section>
  )
}
