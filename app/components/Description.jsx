import CopyButton from './CopyButton'
import LikesCounter from './LikesCounter'

const StatItem = ({ label, value }) => (
  <div className="flex justify-between font-medium">
    <p className="text-secondary-400">{label}</p>
    <p>{value}</p>
  </div>
)

function Description() {
  const statistics = [
    { label: 'Views', value: '220,155' },
    { label: 'Downloads', value: '142,642' },
    { label: 'Resolution', value: '6016 x 4016' },
    { label: 'Published date', value: 'August 5, 2017' },
  ]

  return (
    <div className="my-5 flex flex-col gap-5 border-y-1 py-5 text-small">
      <LikesCounter />

      <div className="flex flex-col gap-5">
        <p className="text-large font-bold">Jonah is in the city</p>

        <p>
          Lorem description ipsum dolor sit amet consectetur. Ipsum cras porttitor a enim
          gravida adipiscing et. Et et ornare urna tellus sagittis. Non vestibulum lectus
          id enim. Laoreet tincidunt nulla nunc tincidunt et consequat accumsan bibendum
          nibh.
        </p>

        <div className="flex">
          <p className="mr-4 font-bold">Prompt</p>
          <CopyButton textToCopy="Lorem prompt ipsum dolor sit amet consectetur. Ipsum cras porttitor a enim gravida adipiscing et. Et et ornare urna tellus sagittis. Non vestibulum lectus id enim. Laoreet tincidunt nulla nunc tincidunt et consequat accumsan bibendum nibh." />
        </div>
        <p>
          Lorem prompt ipsum dolor sit amet consectetur. Ipsum cras porttitor a enim
          gravida adipiscing et. Et et ornare urna tellus sagittis. Non vestibulum lectus
          id enim. Laoreet tincidunt nulla nunc tincidunt et consequat accumsan bibendum
          nibh.
        </p>
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
