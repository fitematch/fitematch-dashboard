'use client'

import { useState } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { ApprovalActionCard } from '@/components/approvals/approval-action-card'
import { ApprovalConfirmModal } from '@/components/approvals/approval-confirm-modal'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Badge } from '@/components/ui/badge'
import { PageState } from '@/components/ui/page-state'
import { useJobs } from '@/hooks/use-jobs'
import { jobService } from '@/services/jobs/job.service'
import type { Job } from '@/types/entities/job.entity'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type ApprovalState = {
  job: Job
  action: 'approve' | 'reject'
} | null

export default function JobApprovalsPage() {
  const { jobs, isLoading, error } = useJobs()
  const [approval, setApproval] = useState<ApprovalState>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pendingJobs = jobs.filter((job) => job.status === 'pending')

  async function handleConfirm(reason?: string) {
    if (!approval) {
      return
    }

    try {
      setIsSubmitting(true)

      if (approval.action === 'approve') {
        await jobService.approve(approval.job.id)
      } else {
        await jobService.reject(approval.job.id, { reason })
      }

      window.location.reload()
    } finally {
      setIsSubmitting(false)
      setApproval(null)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Job approvals"
        description="Review and approve pending job opportunities."
        icon={FiCheckSquare}
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={pendingJobs.length === 0}
        emptyTitle="No pending jobs"
        emptyDescription="Pending job approvals will appear here."
      >
        <div className="grid gap-4">
          {pendingJobs.map((job, index) => (
            <ApprovalActionCard
              key={`${job.id ?? job.title ?? 'job'}-${job.companyId ?? job.companyName ?? 'company'}-${index}`}
              title={job.title}
              description={job.description}
              metadata={
                [
                  <Badge
                    key="company"
                    variant="neutral"
                  >
                    {job.companyName ?? 'No company'}
                  </Badge>,
                  <Badge
                    key="status"
                    variant={getStatusBadgeVariant(job.status)}
                  >
                    {(job.status ?? 'pending').toUpperCase()}
                  </Badge>,
                  job.location ? (
                    <Badge
                      key="location"
                      variant="info"
                    >
                      {job.location}
                    </Badge>
                  ) : null,
                ]
              }
              onApprove={() =>
                setApproval({
                  job,
                  action: 'approve',
                })
              }
              onReject={() =>
                setApproval({
                  job,
                  action: 'reject',
                })
              }
            />
          ))}
        </div>
      </PageState>

      <ApprovalConfirmModal
        isOpen={Boolean(approval)}
        action={approval?.action ?? 'approve'}
        title={approval?.action === 'reject' ? 'Reject job' : 'Approve job'}
        description={`Are you sure you want to ${approval?.action ?? 'approve'} ${
          approval?.job.title ?? 'this job'
        }?`}
        isLoading={isSubmitting}
        onClose={() => setApproval(null)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
