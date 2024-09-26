import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BVAvatar } from '../app/components/BVAvatar'

describe('BVAvatar component', () => {
  it('renders correctly', () => {
    render(
      <BVAvatar
        as="button"
        className="transition-transform"
        size="md"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
    )

    expect(screen.getByAltText('Jason Hughes')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
