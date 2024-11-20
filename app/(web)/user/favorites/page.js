import { getFavoriteCounts } from './actions/getFavoriteCounts'
import FavoritesGallery from './components/FavoritesGallery'

export default async function FavoritesPage() {
  const { counters } = await getFavoriteCounts()

  return (
    <>
      <h1 className="mb-10 pt-14 text-5xl font-medium md:pt-24">liked images</h1>
      <FavoritesGallery isAuthenticated={true} counters={counters} />
    </>
  )
}
