'use client'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { JobMobileCard } from '@/components/jobs/job-mobile-card'
import { JobTable } from '@/components/jobs/job-table'
import { PageState } from '@/components/ui/page-state'
import { useJobs } from '@/hooks/use-jobs'

export default function JobsPage() {
  const { jobs, isLoading, error } = useJobs()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Jobs"
        description="Manage job opportunities published by recruiters."
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={jobs.length === 0}
        emptyTitle="No jobs found"
        emptyDescription="Jobs will appear here when recruiters create them."
      >
        <JobTable jobs={jobs} />

        <div className="space-y-4 md:hidden">
          {jobs.map((job) => (
            <JobMobileCard key={job.id} job={job} />
          ))}
        </div>
      </PageState>
    </div>
  )
}