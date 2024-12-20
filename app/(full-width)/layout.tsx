export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black/40 bg-cover bg-center bg-blend-darken"
      style={{ backgroundImage: 'url(/ship.webp)' }}
    >
      {children}
    </div>
  )
}
