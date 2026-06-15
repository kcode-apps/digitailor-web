import { cn } from '@/utilities/ui'
import React from 'react'

const sizeClasses = {
  hero: 'text-4xl leading-[1.08] md:text-5xl lg:text-[3.35rem]',
  page: 'text-3xl leading-[1.12] md:text-4xl lg:text-5xl',
  section: 'text-3xl leading-[1.15] md:text-4xl lg:text-[2.75rem]',
  banner: 'text-2xl leading-[1.12] sm:text-3xl lg:text-4xl',
} as const

export type EditorialHeadlineProps = {
  accent?: string | null
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  lead: string
  size?: keyof typeof sizeClasses
  variant?: 'split' | 'serif'
}

export const EditorialHeadline: React.FC<EditorialHeadlineProps> = ({
  accent,
  as: Tag = 'h1',
  className,
  lead,
  size = 'page',
  variant = 'split',
}) => {
  if (variant === 'serif') {
    return (
      <Tag className={cn('font-serif text-charcoal', sizeClasses[size], className)}>
        {lead}
      </Tag>
    )
  }

  return (
    <Tag className={cn('text-charcoal', sizeClasses[size], className)}>
      <span className="font-sans font-semibold tracking-[-0.02em]">{lead}</span>
      {accent ? (
        <>
          {' '}
          <span className="font-serif font-normal italic text-charcoal">{accent}</span>
        </>
      ) : null}
    </Tag>
  )
}
