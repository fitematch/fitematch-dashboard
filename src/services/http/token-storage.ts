const ACCESS_TOKEN_KEY = 'fitematch-dashboard:access-token'
const REFRESH_TOKEN_KEY = 'fitematch-dashboard:refresh-token'

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export const tokenStorage = {
  getAccessToken() {
    if (!canUseStorage()) {
      return null
    }

    return window.localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  setAccessToken(token: string) {
    if (!canUseStorage()) {
      return
    }

    window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },

  removeAccessToken() {
    if (!canUseStorage()) {
      return
    }

    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  },

  getRefreshToken() {
    if (!canUseStorage()) {
      return null
    }

    return window.localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  setRefreshToken(token: string) {
    if (!canUseStorage()) {
      return
    }

    window.localStorage.setItem(REFRESH_TOKEN_KEY, token)
  },

  removeRefreshToken() {
    if (!canUseStorage()) {
      return
    }

    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
  },

  clear() {
    if (!canUseStorage()) {
      return
    }

    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}
