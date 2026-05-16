'use client'

import type { ReactNode } from 'react'
import { FiX } from 'react-icons/fi'

import { cn } from '@/utils/cn'

type ModalProps = {
  isOpen: boolean
  title: string
  description?: string
  children: ReactNode
  onClose: () => void
  className?: string
}

export function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  className,
}: ModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div
        className={cn(
          'relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">{title}</h2>

            {description ? (
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            ) : null}
          </div>

          <button
            aria-label="Close modal"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-900 hover:text-slate-100"
            onClick={onClose}
            type="button"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
