import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Job } from '@/types/entities/job.entity'

type JobMobileCardProps = {
  job: Job
}

export function JobMobileCard({ job }: JobMobileCardProps) {
  return (
    <Card className="md:hidden">
      <CardContent>
        <p className="font-semibold text-slate-100">{job.title}</p>

        <p className="mt-1 text-sm text-slate-400">
          {job.companyName ?? 'No company'}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="neutral">{job.status ?? 'unknown'}</Badge>

          {job.location ? (
            <Badge variant="info">{job.location}</Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
