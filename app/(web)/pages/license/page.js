import { Image } from '@nextui-org/react'

export default function License() {
  return (
    <div className="text-center">
      <p className="my-20 text-4xl font-medium md:my-24 md:text-5xl">License</p>

      <div className="flex flex-col md:flex-row">
        <div>
          <div className="mb-5 flex gap-2.5 md:mb-10">
            <p>What is allowed?</p>
            <Image src="/check-mark-green.svg" alt="check mark" />
          </div>

          <p className="rounded-medium border border-primary-400">
            Images on BibleVis are free to use
          </p>
        </div>
        <div>
          <div className="mb-5 flex gap-2.5 md:mb-10">
            <p>What is not allowed?</p>
            <Image src="/close-red.svg" alt="close" />
          </div>
        </div>
      </div>
    </div>
  )
}
