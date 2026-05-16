'use client'

import { Button } from './button'
import { Modal } from './modal'

type ConfirmModalVariant = 'danger' | 'primary'

type ConfirmModalProps = {
  isOpen: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ConfirmModalVariant
  isLoading?: boolean
  onConfirm: () => void | Promise<void>
  onClose: () => void
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      onClose={onClose}
    >
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          disabled={isLoading}
          onClick={onClose}
          type="button"
          variant="secondary"
        >
          {cancelLabel}
        </Button>

        <Button
          isLoading={isLoading}
          onClick={onConfirm}
          type="button"
          variant={variant === 'danger' ? 'danger' : 'primary'}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
