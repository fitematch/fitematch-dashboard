import { tokenStorage } from './token-storage'

describe('tokenStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('stores and returns access token', () => {
    tokenStorage.setAccessToken('access-token')

    expect(tokenStorage.getAccessToken()).toBe('access-token')
  })

  it('stores and returns refresh token', () => {
    tokenStorage.setRefreshToken('refresh-token')

    expect(tokenStorage.getRefreshToken()).toBe('refresh-token')
  })

  it('clears tokens', () => {
    tokenStorage.setAccessToken('access-token')
    tokenStorage.setRefreshToken('refresh-token')

    tokenStorage.clear()

    expect(tokenStorage.getAccessToken()).toBeNull()
    expect(tokenStorage.getRefreshToken()).toBeNull()
  })
})
