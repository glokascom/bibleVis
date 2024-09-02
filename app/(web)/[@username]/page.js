import Cover from './components/Cover'
import Gallery from './components/Gallery'
import UserInfo from './components/UserInfo'

export default async function UserDetail({ params }) {
  const username = decodeURIComponent(params['@username']).replace('@', '')
  const user = { username: 'AlenaAenami' }
  const isCurrentUser = username === user.username

  const count_images_username = 50 //TODO нужно подсчитать кол-во картинок юзера

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <div className="mt-2.5 flex flex-col items-start gap-7 md:mt-9 md:flex-row md:gap-1 xl:h-[400px]">
        <div className="max-w-7xl">
          <Cover isCurrentUser={isCurrentUser} />
        </div>
        <div className="h-auto w-full md:h-full md:w-auto md:min-w-44 md:grow lg:min-w-96">
          <UserInfo isCurrentUser={isCurrentUser} />
        </div>
      </div>
      <div className="mb-7 mt-7 flex items-end md:mt-0 2xl:mt-9">
        <div className="text-semimega font-bold md:text-mega">Gallery</div>
        <div className="mb-1 ml-5 font-bold lg:mb-3">Images</div>
        <div className="mb-1 ml-2.5 text-small text-secondary-400 lg:mb-3">
          {count_images_username}
        </div>
      </div>
      <Gallery />
    </main>
  )
}
