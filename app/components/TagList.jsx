import Link from 'next/link'

import CopyButton from './CopyButton'

function TagList({ tags = [] }) {
  if (tags.length === 0) {
    return <p>No tags available</p>
  }

  const tagsString = tags.map((tag) => tag.name).join(', ')

  return (
    <div className="text-small">
      <div className="flex py-5 md:pt-0">
        <p className="mr-4 font-bold">Tags</p>
        <CopyButton textToCopy={tagsString} />
      </div>
      <div className="flex flex-wrap gap-2.5">
        {tags.map(({ id, name }) => (
          <Link
            href={`/s/${name}`}
            key={id}
            className="flex items-center justify-center rounded-medium bg-secondary-100 px-5 py-2.5"
          >
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TagList
