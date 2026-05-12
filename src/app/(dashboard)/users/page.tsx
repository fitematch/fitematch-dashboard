'use client'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
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

      {error ? <Alert variant="danger">{error}</Alert> : null}

      {isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : users.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Users will appear here when they register."
        />
      ) : (
        <>
          <UserTable users={users} />

          <div className="space-y-4 md:hidden">
            {users.map((user, index) => (
              <UserMobileCard
                key={`${user.id}-${user.email}-${index}`}
                user={user}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
