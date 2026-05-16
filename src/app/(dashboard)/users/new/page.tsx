'use client'

import { FiUsers } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { UserForm } from '@/components/users/user-form'

export default function UserCreatePage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="New user"
        description="Create a new user account and define roles."
        icon={FiUsers}
      />

      <UserForm />
    </div>
  )
}
