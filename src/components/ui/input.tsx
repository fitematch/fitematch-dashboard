import type { InputHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  helperText?: string
}

export function Input({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="block space-y-2">
      {label ? (
        <span className="text-sm font-medium text-slate-200">{label}</span>
      ) : null}

      <input
        id={inputId}
        className={cn(
          'h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
          className,
        )}
        {...props}
      />

      {error ? <span className="text-sm text-red-400">{error}</span> : null}
      {!error && helperText ? (
        <span className="text-sm text-slate-400">{helperText}</span>
      ) : null}
    </label>
  )
}
