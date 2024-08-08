import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import UserList from '@/app/components/UserList'

describe('UserList', () => {
  it('renders a list of users', () => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]

    render(<UserList users={users} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })
})
