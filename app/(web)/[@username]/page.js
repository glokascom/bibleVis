import Cover from './components/Cover'
import UserInfo from './components/UserInfo'

export default async function UserDetail({ params }) {
  const username = decodeURIComponent(params['@username']).replace('@', '')
  const user = { username: 'AlenaAenami' }
  const isCurrentUser = username === user.username

  return (
    <main className="mx-auto w-full max-w-[1806px] px-6 md:px-12">
      <div className="mt-2.5 flex h-[400px] flex-col items-start gap-7 md:mt-9 md:flex-row md:gap-1">
        <div className="max-w-7xl">
          <Cover isCurrentUser={isCurrentUser} />
        </div>
        <div className="h-full w-full md:w-auto md:min-w-44 md:grow lg:min-w-96">
          <UserInfo isCurrentUser={isCurrentUser} />
        </div>
      </div>
    </main>
  )
}
