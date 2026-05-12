import type { ReactNode } from 'react'

import { Alert } from './alert'
import { EmptyState } from './empty-state'
import { Skeleton } from './skeleton'

type PageStateProps = {
  isLoading?: boolean
  error?: string | null
  isEmpty?: boolean
  emptyTitle?: string
  emptyDescription?: string
  children: ReactNode
}

export function PageState({
  isLoading = false,
  error,
  isEmpty = false,
  emptyTitle = 'No data found',
  emptyDescription,
  children,
}: PageStateProps) {
  if (isLoading) {
    return <Skeleton className="h-80 w-full" />
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  if (isEmpty) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    )
  }

  return children
}