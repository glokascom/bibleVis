import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import CustomUser from '@/app/components/CustomUser'
import { fetchUser } from '@/app/components/UserAction'

vi.mock('@/app/components/UserAction')

describe('User component', () => {
  it('fetches and displays user data', async () => {
    fetchUser.mockResolvedValueOnce({ id: 1, name: 'John Doe' })

    render(<CustomUser />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    const userName = await screen.findByText('John Doe')
    expect(userName).toBeInTheDocument()
  })

  it('handles server error', async () => {
    fetchUser.mockRejectedValueOnce(new Error('Failed to fetch'))

    render(<CustomUser />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument())
  })
})
