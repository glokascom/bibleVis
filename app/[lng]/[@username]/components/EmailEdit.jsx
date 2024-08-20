import React from 'react'

function EmailEdit() {
  const email = '2jw5M@example.com' //TODO экшен для email get запрос из базы
  return (
    <div className="flex flex-col gap-7">
      <div>
        <div className="mb-1">Email</div>
        {email}
      </div>
    </div>
  )
}

export default EmailEdit
