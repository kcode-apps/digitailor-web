import { cn } from '@/utilities/ui'
import React from 'react'

export type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className }) => {
  return (
    <p
      className={cn(
        'font-sans text-xs font-medium uppercase tracking-[0.18em] text-blush',
        className,
      )}
    >
      {children}
    </p>
  )
}
