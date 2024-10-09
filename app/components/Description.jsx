import CopyButton from './CopyButton'
import LikesCounter from './LikesCounter'

const StatItem = ({ label, value }) => (
  <div className="flex justify-between font-medium">
    <p className="text-secondary-400">{label}</p>
    <p>{value}</p>
  </div>
)

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

function Description({ imageInfo, isLike, totalDownloads, isAuthenticated, totalLikes }) {
  const statistics = [
    { label: 'Views', value: imageInfo.total_views },
    { label: 'Downloads', value: totalDownloads },
    {
      label: 'Resolution',
      value: `${imageInfo.file_sizes.original.width}x${imageInfo.file_sizes.original.height}`,
    },
    { label: 'Published date', value: formatDate(imageInfo.uploaded_at) },
  ]

  return (
    <div className="mb-5 flex flex-col gap-5 border-b-1 py-5 text-small">
      <LikesCounter
        imageInfo={imageInfo}
        isLike={isLike}
        isAuthenticated={isAuthenticated}
        totalLikes={totalLikes}
      />
      <div className="flex flex-col gap-5">
        <p className="text-large font-bold">{imageInfo.title}</p>
        {imageInfo.description && <p>{imageInfo.description}</p>}
        {imageInfo.prompt && (
          <div className="flex">
            <p className="mr-4 font-bold">Prompt</p>
            <CopyButton textToCopy={imageInfo.prompt} />
          </div>
        )}
        {imageInfo.prompt && <p>{imageInfo.prompt}</p>}
      </div>

      <div className="flex flex-col gap-3">
        {statistics.map((stat, index) => (
          <StatItem key={index} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  )
}

export default Description
