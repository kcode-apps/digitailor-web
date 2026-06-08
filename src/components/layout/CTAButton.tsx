import { cn } from '@/utilities/ui'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type CTAButtonProps = {
  href: string
  label: string
  newTab?: boolean | null
  variant?: 'primary' | 'accent'
  className?: string
  showArrow?: boolean
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  label,
  newTab,
  variant = 'primary',
  className,
  showArrow = true,
}) => {
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {}

  return (
    <Link
      className={cn(
        'inline-flex items-center gap-2 px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.12em] transition-colors',
        variant === 'primary' && 'bg-charcoal text-off-white hover:bg-charcoal/90',
        variant === 'accent' && 'bg-beige-dark text-charcoal hover:bg-beige',
        className,
      )}
      href={href}
      {...newTabProps}
    >
      {label}
      {showArrow && <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.5} />}
    </Link>
  )
}
