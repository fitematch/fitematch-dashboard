'use client'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { JobMobileCard } from '@/components/jobs/job-mobile-card'
import { JobTable } from '@/components/jobs/job-table'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { useJobs } from '@/hooks/use-jobs'

export default function JobsPage() {
  const { jobs, isLoading, error } = useJobs()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Jobs"
        description="Manage job opportunities published by recruiters."
      />

      {error ? <Alert variant="danger">{error}</Alert> : null}

      {isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No jobs found"
          description="Jobs will appear here when recruiters create them."
        />
      ) : (
        <>
          <JobTable jobs={jobs} />

          <div className="space-y-4 md:hidden">
            {jobs.map((job, index) => (
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
