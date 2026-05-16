'use client'

import { useState } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { ApprovalActionCard } from '@/components/approvals/approval-action-card'
import { ApprovalConfirmModal } from '@/components/approvals/approval-confirm-modal'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Badge } from '@/components/ui/badge'
import { PageState } from '@/components/ui/page-state'
import { useCompanies } from '@/hooks/use-companies'
import { companyService } from '@/services/companies/company.service'
import type { Company } from '@/types/entities/company.entity'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type ApprovalState = {
  company: Company
  action: 'approve' | 'reject'
} | null

export default function CompanyApprovalsPage() {
  const { companies, isLoading, error } = useCompanies()
  const [approval, setApproval] = useState<ApprovalState>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pendingCompanies = companies.filter(
    (company) => company.status === 'pending',
  )

  async function handleConfirm(reason?: string) {
    if (!approval) {
      return
    }

    try {
      setIsSubmitting(true)

      if (approval.action === 'approve') {
        await companyService.approve(approval.company.id)
      } else {
        await companyService.reject(approval.company.id, { reason })
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
        title="Company approvals"
        description="Review and approve pending recruiter companies."
        icon={FiCheckSquare}
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={pendingCompanies.length === 0}
        emptyTitle="No pending companies"
        emptyDescription="Pending company approvals will appear here."
      >
        <div className="grid gap-4">
          {pendingCompanies.map((company, index) => (
            <ApprovalActionCard
              key={`${company.id ?? company.document ?? company.name ?? 'company'}-${index}`}
              title={company.name}
              description={company.description}
              metadata={
                [
                  <Badge
                    key="document"
                    variant="neutral"
                  >
                    {company.document ?? 'No document'}
                  </Badge>,
                  <Badge
                    key="status"
                    variant={getStatusBadgeVariant(company.status)}
                  >
                    {(company.status ?? 'pending').toUpperCase()}
                  </Badge>,
                  company.website ? (
                    <Badge
                      key="website"
                      variant="info"
                    >
                      {company.website}
                    </Badge>
                  ) : null,
                ]
              }
              onApprove={() =>
                setApproval({
                  company,
                  action: 'approve',
                })
              }
              onReject={() =>
                setApproval({
                  company,
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
        title={
          approval?.action === 'reject'
            ? 'Reject company'
            : 'Approve company'
        }
        description={`Are you sure you want to ${
          approval?.action ?? 'approve'
        } ${approval?.company.name ?? 'this company'}?`}
        isLoading={isSubmitting}
        onClose={() => setApproval(null)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
