import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Company } from '@/types/entities/company.entity'

type CompanyMobileCardProps = {
  company: Company
}

export function CompanyMobileCard({ company }: CompanyMobileCardProps) {
  return (
    <Card className="md:hidden">
      <CardContent>
        <p className="font-semibold text-slate-100">{company.name}</p>

        <p className="mt-1 text-sm text-slate-400">
          {company.document ?? 'No document'}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="neutral">{company.status ?? 'unknown'}</Badge>

          {company.website ? (
            <Badge variant="info">{company.website}</Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
