import ImagePageComponent from '@/app/components/ImagePage'

export default async function ImagePage({ params }) {
  const { title } = params

  return (
    <main className="mx-auto mt-7 w-full max-w-[1806px] md:px-12">
      <ImagePageComponent title={title} isModal={false} />
    </main>
  )
}
