import HeroBlock from '../components/HeroBlock'
import NotificationButtons from '../components/NotificationButtons'
import { ToastProvider } from '../components/ToastProvider'

interface PageProps {
  params: {
    lng: string
  }
}

const Page: React.FC<PageProps> = () => {
  return (
    <>
      <HeroBlock />
      <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl">MAIN PAGE</h1>
          <ToastProvider>
            <NotificationButtons />
          </ToastProvider>
        </div>
      </main>
    </>
  )
}

export default Page
