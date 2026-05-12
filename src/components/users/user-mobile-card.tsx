import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { User } from '@/types/entities/user.entity'

type UserMobileCardProps = {
  user: User
}

export function UserMobileCard({ user }: UserMobileCardProps) {
  return (
    <Card className="md:hidden">
      <CardContent>
        <p className="font-semibold text-slate-100">{user.name}</p>
        <p className="mt-1 text-sm text-slate-400">{user.email}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="neutral">{user.productRole ?? 'no product role'}</Badge>
          <Badge variant="neutral">{user.adminRole ?? 'no admin role'}</Badge>
          <Badge variant="neutral">{user.status ?? 'unknown'}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
