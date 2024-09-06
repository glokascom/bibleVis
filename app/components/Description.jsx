import { useState } from 'react'

import { Accordion, AccordionItem } from '@nextui-org/react'

import CopyButton from './CopyButton'
import LikesCounter from './LikesCounter'

const TextSection = ({ title, id, text }) => (
  <>
    <div className="flex">
      <p className="mr-4 font-bold">{title}</p>
      <CopyButton textToCopy={text} />
    </div>
    <p id={id}>{text}</p>
  </>
)

const StatItem = ({ label, value }) => (
  <div className="flex justify-between font-medium">
    <p className="text-secondary-400">{label}</p>
    <p>{value}</p>
  </div>
)

function Description() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true)

  const statistics = [
    { label: 'Views', value: '220,155' },
    { label: 'Downloads', value: '142,642' },
    { label: 'Resolution', value: '6016 x 4016' },
    { label: 'Published date', value: 'August 5, 2017' },
  ]

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  return (
    <div className="my-5 flex flex-col gap-5 border-y-1 py-5 text-small">
      <LikesCounter />

      <div className="hidden flex-col gap-5 md:flex">
        <p className="text-large font-bold">Jonah is in the city</p>
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

      <div className="hidden flex-col gap-3 md:flex">
        {statistics.map((stat, index) => (
          <StatItem key={index} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="md:hidden">
        <Accordion
          selectedKeys={isAccordionOpen ? ['1'] : []}
          onSelectionChange={(keys) => setIsAccordionOpen(keys.size > 0)}
        >
          <AccordionItem
            classNames={{ title: 'font-bold' }}
            hideIndicator
            key="1"
            aria-label="statistics"
            title="Jonah is in the city"
          >
            <div className="flex flex-col gap-3">
              {statistics.map((stat, index) => (
                <StatItem key={index} label={stat.label} value={stat.value} />
              ))}
            </div>
          </AccordionItem>
        </Accordion>

        <p
          className="mt-1 cursor-pointer text-center font-medium"
          onClick={toggleAccordion}
        >
          {isAccordionOpen ? 'Hide details' : 'Show details'}
        </p>
      </div>
    </div>
  )
}

export default Description
