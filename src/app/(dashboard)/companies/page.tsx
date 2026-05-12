'use client'

import { CompanyMobileCard } from '@/components/companies/company-mobile-card'
import { CompanyTable } from '@/components/companies/company-table'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { PageState } from '@/components/ui/page-state'
import { useCompanies } from '@/hooks/use-companies'

export default function CompaniesPage() {
  const { companies, isLoading, error } = useCompanies()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Companies"
        description="Manage gyms, studios and recruiter companies."
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={companies.length === 0}
        emptyTitle="No companies found"
        emptyDescription="Companies will appear here when recruiters create them."
      >
        <CompanyTable companies={companies} />

        <div className="space-y-4 md:hidden">
          {companies.map((company) => (
            <CompanyMobileCard key={company.id} company={company} />
          ))}
        </div>
      </PageState>
    </div>
  )
}