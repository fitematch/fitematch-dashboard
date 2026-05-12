'use client'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Profile"
        description="View your administrative account information."
      />

      <Card>
        <CardContent>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Name</dt>
              <dd className="mt-1 font-medium text-slate-100">
                {user?.name ?? '-'}
              </dd>
            </div>

            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="mt-1 font-medium text-slate-100">
                {user?.email ?? '-'}
              </dd>
            </div>

            <div>
              <dt className="text-slate-500">Admin role</dt>
              <dd className="mt-1 font-medium text-slate-100">
                {user?.adminRole ?? '-'}
              </dd>
            </div>

            <div>
              <dt className="text-slate-500">Status</dt>
              <dd className="mt-1 font-medium text-slate-100">
                {user?.status ?? '-'}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}