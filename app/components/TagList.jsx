import CopyButton from './CopyButton'
import SoftwareUsed from './SoftwareUsed'

const TextSection = ({ title, id, text }) => (
  <div>
    <div className="flex">
      <p className="mr-4 font-bold">{title}</p>
      <CopyButton textToCopy={text} />
    </div>
    <p className="p-5" id={id}>
      {text}
    </p>
  </div>
)

function TagList() {
  const tags = [
    'Biblical scenes',
    'Saints',
    'Crucifixion',
    'Angels',
    'Apostles',
    'Nativity',
    'Easter',
  ]

  const tagsString = tags.join(', ')

  return (
    <div className="text-small">
      <div className="flex flex-col gap-5 md:hidden">
        <TextSection
          title="Description"
          id="description"
          text="Lorem description ipsum dolor sit amet consectetur. Ipsum cras porttitor a enim gravida adipiscing et. Et et ornare urna tellus sagittis. Non vestibulum lectus id enim. Laoreet tincidunt nulla nunc tincidunt et consequat accumsan bibendum nibh."
        />
        <TextSection
          title="Prompt"
          id="prompt"
          text="Lorem prompt ipsum dolor sit amet consectetur. Ipsum cras porttitor a enim gravida adipiscing et. Et et ornare urna tellus sagittis. Non vestibulum lectus id enim. Laoreet tincidunt nulla nunc tincidunt et consequat accumsan bibendum nibh."
        />
      </div>

      <div className="mt-5 md:hidden">
        <SoftwareUsed />
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
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagList
