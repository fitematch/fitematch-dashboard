import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/cn'

type AlertVariant = 'success' | 'warning' | 'danger' | 'info'

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant
  title?: string
  children: ReactNode
}

const variantClasses: Record<AlertVariant, string> = {
  success: 'border-green-500/30 bg-green-500/10 text-green-100',
  warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-100',
  danger: 'border-red-500/30 bg-red-500/10 text-red-100',
  info: 'border-sky-500/30 bg-sky-500/10 text-sky-100',
}

export function Alert({
  variant = 'info',
  title,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      className={cn('rounded-2xl border p-4 text-sm', variantClasses[variant], className)}
      role="alert"
      {...props}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div>{children}</div>
    </div>
  )
}
