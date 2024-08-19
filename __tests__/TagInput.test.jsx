import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import TagInput from '../app/components/TagInput'

describe('TagInput', () => {
  const initialTags = ['JavaScript', 'React', 'CSS']

  test('should not display the initial tags when rendering', () => {
    render(<TagInput initialTags={initialTags} allowAddOnEnter={true} />)

    initialTags.forEach((tag) => {
      expect(screen.queryByText(tag)).not.toBeInTheDocument()
    })
  })

  test('should show tag suggestions as you type', async () => {
    render(<TagInput initialTags={initialTags} suggestionCount={5} />)

    const inputElement = screen.getByTestId('tag-input')

    fireEvent.change(inputElement, { target: { value: 'ja' } })

    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
    })

    expect(screen.queryByText('Java')).not.toBeInTheDocument()

    expect(screen.queryByText('CSS')).not.toBeInTheDocument()
    expect(screen.queryByText('HTML')).not.toBeInTheDocument()
  })

  test('must add a tag when typing and pressing Enter', () => {
    render(<TagInput initialTags={initialTags} allowAddOnEnter={true} />)

    const inputElement = screen.getByTestId('tag-input')
    fireEvent.change(inputElement, { target: { value: 'Next' } })
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  test('should not add a tag when pressing Enter if allowAddOnEnter = false', () => {
    render(<TagInput initialTags={[]} allowAddOnEnter={false} />)

    const inputElement = screen.getByTestId('tag-input')
    fireEvent.change(inputElement, { target: { value: 'NewTag' } })
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

    expect(screen.queryByText('NewTag')).not.toBeInTheDocument()
  })

  test.skip('must delete the tag when clicking on the delete button', async () => {
    render(<TagInput initialTags={initialTags} allowAddOnEnter={true} />)

    const inputElement = screen.getByTestId('tag-input')

    fireEvent.change(inputElement, { target: { value: 'React' } })
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

    expect(screen.getByText('React')).toBeInTheDocument()

    fireEvent.click(screen.getByText('×'))

    await waitFor(() => {
      expect(screen.queryByText('React')).not.toBeInTheDocument()
    })
  })
})
