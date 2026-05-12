import { render, screen } from '@testing-library/react'

import { EmptyState } from './empty-state'

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      <EmptyState
        title="No users found"
        description="Users will appear here when they register."
      />,
    )

    expect(screen.getByText('No users found')).toBeInTheDocument()
    expect(
      screen.getByText('Users will appear here when they register.'),
    ).toBeInTheDocument()
  })
})
