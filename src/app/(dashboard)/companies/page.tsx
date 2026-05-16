'use client'

import { useState } from 'react'
import { FaBuilding } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'

import { CompanyMobileCard } from '@/components/companies/company-mobile-card'
import { CompanyTable } from '@/components/companies/company-table'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { PageState } from '@/components/ui/page-state'
import { ROUTES } from '@/constants/routes'
import { useCompanies } from '@/hooks/use-companies'
import { companyService } from '@/services/companies/company.service'
import type { Company } from '@/types/entities/company.entity'

export default function CompaniesPage() {
  const { companies, isLoading, error } = useCompanies()
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteCompany() {
    if (!selectedCompany) {
      return
    }

    try {
      setIsDeleting(true)

      await companyService.delete(selectedCompany.id)

      window.location.reload()
    } finally {
      setIsDeleting(false)
      setSelectedCompany(null)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Companies"
        description="Manage gyms, studios and recruiter companies."
        icon={FaBuilding}
      />

      <div className="flex justify-end">
        <Button asChild href={`${ROUTES.dashboard.companies}/new`}>
          <FiPlus className="h-4 w-4" />
          Add company
        </Button>
      </div>

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={companies.length === 0}
        emptyTitle="No companies found"
        emptyDescription="Companies will appear here when recruiters create them."
      >
        <CompanyTable companies={companies} onDelete={setSelectedCompany} />

        <div className="space-y-4 md:hidden">
          {companies.map((company, index) => (
            <CompanyMobileCard
              key={`${company.id}-${company.document ?? company.name}-${index}`}
              company={company}
              onDelete={setSelectedCompany}
            />
          ))}
        </div>
      </PageState>

      <ConfirmModal
        isOpen={Boolean(selectedCompany)}
        title="Delete company"
        description={`Are you sure you want to delete ${
          selectedCompany?.name ?? 'this company'
        }? This action cannot be undone.`}
        confirmLabel="Delete company"
        isLoading={isDeleting}
        onClose={() => setSelectedCompany(null)}
        onConfirm={handleDeleteCompany}
      />
    </div>
  )
}
