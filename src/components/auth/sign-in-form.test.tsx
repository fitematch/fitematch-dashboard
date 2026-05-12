import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AuthProvider } from '@/contexts/auth-context'

import { SignInForm } from './sign-in-form'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}))

describe('SignInForm', () => {
  it('submits sign in form', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider>
        <SignInForm />
      </AuthProvider>,
    )

    await user.type(screen.getByLabelText('Email'), 'admin@fitematch.com.br')
    await user.type(screen.getByLabelText('Password'), 'password')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(await screen.findByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })
})
