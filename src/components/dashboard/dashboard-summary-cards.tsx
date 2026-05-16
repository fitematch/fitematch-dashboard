import {
  FiBriefcase,
  FiFileText,
  FiUsers,
} from 'react-icons/fi'
import {
  FaBuilding
} from 'react-icons/fa';
import type { DashboardSummaryResponse } from '@/services/dashboard/dashboard.types'

import { DashboardSummaryCard } from './dashboard-summary-card'

type DashboardSummaryCardsProps = {
  summary: DashboardSummaryResponse | null
  isLoading?: boolean
}

export function DashboardSummaryCards({
  summary,
  isLoading = false,
}: DashboardSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <DashboardSummaryCard
        title="Users"
        total={summary?.users.total}
        lastWeek={summary?.users.lastWeek}
        icon={FiUsers}
        isLoading={isLoading}
      />

      <DashboardSummaryCard
        title="Companies"
        total={summary?.companies.total}
        lastWeek={summary?.companies.lastWeek}
        icon={FaBuilding}
        isLoading={isLoading}
      />

      <DashboardSummaryCard
        title="Jobs"
        total={summary?.jobs.total}
        lastWeek={summary?.jobs.lastWeek}
        icon={FiBriefcase}
        isLoading={isLoading}
      />

      <DashboardSummaryCard
        title="Applications"
        total={summary?.applications.total}
        lastWeek={summary?.applications.lastWeek}
        icon={FiFileText}
        isLoading={isLoading}
      />
    </div>
  )
}
