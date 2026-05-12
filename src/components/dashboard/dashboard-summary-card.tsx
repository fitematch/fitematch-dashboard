import type { IconType } from 'react-icons'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type DashboardSummaryCardProps = {
  title: string
  total?: number
  lastWeek?: number
  icon: IconType
  isLoading?: boolean
}

export function DashboardSummaryCard({
  title,
  total,
  lastWeek,
  icon: Icon,
  isLoading = false,
}: DashboardSummaryCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-400">{title}</p>

            <p className="mt-3 text-3xl font-bold text-slate-50">
              {total ?? 0}
            </p>

            <p className="mt-2 text-sm text-green-400">
              +{lastWeek ?? 0} last week
            </p>
          </div>

          <div className="rounded-2xl bg-green-500/10 p-3 text-green-300">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
