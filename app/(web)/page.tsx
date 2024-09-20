import { getUser } from '../actions/getUser'
import HeroBlock from '../components/HeroBlock'
import { loadNextPageExtended } from './[@username]/actions/imagesActions'
import Gallery from './[@username]/components/Gallery'

interface PageProps {
  params: {
    lng: string
  }
}

const Page: React.FC<PageProps> = async () => {
  const { user } = await getUser()
  const { images: initialImages } = await loadNextPageExtended(1)

  return (
    <>
      <HeroBlock />
      <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
        <Gallery
          followUserId={user?.id}
          initialImages={initialImages}
          isMainPage={true}
          isAuthenticated={!!user}
        />
      </main>
    </>
  )
}

export default Page
