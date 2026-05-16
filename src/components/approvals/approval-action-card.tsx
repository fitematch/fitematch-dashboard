import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type ApprovalActionCardProps = {
  title: string
  description?: string | null
  metadata: ReactNode
  onApprove: () => void
  onReject: () => void
}

export function ApprovalActionCard({
  title,
  description,
  metadata,
  onApprove,
  onReject,
}: ApprovalActionCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">{title}</h2>

            {description ? (
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                {description}
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">{metadata}</div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button type="button" variant="secondary" onClick={onReject}>
              Reject
            </Button>

            <Button type="button" onClick={onApprove}>
              Approve
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}