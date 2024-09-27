import { getImageCounts } from './actions/getImageCounts'
import SearchImage from './components/SearchImage'

export default async function Page({ params }) {
  const { title } = params
  const searchQuery = title ? decodeURIComponent(title) : null
  const { counters } = await getImageCounts(searchQuery)
  return <SearchImage searchQuery={searchQuery} counters={counters} />
}
