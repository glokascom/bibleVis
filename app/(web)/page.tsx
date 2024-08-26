// import HeroBlock from '../components/HeroBlock'

interface PageProps {
  params: {
    lng: string
  }
}

const Page: React.FC<PageProps> = async () => {
  return (
    <>
      {/* <HeroBlock /> */}
      <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl">MAIN PAGE</h1>
        </div>
      </main>
    </>
  )
}

export default Page
