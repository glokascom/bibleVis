import { getUser } from '../actions/getUser'
import HeroBlock from '../components/HeroBlock'
import Gallery from './[@username]/components/Gallery'

const Page: React.FC = async () => {
  const { user: currentUser } = await getUser()

  return (
    <>
      <HeroBlock />
      <div className="mx-auto w-full max-w-[1806px] flex-auto px-6 md:px-12">
        <Gallery isMainPage={true} isAuthenticated={!!currentUser} />
      </div>
    </>
  )
}

export default Page
