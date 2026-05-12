'use client'

import { CompanyMobileCard } from '@/components/companies/company-mobile-card'
import { CompanyTable } from '@/components/companies/company-table'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { useCompanies } from '@/hooks/use-companies'

export default function CompaniesPage() {
  const { companies, isLoading, error } = useCompanies()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Companies"
        description="Manage gyms, studios and recruiter companies."
      />

      {error ? <Alert variant="danger">{error}</Alert> : null}

      {isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : companies.length === 0 ? (
        <EmptyState
          title="No companies found"
          description="Companies will appear here when recruiters create them."
        />
      ) : (
        <>
          <CompanyTable companies={companies} />

          <div className="space-y-4 md:hidden">
            {companies.map((company, index) => (
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
