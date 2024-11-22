import { getImageCounts } from '../../s/[query]/actions/getImageCounts'
import FavoritesGallery from './components/FavoritesGallery'

export const dynamic = 'force-dynamic'

export default async function FavoritesPage() {
  let counters = {
    total: 0,
    aiGenerated: 0,
    humanMade: 0,
  }

  try {
    const favoritesResult = await getImageCounts(null, true)
    counters = favoritesResult.counters
  } catch (err) {
    console.error(err)
  }

  return (
    <>
      <h1 className="mb-10 pt-14 text-5xl font-medium md:pt-24">Liked images</h1>
      <FavoritesGallery counters={counters} />
    </>
  )
}
