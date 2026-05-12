import { Badge } from '@/components/ui/badge'
import type { Company } from '@/types/entities/company.entity'

type CompanyTableProps = {
  companies: Company[]
}

export function CompanyTable({ companies }: CompanyTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-800 md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Document</th>
            <th className="px-4 py-3 font-medium">Website</th>
            <th className="px-4 py-3 font-medium">Status</th>
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
                {company.website ?? '-'}
              </td>
              <td className="px-4 py-3">
                <Badge variant="neutral">{company.status ?? 'unknown'}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
