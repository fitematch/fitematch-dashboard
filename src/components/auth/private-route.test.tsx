import { render, screen, waitFor } from '@testing-library/react'

import { AuthContext } from '@/contexts/auth-context'

import { PrivateRoute } from './private-route'

const replace = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace,
  }),
}))

describe('PrivateRoute', () => {
  beforeEach(() => {
    replace.mockClear()
  })

  it('renders loading state', () => {
    render(
      <AuthContext.Provider
        value={{
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isLoading: true,
          signIn: jest.fn(),
          signOut: jest.fn(),
          refreshMe: jest.fn(),
        }}
      >
        <PrivateRoute>Private content</PrivateRoute>
      </AuthContext.Provider>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('redirects unauthenticated user', () => {
    render(
      <AuthContext.Provider
        value={{
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isLoading: false,
          signIn: jest.fn(),
          signOut: jest.fn(),
          refreshMe: jest.fn(),
        }}
      >
        <PrivateRoute>Private content</PrivateRoute>
      </AuthContext.Provider>,
    )

    return waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/sign-in')
    })
  })

  it('renders private content when authenticated', async () => {
    render(
      <AuthContext.Provider
        value={{
          user: {
            id: 'user-1',
            name: 'Admin User',
            email: 'admin@fitematch.com.br',
            adminRole: 'admin',
            status: 'active',
          },
          isAuthenticated: true,
          isAdmin: true,
          isLoading: false,
          signIn: jest.fn(),
          signOut: jest.fn(),
          refreshMe: jest.fn(),
        }}
      >
        <PrivateRoute>Private content</PrivateRoute>
      </AuthContext.Provider>,
    )

    expect(await screen.findByText('Private content')).toBeInTheDocument()
  })
})
