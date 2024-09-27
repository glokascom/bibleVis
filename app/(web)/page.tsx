import { getUser } from '../actions/getUser'
import HeroBlock from '../components/HeroBlock'
//TODO: delete on release. This is just for testing
import NotificationButtons from '../components/NotificationButtons'
import Gallery from './[@username]/components/Gallery'

interface PageProps {
  params: {
    lng: string
  }
}

const Page: React.FC<PageProps> = async () => {
  const { user: currentUser } = await getUser()

  return (
    <>
      <HeroBlock />
      <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
        <Gallery isMainPage={true} isAuthenticated={!!currentUser} />
        <NotificationButtons />
      </main>
    </>
  )
}

export default Page
