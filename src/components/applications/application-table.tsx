import { Badge } from '@/components/ui/badge'
import type { Application } from '@/types/entities/application.entity'

type ApplicationTableProps = {
  applications: Application[]
}

export function ApplicationTable({ applications }: ApplicationTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-800 md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Candidate</th>
            <th className="px-4 py-3 font-medium">Job</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {applications.map((application, index) => (
            <tr
              key={`${application.id}-${application.jobId ?? application.jobTitle ?? 'job'}-${application.userId ?? application.userEmail ?? 'user'}-${index}`}
            >
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
                <Badge variant="neutral">
                  {application.status ?? 'unknown'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
