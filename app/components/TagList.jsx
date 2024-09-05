import CopyButton from './CopyButton'

const TextSection = ({ title, id, text }) => (
  <>
    <div className="flex">
      <p className="mr-4 font-bold">{title}</p>
      <CopyButton textToCopy={text} />
    </div>
    <p id={id}>{text}</p>
  </>
)

function TagList() {
  return (
    <div className="rounded-medium border p-5 md:bg-danger-100 md:text-danger-300">
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

      <p className="text-center text-danger-300">Tag list</p>
    </div>
  )
}

export default TagList
