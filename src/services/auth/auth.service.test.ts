import { authService } from './auth.service'

describe('authService', () => {
  it('signs in with valid credentials', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          accessToken: 'access-token',
          user: {
            id: 'user-1',
            name: 'Admin',
            email: 'admin@fitematch.com.br',
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    )

    const response = await authService.signIn({
      email: 'admin@fitematch.com.br',
      password: 'password',
    })

    expect(response.accessToken).toBe('access-token')
    expect(response.user.email).toBe('admin@fitematch.com.br')
    expect(fetchSpy).toHaveBeenCalledWith(
      'http://localhost:3000/auth/sign-in',
      expect.objectContaining({
        method: 'POST',
      }),
    )

    fetchSpy.mockRestore()
  })
})
