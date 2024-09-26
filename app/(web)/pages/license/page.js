import { Image } from '@nextui-org/react'

export default function License() {
  const allowedRules = [
    'Images on BibleVis are free to use',
    'Attribution is not mandatory, but giving credit to BibleVis and author of the image is appreciated',
    'You can modify the images from BibleVis. Feel free to be creative and edit them as you wish.',
  ]

  const notAllowedRules = [
    'Identifiable people must not be depicted in a negative or offensive manner.',
    'Do not sell unaltered copies of an image, such as posters, prints, or on physical products, without making modifications first.',
    'Do not imply endorsement of your product by people or brands featured in the images',
    'Do not redistribute or sell the images on other stock photo or wallpaper platforms',
    'Do not use the images as part of a trademark, design mark, trade name, business name, or service mark.',
    'Collecting images from BibleVis to create a similar or competing service.',
  ]

  return (
    <div className="text-center">
      <p className="my-20 text-4xl font-medium md:my-24 md:text-5xl">License</p>

      <div className="mb-16 flex flex-col gap-10 md:mb-24 md:flex-row md:gap-5">
        <RuleColumn
          title="What is allowed?"
          rules={allowedRules}
          iconSrc="/check-mark-green.svg"
          iconAlt="check mark"
        />
        <RuleColumn
          title="What is not allowed?"
          rules={notAllowedRules}
          iconSrc="/close-red.svg"
          iconAlt="close"
        />
      </div>
    </div>
  )
}

const RuleColumn = ({ title, rules, iconSrc, iconAlt }) => (
  <div className="md:w-1/2">
    <div className="mb-5 flex items-center justify-center gap-2.5 text-xlarge font-medium md:mb-10 md:text-semimega">
      <p>{title}</p>
      <Image src={iconSrc} alt={iconAlt} />
    </div>
    <div className="flex flex-col gap-2.5 text-small">
      {rules.map((rule, index) => (
        <p
          key={index}
          className="min-h-20 content-center rounded-medium border border-primary-400 px-5 py-2.5"
        >
          {rule}
        </p>
      ))}
    </div>
  </div>
)
