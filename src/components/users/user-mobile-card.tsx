import { ResourceActions } from '@/components/dashboard/resource-actions'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import type { User } from '@/types/entities/user.entity'
import { getAgeFromDate } from '@/utils/age.utils'
import { format, isValid, parseISO } from 'date-fns'
import { getStatusBadgeVariant } from '@/utils/status-badge'

type UserMobileCardProps = {
  user: User
  onDelete: (user: User) => void
}

export function UserMobileCard({ user, onDelete }: UserMobileCardProps) {
  const birthDate = user.birthday ?? user.birthDate ?? user.dateOfBirth ?? null
  const age = getAgeFromDate(birthDate)
  const roleLabel = [user.productRole, user.adminRole].filter(Boolean).join(' / ') || '-'

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

  return (
    <Card className="md:hidden">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-100">{user.name}</p>
            <p className="mt-1 text-sm text-slate-400">{user.email}</p>
            <p className="mt-2 text-xs text-slate-500">
              {`Age: ${age ?? '-'} | Birthday: ${formatShortBirthDate(birthDate)}`}
            </p>
          </div>

          <ResourceActions
            editHref={`${ROUTES.dashboard.users}/${user.id}`}
            deleteLabel={`Delete ${user.name}`}
            onDelete={() => onDelete(user)}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="neutral">{roleLabel}</Badge>
          <Badge variant={getStatusBadgeVariant(user.status)}>
            {(user.status ?? 'unknown').toUpperCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
