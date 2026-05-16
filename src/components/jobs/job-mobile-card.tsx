import { ResourceActions } from '@/components/dashboard/resource-actions'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import type { Job } from '@/types/entities/job.entity'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type JobMobileCardProps = {
  job: Job
  onDelete: (job: Job) => void
}

export function JobMobileCard({ job, onDelete }: JobMobileCardProps) {
  return (
    <Card className="md:hidden">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-100">{job.title}</p>

            <p className="mt-1 text-sm text-slate-400">
              {job.companyName ?? 'No company'}
            </p>
          </div>

          <ResourceActions
            editHref={`${ROUTES.dashboard.jobs}/${job.id}`}
            deleteLabel={`Delete ${job.title}`}
            onDelete={() => onDelete(job)}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={getStatusBadgeVariant(job.status)}>
            {(job.status ?? 'unknown').toUpperCase()}
          </Badge>

          {job.location ? (
            <Badge variant="info">{job.location}</Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
