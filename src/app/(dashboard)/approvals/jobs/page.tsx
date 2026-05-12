'use client'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { JobMobileCard } from '@/components/jobs/job-mobile-card'
import { JobTable } from '@/components/jobs/job-table'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
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

      {error ? <Alert variant="danger">{error}</Alert> : null}

      {isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : pendingJobs.length === 0 ? (
        <EmptyState
          title="No pending jobs"
          description="Pending job approvals will appear here."
        />
      ) : (
        <>
          <JobTable jobs={pendingJobs} />

          <div className="space-y-4 md:hidden">
            {pendingJobs.map((job, index) => (
              <JobMobileCard
                key={`${job.id}-${job.companyId ?? job.companyName ?? 'job'}-${index}`}
                job={job}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
