export default function UsersLayout({ children }) {
  return (
    <section className="flex h-screen flex-col">
      <nav></nav>
      {/* <div className="h-full w-full bg-blue-100"></div> */}
      {children}
    </section>
  )
}
