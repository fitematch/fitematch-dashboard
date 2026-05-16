import { ResourceActions } from '@/components/dashboard/resource-actions'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants/routes'
import type { Job } from '@/types/entities/job.entity'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type JobTableProps = {
  jobs: Job[]
  onDelete: (job: Job) => void
}

export function JobTable({ jobs, onDelete }: JobTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-800 md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="w-1 px-4 py-3 text-left font-medium whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="px-4 py-3 text-slate-100">{job.title}</td>
              <td className="px-4 py-3 text-slate-400">
                {job.companyName ?? '-'}
              </td>
              <td className="px-4 py-3 text-slate-400">
                {job.location ?? '-'}
              </td>
              <td className="px-4 py-3">
                <Badge variant={getStatusBadgeVariant(job.status)}>
                  {(job.status ?? 'unknown').toUpperCase()}
                </Badge>
              </td>
              <td className="w-1 px-4 py-3 text-right whitespace-nowrap">
                <ResourceActions
                  editHref={`${ROUTES.dashboard.jobs}/${job.id}`}
                  deleteLabel={`Delete ${job.title}`}
                  onDelete={() => onDelete(job)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
