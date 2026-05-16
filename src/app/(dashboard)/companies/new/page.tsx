'use client'

import { FaBuilding } from 'react-icons/fa'

import { CompanyForm } from '@/components/companies/company-form'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'

export default function CompanyCreatePage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="New company"
        description="Create a new company profile for recruiters."
        icon={FaBuilding}
      />

      <CompanyForm />
    </div>
  )
}
