export default function PagesLayout({ children }) {
  return (
    <section className="flex h-screen flex-col">
      <nav></nav>
      <div className="h-full w-full bg-blue-500"></div>
      {children}
    </section>
  )
}
