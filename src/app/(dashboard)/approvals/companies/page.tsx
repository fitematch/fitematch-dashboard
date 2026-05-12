'use client'

import { CompanyMobileCard } from '@/components/companies/company-mobile-card'
import { CompanyTable } from '@/components/companies/company-table'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { PageState } from '@/components/ui/page-state'
import { useCompanies } from '@/hooks/use-companies'

export default function CompanyApprovalsPage() {
  const { companies, isLoading, error } = useCompanies()

  const pendingCompanies = companies.filter(
    (company) => company.status === 'pending',
  )

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Company approvals"
        description="Review and approve pending recruiter companies."
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={pendingCompanies.length === 0}
        emptyTitle="No pending companies"
        emptyDescription="Pending company approvals will appear here."
      >
        <CompanyTable companies={pendingCompanies} />

        <div className="space-y-4 md:hidden">
          {pendingCompanies.map((company) => (
            <CompanyMobileCard key={company.id} company={company} />
          ))}
        </div>
      </PageState>
    </div>
  )
}