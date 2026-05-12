import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header'
import { Alert } from '@/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Settings"
        description="Dashboard settings and administrative configuration."
      />

      <Alert variant="info">
        Settings integration will be connected when the backend supports
        dashboard configuration endpoints.
      </Alert>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-100">
            System configuration
          </h2>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 text-sm text-slate-400">
            <p>
              Future settings:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Dashboard preferences</li>
              <li>Email templates</li>
              <li>Administrative permissions</li>
              <li>Approval rules</li>
              <li>Moderation configuration</li>
              <li>Notification settings</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}