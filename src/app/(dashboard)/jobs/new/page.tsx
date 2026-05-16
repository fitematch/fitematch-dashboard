'use client'

import { FiBriefcase } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { JobForm } from '@/components/jobs/job-form'

export default function JobCreatePage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="New job"
        description="Create a new job opportunity for recruiters."
        icon={FiBriefcase}
      />

      <JobForm />
    </div>
  )
}
