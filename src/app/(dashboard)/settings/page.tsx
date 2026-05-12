import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Settings"
        description="Dashboard settings and administrative configuration."
      />

      <EmptyState
        title="Settings are not available yet"
        description="This area will be connected when the API supports dashboard settings."
      />
    </div>
  )
}