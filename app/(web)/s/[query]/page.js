import { getImageCounts } from './actions/getImageCounts'
import SearchImage from './components/SearchImage'

export default async function Page({ params }) {
  const { query } = params
  const searchQuery = query ? decodeURIComponent(query) : null
  const { counters } = await getImageCounts(searchQuery)
  return <SearchImage searchQuery={searchQuery} counters={counters} />
}
