function PasswordEdit() {
  const password = '2jw5M@example.com' //TODO экшен для email get запрос из базы
  return (
    <form className="flex flex-col gap-7">
      <div>
        <div className="mb-1">Password</div>
        {password}
      </div>
    </form>
  )
}

export default PasswordEdit
