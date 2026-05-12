import { render, screen } from '@testing-library/react'

import { Input } from './input'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" name="email" />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Input label="Email" name="email" error="Email is required" />)

    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('renders helper text when there is no error', () => {
    render(<Input label="Email" name="email" helperText="Use your admin email" />)

    expect(screen.getByText('Use your admin email')).toBeInTheDocument()
  })
})