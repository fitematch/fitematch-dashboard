'use client'

import { CompanyMobileCard } from '@/components/companies/company-mobile-card'
import { CompanyTable } from '@/components/companies/company-table'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
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

      {error ? <Alert variant="danger">{error}</Alert> : null}

      {isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : pendingCompanies.length === 0 ? (
        <EmptyState
          title="No pending companies"
          description="Pending company approvals will appear here."
        />
      ) : (
        <>
          <CompanyTable companies={pendingCompanies} />

          <div className="space-y-4 md:hidden">
            {pendingCompanies.map((company, index) => (
              <CompanyMobileCard
                key={`${company.id}-${company.document ?? company.name}-${index}`}
                company={company}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
