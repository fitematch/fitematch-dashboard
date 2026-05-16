import { ResourceActions } from '@/components/dashboard/resource-actions'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants/routes'
import type { Company } from '@/types/entities/company.entity'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type CompanyTableProps = {
  companies: Company[]
  onDelete: (company: Company) => void
}

export function CompanyTable({ companies, onDelete }: CompanyTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-800 md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Document</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">Website</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="w-1 px-4 py-3 text-left font-medium whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {companies.map((company, index) => (
            <tr key={`${company.id}-${company.document ?? company.name}-${index}`}>
              <td className="px-4 py-3 text-slate-100">{company.name}</td>
              <td className="px-4 py-3 text-slate-400">
                {company.document ?? '-'}
              </td>
              <td className="px-4 py-3 text-slate-400">
                {company.city && company.state
                  ? `${company.city}/${company.state}`
                  : company.city ?? company.state ?? '-'}
              </td>
              <td className="px-4 py-3 text-slate-400">
                {company.phone ?? '-'}
              </td>
              <td className="px-4 py-3 text-slate-400">
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-sky-300 hover:underline"
                  >
                    {company.website}
                  </a>
                ) : (
                  '-'
                )}
              </td>
              <td className="px-4 py-3">
                <Badge variant={getStatusBadgeVariant(company.status)}>
                  {(company.status ?? 'unknown').toUpperCase()}
                </Badge>
              </td>
              <td className="w-1 px-4 py-3 text-right whitespace-nowrap">
                <ResourceActions
                  editHref={`${ROUTES.dashboard.companies}/${company.id}`}
                  deleteLabel={`Delete ${company.name}`}
                  onDelete={() => onDelete(company)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
