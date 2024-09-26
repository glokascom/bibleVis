export default function PagesLayout({ children }) {
  return (
    <main>
      <section className="flex flex-col">{children}</section>
    </main>
  )
}
