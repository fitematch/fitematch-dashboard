'use client'

import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import { Button } from '@/components/ui/button'

type ResourceActionsProps = {
  editHref: string
  deleteLabel?: string
  onDelete: () => void
}

export function ResourceActions({
  editHref,
  deleteLabel = 'Delete',
  onDelete,
}: ResourceActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        asChild
        aria-label="Edit"
        className="h-9 px-3"
        href={editHref}
        variant="secondary"
      >
        <FiEdit2 className="h-4 w-4" />
      </Button>

      <Button
        aria-label={deleteLabel}
        className="h-9 px-3"
        onClick={onDelete}
        type="button"
        variant="danger"
      >
        <FiTrash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
