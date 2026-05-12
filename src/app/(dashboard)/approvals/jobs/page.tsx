'use client'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { JobMobileCard } from '@/components/jobs/job-mobile-card'
import { JobTable } from '@/components/jobs/job-table'
import { PageState } from '@/components/ui/page-state'
import { useJobs } from '@/hooks/use-jobs'

export default function JobApprovalsPage() {
  const { jobs, isLoading, error } = useJobs()

  const pendingJobs = jobs.filter((job) => job.status === 'pending')

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Job approvals"
        description="Review and approve pending job opportunities."
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={pendingJobs.length === 0}
        emptyTitle="No pending jobs"
        emptyDescription="Pending job approvals will appear here."
      >
        <JobTable jobs={pendingJobs} />

        <div className="space-y-4 md:hidden">
          {pendingJobs.map((job) => (
            <JobMobileCard key={job.id} job={job} />
          ))}
        </div>
      </PageState>
    </div>
  )
}