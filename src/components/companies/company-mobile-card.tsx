import { ResourceActions } from '@/components/dashboard/resource-actions'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import type { Company } from '@/types/entities/company.entity'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type CompanyMobileCardProps = {
  company: Company
  onDelete: (company: Company) => void
}

export function CompanyMobileCard({
  company,
  onDelete,
}: CompanyMobileCardProps) {
  return (
    <Card className="md:hidden">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-100">{company.name}</p>

            <p className="mt-1 text-sm text-slate-400">
              {company.document ?? 'No document'}
            </p>
          </div>

          <ResourceActions
            editHref={`${ROUTES.dashboard.companies}/${company.id}`}
            deleteLabel={`Delete ${company.name}`}
            onDelete={() => onDelete(company)}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={getStatusBadgeVariant(company.status)}>
            {(company.status ?? 'unknown').toUpperCase()}
          </Badge>

          {company.city || company.state ? (
            <Badge variant="neutral">
              {company.city && company.state
                ? `${company.city}/${company.state}`
                : company.city ?? company.state}
            </Badge>
          ) : null}

          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-300 transition hover:bg-sky-500/20"
            >
              {company.website}
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
