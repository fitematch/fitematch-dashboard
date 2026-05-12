import { render, screen } from '@testing-library/react'

import { AuthContext } from '@/contexts/auth-context'

import { AdminRoute } from './admin-route'

describe('AdminRoute', () => {
  it('renders loading state', () => {
    render(
      <AuthContext.Provider
        value={{
          user: null,
          isAuthenticated: true,
          isAdmin: false,
          isLoading: true,
          signIn: jest.fn(),
          signOut: jest.fn(),
          refreshMe: jest.fn(),
        }}
      >
        <AdminRoute>Admin content</AdminRoute>
      </AuthContext.Provider>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('blocks non admin user', () => {
    render(
      <AuthContext.Provider
        value={{
          user: {
            id: 'user-1',
            name: 'Candidate User',
            email: 'candidate@fitematch.com.br',
            productRole: 'candidate',
            status: 'active',
          },
          isAuthenticated: true,
          isAdmin: false,
          isLoading: false,
          signIn: jest.fn(),
          signOut: jest.fn(),
          refreshMe: jest.fn(),
        }}
      >
        <AdminRoute>Admin content</AdminRoute>
      </AuthContext.Provider>,
    )

    expect(screen.getByText('Access denied')).toBeInTheDocument()
  })

  it('renders admin content', () => {
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
        <AdminRoute>Admin content</AdminRoute>
      </AuthContext.Provider>,
    )

    expect(screen.getByText('Admin content')).toBeInTheDocument()
  })
})
