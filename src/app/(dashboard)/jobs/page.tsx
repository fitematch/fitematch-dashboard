'use client'

import { useState } from 'react'
import { FiBriefcase, FiPlus } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { JobMobileCard } from '@/components/jobs/job-mobile-card'
import { JobTable } from '@/components/jobs/job-table'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { PageState } from '@/components/ui/page-state'
import { ROUTES } from '@/constants/routes'
import { useJobs } from '@/hooks/use-jobs'
import { jobService } from '@/services/jobs/job.service'
import type { Job } from '@/types/entities/job.entity'

export default function JobsPage() {
  const { jobs, isLoading, error } = useJobs()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteJob() {
    if (!selectedJob) {
      return
    }

    try {
      setIsDeleting(true)

      await jobService.delete(selectedJob.id)

      window.location.reload()
    } finally {
      setIsDeleting(false)
      setSelectedJob(null)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Jobs"
        description="Manage job opportunities published by recruiters."
        icon={FiBriefcase}
      />

      <div className="flex justify-end">
        <Button asChild href={`${ROUTES.dashboard.jobs}/new`}>
          <FiPlus className="h-4 w-4" />
          Add job
        </Button>
      </div>

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={jobs.length === 0}
        emptyTitle="No jobs found"
        emptyDescription="Jobs will appear here when recruiters create them."
      >
        <JobTable jobs={jobs} onDelete={setSelectedJob} />

        <div className="space-y-4 md:hidden">
          {jobs.map((job) => (
            <JobMobileCard
              key={job.id}
              job={job}
              onDelete={setSelectedJob}
            />
          ))}
        </div>
      </PageState>

      <ConfirmModal
        isOpen={Boolean(selectedJob)}
        title="Delete job"
        description={`Are you sure you want to delete ${
          selectedJob?.title ?? 'this job'
        }? This action cannot be undone.`}
        confirmLabel="Delete job"
        isLoading={isDeleting}
        onClose={() => setSelectedJob(null)}
        onConfirm={handleDeleteJob}
      />
    </div>
  )
}
