import { Metadata } from 'next'

import { openGraph } from '../../meta'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Discover BibleVis, a unique platform for creating and sharing AI-generated Bible and Christian-themed visuals',
  openGraph: {
    ...openGraph,
    title: 'About BibleVis',
    description:
      'Discover BibleVis, a unique platform for creating and sharing AI-generated Bible and Christian-themed visuals',
  },
}

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">About BibleVis</h1>
        <p className="mb-4">
          BibleVis is an innovative platform dedicated to making Bible stories and
          Christian concepts more accessible and visually engaging. Through the use of
          advanced AI technology, we create high-quality, AI-generated images based on
          Bible themes, providing a unique and creative way to experience the richness of
          Scripture.
        </p>

        <p className="mb-8">
          Our mission is to equip Christian communities, churches, teachers, missionaries,
          and ministries with visually appealing resources that can enhance storytelling,
          teaching, and communication. Whether for sermon illustrations, social media,
          personal Bible study, or creative projects, BibleVis serves as a valuable tool
          to visually represent Biblical content in new and compelling ways.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">What Makes BibleVis Unique?</h2>
        <ul className="mb-8 list-disc space-y-2 pl-5">
          <li>
            <strong>AI-Powered Creativity:</strong> By leveraging cutting-edge AI
            technology, BibleVis transforms text prompts and verses into vivid, inspiring
            visuals, making it possible to explore the Bible from fresh perspectives.
          </li>
          <li>
            <strong>Community Collaboration:</strong> BibleVis is not just a platform but
            a community of Christian creatives. Users are encouraged to contribute, share,
            and collaborate, building a growing library of Bible-based visuals for others
            to use.
          </li>
          <li>
            <strong>Free and Open Access:</strong> We believe in providing high-quality
            resources without barriers. BibleVis offers free access to a range of
            AI-generated images, so everyone can benefit from this visual library.
          </li>
        </ul>

        <h2 className="mb-4 text-2xl font-semibold">Our Vision</h2>
        <p className="mb-8">
          BibleVis exists to inspire deeper engagement with the Word of God through art
          and technology. We aim to be the go-to platform for anyone looking for creative
          ways to visually represent Bible stories, serving churches, ministries, and
          individuals around the world.
        </p>

        <p className="mb-8">
          We envision a world where Biblical stories and teachings can be shared visually
          in every language and every culture, bringing the beauty and wisdom of Scripture
          to life in new and creative formats.
        </p>

        <p className="mb-8 text-xl font-semibold">
          Explore, create, and share the Word of God through visuals. Join us at BibleVis
          as we make the Bible come alive!
        </p>
      </section>
    </div>
  )
}
