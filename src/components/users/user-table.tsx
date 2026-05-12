import { Badge } from '@/components/ui/badge'
import type { User } from '@/types/entities/user.entity'

type UserTableProps = {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-800 md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Product role</th>
            <th className="px-4 py-3 font-medium">Admin role</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {users.map((user, index) => (
            <tr key={`${user.id}-${user.email}-${index}`}>
              <td className="px-4 py-3 text-slate-100">{user.name}</td>
              <td className="px-4 py-3 text-slate-400">{user.email}</td>
              <td className="px-4 py-3 text-slate-400">
                {user.productRole ?? '-'}
              </td>
              <td className="px-4 py-3 text-slate-400">
                {user.adminRole ?? '-'}
              </td>
              <td className="px-4 py-3">
                <Badge variant="neutral">{user.status ?? 'unknown'}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
