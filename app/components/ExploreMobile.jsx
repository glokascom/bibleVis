'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'

import { BVLink } from './BVLink'
import Social from './Social'

function ExploreMobile() {
  return (
    <Accordion
      className="p-0"
      itemClasses={{
        trigger: 'p-0',
        title: 'text-base font-semibold p-0',
        indicator: 'text-black data-[open=true]:-rotate-180',
      }}
    >
      <AccordionItem
        key="1"
        aria-label="Explore"
        textValue="Explore"
        title="Explore"
        isCompact
        indicator={
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.25L5.5 5.75L10 1.25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        }
      >
        <div className="flex flex-col">
          <BVLink key="about_b_V" href="/pages/about" className="border-b py-2.5 text-xs">
            About BibleVis
          </BVLink>
          <BVLink
            key="privacy_policy"
            href="/pages/privacy"
            className="border-b py-2.5 text-xs"
          >
            Privacy Policy
          </BVLink>
          <BVLink
            key="terms_of_use"
            href="/pages/tos"
            className="border-b py-2.5 text-xs"
          >
            Terms of Use
          </BVLink>
          <Social />
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default ExploreMobile
