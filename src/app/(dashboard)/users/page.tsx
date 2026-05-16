'use client'

import { useState } from 'react'
import { FiPlus, FiUsers } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { PageState } from '@/components/ui/page-state'
import { UserMobileCard } from '@/components/users/user-mobile-card'
import { UserTable } from '@/components/users/user-table'
import { ROUTES } from '@/constants/routes'
import { useUsers } from '@/hooks/use-users'
import { userService } from '@/services/users/user.service'
import type { User } from '@/types/entities/user.entity'

export default function UsersPage() {
  const { users, isLoading, error } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteUser() {
    if (!selectedUser) {
      return
    }

    try {
      setIsDeleting(true)

      await userService.delete(selectedUser.id)

      window.location.reload()
    } finally {
      setIsDeleting(false)
      setSelectedUser(null)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Users"
        description="Manage candidates, recruiters and administrative users."
        icon={FiUsers}
      />

      <div className="flex justify-end">
        <Button asChild href={`${ROUTES.dashboard.users}/new`}>
          <FiPlus className="h-4 w-4" />
          Add user
        </Button>
      </div>

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={users.length === 0}
        emptyTitle="No users found"
        emptyDescription="Users will appear here when they register."
      >
        <UserTable users={users} onDelete={setSelectedUser} />

        <div className="space-y-4 md:hidden">
          {users.map((user, index) => (
            <UserMobileCard
              key={`${user.id}-${user.email}-${index}`}
              user={user}
              onDelete={setSelectedUser}
            />
          ))}
        </div>
      </PageState>

      <ConfirmModal
        isOpen={Boolean(selectedUser)}
        title="Delete user"
        description={`Are you sure you want to delete ${
          selectedUser?.name ?? 'this user'
        }? This action cannot be undone.`}
        confirmLabel="Delete user"
        isLoading={isDeleting}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleDeleteUser}
      />
    </div>
  )
}
