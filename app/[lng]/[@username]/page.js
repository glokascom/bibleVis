import ImageForGallery from '@/app/components/ImageForGallery'

export default async function UsernamePage({ params }) {
  const username = decodeURIComponent(params['@username']).replace('@', '')
  const image = {
    user: { username: '@username' },
    url: 'https://loremflickr.com/1280/720',
    title: 'Title Jonah is in the city',
  }
  return (
    <div>
      <h1 className="text-xlarge font-bold text-gray-800">Profile Page for {username}</h1>
      <ImageForGallery image={image} />
    </div>
  )
}
