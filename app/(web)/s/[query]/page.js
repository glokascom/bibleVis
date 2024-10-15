import { getUser } from '@/app/actions/getUser'

import { openGraph } from '../../meta'
import { getImageCounts } from './actions/getImageCounts'
import SearchImage from './components/SearchImage'

export async function generateMetadata({ params: { query } }) {
  const searchQuery = query ? decodeURIComponent(query.replace(/-/g, ' ')) : null

  return {
    title: searchQuery ?? 'Search',
    description:
      "Browse BibleVis's collection of AI-generated Christian images categorized by topic for easy discovery and inspiration",
    openGraph: {
      ...openGraph,
      title: (searchQuery ?? 'Search') + ' | BibleVis',
      description:
        "Browse BibleVis's collection of AI-generated Christian images categorized by topic for easy discovery and inspiration",
    },
  }
}

export default async function Page({ params }) {
  const { query } = params
  const searchQuery = query ? decodeURIComponent(query.replace(/-/g, ' ')) : null
  const { counters } = await getImageCounts(searchQuery)
  const { user: currentUser } = await getUser()

  return (
    <SearchImage
      searchQuery={searchQuery}
      counters={counters}
      isAuthenticated={!!currentUser}
    />
  )
}
