import { useState } from 'react'

function Input() {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState('')
  return (
    <>
      <input
        className="w-64 rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Email"
        value={value}
        data-testid="input-email"
        disabled={value === '123'}
        onFocus={() => setFocus('active')}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-red-500">{focus}</p>
    </>
  )
}

export default Input
