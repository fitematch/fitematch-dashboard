import { ResourceActions } from '@/components/dashboard/resource-actions'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import type { Application } from '@/types/entities/application.entity'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type ApplicationMobileCardProps = {
  application: Application
  onDelete: (application: Application) => void
}

export function ApplicationMobileCard({
  application,
  onDelete,
}: ApplicationMobileCardProps) {
  return (
    <Card className="md:hidden">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-100">
              {application.userName ?? 'No candidate'}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {application.userEmail ?? 'No email'}
            </p>
          </div>

          <ResourceActions
            editHref={`${ROUTES.dashboard.applications}/${application.id}`}
            deleteLabel={`Delete application ${application.id}`}
            onDelete={() => onDelete(application)}
          />
        </div>

        <div className="mt-4 space-y-1 text-sm text-slate-400">
          <p>{application.jobTitle ?? 'No job'}</p>
          <p>{application.companyName ?? 'No company'}</p>
        </div>

        <div className="mt-4">
          <Badge variant={getStatusBadgeVariant(application.status)}>
            {(application.status ?? 'unknown').toUpperCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
