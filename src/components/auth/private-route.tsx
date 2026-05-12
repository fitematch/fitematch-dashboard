'use client'

import { useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/use-auth'

type PrivateRouteProps = {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.auth.signIn)
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-400">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}
