'use client'

import { useParams } from 'next/navigation'
import { FaBuilding } from 'react-icons/fa'

import { CompanyForm } from '@/components/companies/company-form'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { PageState } from '@/components/ui/page-state'
import { useCompany } from '@/hooks/use-company'

export default function CompanyEditPage() {
  const params = useParams<{ companyId: string }>()
  const { company, isLoading, error } = useCompany(params.companyId)

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Edit company"
        description="Update company information, status and moderation details."
        icon={FaBuilding}
      />

      <PageState
        isLoading={isLoading}
        error={error}
        isEmpty={!company}
        emptyTitle="Company not found"
        emptyDescription="The requested company could not be found."
      >
        {company ? <CompanyForm company={company} /> : null}
      </PageState>
    </div>
  )
}
