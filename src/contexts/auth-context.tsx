'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { hasAdminRole } from '@/constants/permissions'
import { authService } from '@/services/auth/auth.service'
import type { SignInRequest } from '@/services/auth/auth.types'
import { tokenStorage } from '@/services/http/token-storage'
import type { User } from '@/types/entities/user.entity'

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  signIn: (payload: SignInRequest) => Promise<void>
  signOut: () => void
  refreshMe: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [hasHydratedAuth, setHasHydratedAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(tokenStorage.getAccessToken()),
  )

  const refreshMe = useCallback(async () => {
    const token = tokenStorage.getAccessToken()

    if (!token) {
      setUser(null)
      setIsLoading(false)
      setHasHydratedAuth(true)
      return
    }

    try {
      setIsLoading(true)

      const me = await authService.me()

      setUser(me)
    } catch {
      tokenStorage.clear()
      setUser(null)
    } finally {
      setIsLoading(false)
      setHasHydratedAuth(true)
    }
  }, [])

  const signIn = useCallback(async (payload: SignInRequest) => {
    const response = await authService.signIn(payload)

    tokenStorage.setAccessToken(response.accessToken)

    if (response.refreshToken) {
      tokenStorage.setRefreshToken(response.refreshToken)
    }

    setUser(response.user)
  }, [])

  const signOut = useCallback(() => {
    tokenStorage.clear()
    setUser(null)
    setHasHydratedAuth(true)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading || hasHydratedAuth) {
      return
    }

    void (async () => {
      try {
        const me = await authService.me()

        setUser(me)
      } catch {
        tokenStorage.clear()
        setUser(null)
      } finally {
        setIsLoading(false)
        setHasHydratedAuth(true)
      }
    })()
  }, [hasHydratedAuth, isLoading])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: hasAdminRole(user?.adminRole),
      isLoading,
      signIn,
      signOut,
      refreshMe,
    }),
    [user, isLoading, signIn, signOut, refreshMe],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
