import MainPage from './client'

export default async function Page({ params: { lng } }) {
  return (
    <>
      <MainPage lng={lng} />
    </>
  )
}
