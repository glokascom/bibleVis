import React from 'react'

import { render, screen } from '@testing-library/react'

import Layout from '../app/components/Layout'

describe('Layout component', () => {
  test('renders header with the app name and home link', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    expect(screen.getByText('MyApp')).toBeInTheDocument()

    expect(screen.getByText('Home')).toBeInTheDocument()

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
