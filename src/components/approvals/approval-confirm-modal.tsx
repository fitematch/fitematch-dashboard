'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

type ApprovalAction = 'approve' | 'reject'

type ApprovalConfirmModalProps = {
  isOpen: boolean
  action: ApprovalAction
  title: string
  description: string
  isLoading?: boolean
  onClose: () => void
  onConfirm: (reason?: string) => void | Promise<void>
}

export function ApprovalConfirmModal({
  isOpen,
  action,
  title,
  description,
  isLoading = false,
  onClose,
  onConfirm,
}: ApprovalConfirmModalProps) {
  const [reason, setReason] = useState('')

  const isReject = action === 'reject'

  async function handleConfirm() {
    await onConfirm(isReject ? reason : undefined)
    setReason('')
  }

  function handleClose() {
    setReason('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      onClose={handleClose}
    >
      <div className="space-y-4">
        {isReject ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Rejection reason
            </span>

            <textarea
              className="min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Optional reason shown internally or sent by email later."
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </label>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            disabled={isLoading}
            onClick={handleClose}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>

          <Button
            isLoading={isLoading}
            onClick={handleConfirm}
            type="button"
            variant={isReject ? 'danger' : 'primary'}
          >
            {isReject ? 'Reject' : 'Approve'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}