export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1096px] flex-grow px-6 md:px-12">
      {children}
    </div>
  )
}
