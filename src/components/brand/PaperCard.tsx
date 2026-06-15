import { cn } from '@/utilities/ui'
import React from 'react'

export type PaperCardProps<T extends React.ElementType = 'div'> = {
  as?: T
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function PaperCard<T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  hover = false,
}: PaperCardProps<T>) {
  const Component = as || 'div'

  return (
    <Component
      className={cn(
        'paper-card overflow-hidden',
        hover && 'transition-gentle hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgb(26_26_26_/0.06)]',
        className,
      )}
    >
      {children}
    </Component>
  )
}
