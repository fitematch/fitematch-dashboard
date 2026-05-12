'use client'

import { Alert } from '@/components/ui/alert'
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { DashboardSummaryCards } from '@/components/dashboard/dashboard-summary-cards'
import { useDashboardSummary } from '@/hooks/use-dashboard-summary'

export default function DashboardPage() {
  const { summary, isLoading, error } = useDashboardSummary()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Dashboard"
        description="Administrative overview for fitematch."
      />

      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : null}

      <DashboardSummaryCards
        summary={summary}
        isLoading={isLoading}
      />
    </div>
  )
}