import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import User from '@/app/components/User'

describe('User component', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('fetches and displays user data', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ id: 1, name: 'John Doe' }),
    })

    render(<User />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument())
  })

  it('handles server error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'))

    render(<User />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument())
  })
})
