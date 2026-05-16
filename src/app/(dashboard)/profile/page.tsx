'use client'

import { FiUser } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { getStatusBadgeVariant } from '@/utils/status-badge'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Profile"
        description="View your administrative account information."
        icon={FiUser}
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                Administrator account
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Administrative profile information.
              </p>
            </div>

            <Badge variant={getStatusBadgeVariant(user?.status)}>
              {(user?.status ?? 'unknown').toUpperCase()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-500">Name</dt>

              <dd className="mt-1 text-sm font-medium text-slate-100">
                {user?.name ?? '-'}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">Email</dt>

              <dd className="mt-1 text-sm font-medium text-slate-100">
                {user?.email ?? '-'}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">Admin role</dt>

              <dd className="mt-1 text-sm font-medium text-slate-100">
                {user?.adminRole ?? '-'}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">Product role</dt>

              <dd className="mt-1 text-sm font-medium text-slate-100">
                {user?.productRole ?? '-'}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
