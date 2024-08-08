'use client'

import { useState } from 'react'

function FormPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [message, setRefactor] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (login !== 'user@mail.com' || password !== '123456') {
      setRefactor('Incorrect email or password')
    } else {
      setRefactor('Success!')
    }
  }

  return (
    <div>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default FormPage
