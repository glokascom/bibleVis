import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Input from '@/app/components/Input'

describe('Input component', () => {
  it('renders correctly', () => {
    render(<Input />)
    const inputElement = screen.getByPlaceholderText('Email')
    expect(inputElement).toBeInTheDocument()
  })

  it('has the correct initial value', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement.value).toBe('')
  })

  it('updates value on change', async () => {
    render(<Input />)
    const inputElement = screen.getByPlaceholderText('Email')
    await userEvent.type(inputElement, 'test@example.com')
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
  })

  it('has correct class names for styling', () => {
    render(<Input />)
    const inputElement = screen.getByPlaceholderText('Email')
    expect(inputElement).toHaveClass(
      'focus:outline-none focus:ring-2 focus:ring-blue-500'
    )
  })

  it('disables input when value is "123"', async () => {
    render(<Input />)
    const inputElement = screen.getByTestId('input-email')
    await userEvent.type(inputElement, '123')
    expect(inputElement).toHaveAttribute('disabled')
  })

  it('enables input when value is not "123"', async () => {
    render(<Input />)
    const inputElement = screen.getByTestId('input-email')
    await userEvent.type(inputElement, '332211')
    expect(inputElement).not.toHaveAttribute('disabled')
  })

  it('has focus text when input is focused', async () => {
    render(<Input />)
    const inputElement = screen.getByPlaceholderText('Email')
    await userEvent.type(inputElement, 'Test')
    expect(screen.getByText('active')).toBeInTheDocument()
  })
  // не фокусируется если использовать fireevent
  it('has no focus text when use fireevent', async () => {
    render(<Input />)
    const inputElement = screen.getByPlaceholderText('Email')
    fireEvent.change(inputElement, { target: { value: 'Test' } })
    // нужно проверить что на странице нет текста active
    expect(screen.queryByText('active')).not.toBeInTheDocument()
  })
})
