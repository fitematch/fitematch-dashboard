'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/use-auth'

type PrivateRouteProps = {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHasMounted(true)
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (hasMounted && !isLoading && !isAuthenticated) {
      router.replace(ROUTES.auth.signIn)
    }
  }, [hasMounted, isAuthenticated, isLoading, router])

  if (!hasMounted || isLoading) {
    return <div className="p-6 text-sm text-slate-400">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}
