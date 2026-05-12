import { Badge } from '@/components/ui/badge'
import type { Job } from '@/types/entities/job.entity'

type JobTableProps = {
  jobs: Job[]
}

export function JobTable({ jobs }: JobTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-800 md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {jobs.map((job, index) => (
            <tr key={`${job.id}-${job.companyId ?? job.companyName ?? 'job'}-${index}`}>
              <td className="px-4 py-3 text-slate-100">{job.title}</td>
              <td className="px-4 py-3 text-slate-400">
                {job.companyName ?? '-'}
              </td>
              <td className="px-4 py-3 text-slate-400">
                {job.location ?? '-'}
              </td>
              <td className="px-4 py-3">
                <Badge variant="neutral">{job.status ?? 'unknown'}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
