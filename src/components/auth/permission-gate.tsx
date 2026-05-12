'use client'

import type { ReactNode } from 'react'

import type { AdminRole } from '@/constants/permissions'
import { hasPermission } from '@/constants/permissions'
import { useAuth } from '@/hooks/use-auth'

type PermissionGateProps = {
  allowedRoles: readonly AdminRole[]
  fallback?: ReactNode
  children: ReactNode
}

export function PermissionGate({
  allowedRoles,
  fallback = null,
  children,
}: PermissionGateProps) {
  const { user } = useAuth()

  if (!hasPermission(user?.adminRole, allowedRoles)) {
    return fallback
  }

  return children
}
