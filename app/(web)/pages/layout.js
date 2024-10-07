export default function PagesLayout({ children }) {
  return (
    <main className="flex-auto">
      <section className="flex flex-col">{children}</section>
    </main>
  )
}
