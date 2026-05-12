import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Application } from '@/types/entities/application.entity'

type ApplicationMobileCardProps = {
  application: Application
}

export function ApplicationMobileCard({
  application,
}: ApplicationMobileCardProps) {
  return (
    <Card className="md:hidden">
      <CardContent>
        <p className="font-semibold text-slate-100">
          {application.userName ?? 'No candidate'}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          {application.userEmail ?? 'No email'}
        </p>

        <div className="mt-4 space-y-1 text-sm text-slate-400">
          <p>{application.jobTitle ?? 'No job'}</p>
          <p>{application.companyName ?? 'No company'}</p>
        </div>

        <div className="mt-4">
          <Badge variant="neutral">{application.status ?? 'unknown'}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
