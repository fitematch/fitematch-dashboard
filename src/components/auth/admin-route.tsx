'use client'

import { type ReactNode } from 'react'

import { EmptyState } from '@/components/ui/empty-state'
import { useAuth } from '@/hooks/use-auth'

type AdminRouteProps = {
  children: ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-400">Loading...</div>
  }

  if (!isAdmin) {
    return (
      <EmptyState
        title="Access denied"
        description="You do not have permission to access this dashboard."
      />
    )
  }

  return children
}
