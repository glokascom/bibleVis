import Link from 'next/link'

import CookiesModal from './CookiesModal'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-8 bg-secondary-50">
      <div className="mx-auto flex w-full max-w-[1806px] flex-col-reverse items-center justify-between gap-8 px-6 py-5 font-semibold text-secondary-200 md:flex-row md:items-start md:px-12 md:py-9">
        <div className="text-small md:text-medium">© {year} BibleVis</div>
        <div className="flex flex-col gap-5 text-center text-tiny md:flex-row md:gap-10 md:text-left md:text-medium">
          <Link href="/pages/privacy">Privacy Policy</Link>
          <Link href="/pages/about">About BibleVis</Link>
          <Link href="/pages/tos">Terms of Service</Link>
          <CookiesModal>
            <div className="cursor-pointer">Manage Cookies</div>
          </CookiesModal>
        </div>
      </div>
    </footer>
  )
}

export default Footer
