'use client'

import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const data = await res.json()
    console.log(data, 22)
    setResults(data.images || [])
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Введите запрос..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Поиск</button>
      </form>
    </div>
  )
}
