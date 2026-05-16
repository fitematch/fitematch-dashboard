import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

type BaseButtonProps = {
  variant?: ButtonVariant
  isLoading?: boolean
  children: ReactNode
  className?: string
}

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: false
  }

type LinkButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild: true
    href: string
  }

type ButtonProps = NativeButtonProps | LinkButtonProps

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-green-500 text-slate-950 hover:bg-green-400 disabled:bg-green-500/50',
  secondary:
    'border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 disabled:opacity-60',
  danger: 'bg-red-500 text-white hover:bg-red-400 disabled:bg-red-500/50',
  ghost: 'text-slate-300 hover:bg-slate-800 disabled:opacity-60',
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    isLoading = false,
    className,
    children,
  } = props

  const buttonClassName = cn(
    'inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
    variantClasses[variant],
    className,
  )

  if (props.asChild) {
    const {
      asChild,
      href,
      variant: variantProp,
      isLoading: isLoadingProp,
      className: classNameProp,
      children: childrenProp,
      ...linkProps
    } = props
    void asChild
    void variantProp
    void isLoadingProp
    void classNameProp
    void childrenProp

    return (
      <Link className={buttonClassName} href={href} {...linkProps}>
        {children}
      </Link>
    )
  }

  const {
    asChild,
    disabled,
    variant: variantProp,
    isLoading: loading,
    className: classNameProp,
    children: childrenProp,
    ...buttonProps
  } = props
  void asChild
  void variantProp
  void loading
  void classNameProp
  void childrenProp

  return (
    <button
      className={buttonClassName}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
