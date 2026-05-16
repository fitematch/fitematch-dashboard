'use client'

import { FiFileText } from 'react-icons/fi'

import { ApplicationForm } from '@/components/applications/application-form'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'

export default function ApplicationCreatePage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="New application"
        description="Create a new application record."
        icon={FiFileText}
      />

      <ApplicationForm />
    </div>
  )
}
