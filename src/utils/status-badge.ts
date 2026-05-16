import type { BadgeVariant } from '@/components/ui/badge'

export function getStatusBadgeVariant(status?: string | null): BadgeVariant {
  switch (status?.toLowerCase()) {
    case 'approved':
    case 'active':
    case 'published':
      return 'success'
    case 'inactive':
    case 'rejected':
    case 'blocked':
    case 'cancelled':
    case 'closed':
      return 'danger'
    case 'pending':
    case 'reviewing':
      return 'info'
    default:
      return 'neutral'
  }
}
