'use client'

import { useParams } from 'next/navigation'
import { FiUsers } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { PageState } from '@/components/ui/page-state'
import { UserForm } from '@/components/users/user-form'
import { useUser } from '@/hooks/use-user'

export default function UserEditPage() {
  const params = useParams<{ userId: string }>()
  const { user, isLoading, error } = useUser(params.userId)

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Edit user"
        description="Update user account, roles and status."
        icon={FiUsers}
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={!user}
        emptyTitle="User not found"
        emptyDescription="The requested user could not be found."
      >
        {user ? <UserForm user={user} /> : null}
      </PageState>
    </div>
  )
}
