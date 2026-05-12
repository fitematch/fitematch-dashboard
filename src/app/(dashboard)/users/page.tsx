'use client'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { PageState } from '@/components/ui/page-state'
import { UserMobileCard } from '@/components/users/user-mobile-card'
import { UserTable } from '@/components/users/user-table'
import { useUsers } from '@/hooks/use-users'

export default function UsersPage() {
  const { users, isLoading, error } = useUsers()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Users"
        description="Manage candidates, recruiters and administrative users."
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={users.length === 0}
        emptyTitle="No users found"
        emptyDescription="Users will appear here when they register."
      >
        <UserTable users={users} />

        <div className="space-y-4 md:hidden">
          {users.map((user) => (
            <UserMobileCard key={user.id} user={user} />
          ))}
        </div>
      </PageState>
    </div>
  )
}