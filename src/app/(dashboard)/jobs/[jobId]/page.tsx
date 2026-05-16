'use client'

import { useParams } from 'next/navigation'
import { FiBriefcase } from 'react-icons/fi'

import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { JobForm } from '@/components/jobs/job-form'
import { PageState } from '@/components/ui/page-state'
import { useJob } from '@/hooks/use-job'

export default function JobEditPage() {
  const params = useParams<{ jobId: string }>()
  const { job, isLoading, error } = useJob(params.jobId)

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Edit job"
        description="Update job information, status and moderation details."
        icon={FiBriefcase}
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={!job}
        emptyTitle="Job not found"
        emptyDescription="The requested job could not be found."
      >
        {job ? <JobForm job={job} /> : null}
      </PageState>
    </div>
  )
}
