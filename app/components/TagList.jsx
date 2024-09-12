import CopyButton from './CopyButton'
import SoftwareUsed from './SoftwareUsed'

function TagList({ tags = [] }) {
  const tagsString = tags
    .map((tag) => (typeof tag === 'object' ? tag.name : tag))
    .join(', ')

  if (tags.length === 0) {
    return <p>No tags available</p>
  }

  return (
    <div className="text-small">
      <div className="md:hidden">
        <SoftwareUsed software={tags} />
      </div>
      <div className="flex py-5 md:pt-0">
        <p className="mr-4 font-bold">Tags</p>
        <CopyButton textToCopy={tagsString} />
      </div>
      <div className="flex flex-wrap gap-2.5">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex cursor-default items-center justify-center rounded-medium bg-secondary-100 px-5 py-2.5"
          >
            <span>{tag.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagList
