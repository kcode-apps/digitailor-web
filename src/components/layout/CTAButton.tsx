import { cn } from '@/utilities/ui'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type CTAButtonBaseProps = {
  label: string
  variant?: 'primary' | 'accent'
  className?: string
  showArrow?: boolean
}

type CTAButtonLinkProps = CTAButtonBaseProps & {
  href: string
  newTab?: boolean | null
  onClick?: never
}

type CTAButtonActionProps = CTAButtonBaseProps & {
  href?: never
  newTab?: never
  onClick: () => void
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-haspopup' | 'aria-controls' | 'aria-expanded'>

export type CTAButtonProps = CTAButtonLinkProps | CTAButtonActionProps

const buttonClassName = (
  variant: CTAButtonBaseProps['variant'],
  className?: string,
) =>
  cn(
    'inline-flex items-center gap-2 rounded-sm border px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.12em] transition-gentle',
    variant === 'primary' &&
      'border-charcoal bg-charcoal text-off-white hover:border-blush hover:bg-charcoal/95',
    variant === 'accent' &&
      'border-blush/35 bg-cream text-charcoal hover:border-blush hover:bg-blush/10',
    className,
  )

export const CTAButton: React.FC<CTAButtonProps> = ({
  label,
  newTab,
  variant = 'primary',
  className,
  showArrow = true,
  ...props
}) => {
  const content = (
    <>
      {label}
      {showArrow && <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.5} />}
    </>
  )

  if ('onClick' in props && props.onClick) {
    const { onClick, 'aria-controls': ariaControls, 'aria-expanded': ariaExpanded, 'aria-haspopup': ariaHaspopup } =
      props

    return (
      <button
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
        className={buttonClassName(variant, className)}
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    )
  }

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {}

  return (
    <Link className={buttonClassName(variant, className)} href={props.href} {...newTabProps}>
      {content}
    </Link>
  )
}
