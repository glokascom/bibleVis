function Email({ userInfo }) {
  return (
    <div>
      <div className="mb-1">Email</div>
      {userInfo.email}
      {userInfo.provider === 'email' ? '' : ` (logged in with ${userInfo.provider})`}
    </div>
  )
}

export default Email
