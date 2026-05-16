import { ResourceActions } from '@/components/dashboard/resource-actions'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants/routes'
import type { Application } from '@/types/entities/application.entity'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type ApplicationTableProps = {
  applications: Application[]
  onDelete: (application: Application) => void
}

export function ApplicationTable({
  applications,
  onDelete,
}: ApplicationTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-800 md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Candidate</th>
            <th className="px-4 py-3 font-medium">Job</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="w-1 px-4 py-3 text-left font-medium whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="px-4 py-3">
                <p className="text-slate-100">
                  {application.userName ?? '-'}
                </p>
                <p className="text-xs text-slate-500">
                  {application.userEmail ?? '-'}
                </p>
              </td>

              <td className="px-4 py-3 text-slate-400">
                {application.jobTitle ?? '-'}
              </td>

              <td className="px-4 py-3 text-slate-400">
                {application.companyName ?? '-'}
              </td>

              <td className="px-4 py-3">
                <Badge variant={getStatusBadgeVariant(application.status)}>
                  {(application.status ?? 'unknown').toUpperCase()}
                </Badge>
              </td>

              <td className="w-1 px-4 py-3 text-right whitespace-nowrap">
                <ResourceActions
                  editHref={`${ROUTES.dashboard.applications}/${application.id}`}
                  deleteLabel={`Delete application ${application.id}`}
                  onDelete={() => onDelete(application)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
