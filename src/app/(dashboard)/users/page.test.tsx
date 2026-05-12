import { render, screen } from '@testing-library/react'

import { useUsers } from '@/hooks/use-users'

import UsersPage from './page'

jest.mock('@/hooks/use-users', () => ({
  useUsers: jest.fn(),
}))

describe('UsersPage', () => {
  beforeEach(() => {
    jest.mocked(useUsers).mockReturnValue({
      users: [
        {
          id: 'user-1',
          name: 'Admin User',
          email: 'admin@fitematch.com.br',
          productRole: 'recruiter',
          adminRole: 'admin',
          status: 'active',
        },
      ],
      isLoading: false,
      error: null,
    })
  })

  it('renders users from API', async () => {
    render(<UsersPage />)

    expect(screen.getAllByText('Admin User')).toHaveLength(2)
    expect(screen.getAllByText('admin@fitematch.com.br')).toHaveLength(2)
  })
})
