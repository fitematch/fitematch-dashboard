import { ResourceActions } from '@/components/dashboard/resource-actions'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants/routes'
import type { User } from '@/types/entities/user.entity'
import { getAgeFromDate } from '@/utils/age.utils'
import { format, isValid, parseISO } from 'date-fns'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type UserTableProps = {
  users: User[]
  onDelete: (user: User) => void
}

export function UserTable({ users, onDelete }: UserTableProps) {
  function getBirthDate(user: User) {
    return user.birthday ?? user.birthDate ?? user.dateOfBirth ?? null
  }

  function formatShortBirthDate(value?: string | null) {
    if (!value) {
      return '-'
    }

    const date = parseISO(value)

    if (!isValid(date)) {
      return '-'
    }

    return format(date, 'dd/MM/yy')
  }

  function getRoleLabel(user: User) {
    return [user.productRole, user.adminRole].filter(Boolean).join(' / ') || '-'
  }

  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-800 md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Age</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Birthday</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="w-1 px-4 py-3 text-left font-medium whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {users.map((user, index) => (
            <tr key={`${user.id}-${user.email}-${index}`}>
              <td className="px-4 py-3 text-slate-100">{user.name}</td>
              <td className="px-4 py-3 text-slate-400">{user.email}</td>
              <td className="px-4 py-3 text-slate-400">
                {getAgeFromDate(getBirthDate(user)) ?? '-'}
              </td>
              <td className="px-4 py-3 text-slate-400">
                {getRoleLabel(user)}
              </td>
              <td className="px-4 py-3 text-slate-400">
                {formatShortBirthDate(getBirthDate(user))}
              </td>
              <td className="px-4 py-3">
                <Badge variant={getStatusBadgeVariant(user.status)}>
                  {(user.status ?? 'unknown').toUpperCase()}
                </Badge>
              </td>
              <td className="w-1 px-4 py-3 text-right whitespace-nowrap">
                <ResourceActions
                  editHref={`${ROUTES.dashboard.users}/${user.id}`}
                  deleteLabel={`Delete ${user.name}`}
                  onDelete={() => onDelete(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
