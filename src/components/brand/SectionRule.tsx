import { cn } from '@/utilities/ui'
import React from 'react'

import { SectionLabel } from './SectionLabel'

export type SectionRuleProps = {
  label: string
  className?: string
}

export const SectionRule: React.FC<SectionRuleProps> = ({ className, label }) => {
  return (
    <div className={cn('flex items-center gap-4 md:gap-6', className)}>
      <div aria-hidden className="h-px flex-1 bg-blush/30" />
      <SectionLabel className="shrink-0">{label}</SectionLabel>
      <div aria-hidden className="h-px flex-1 bg-blush/30" />
    </div>
  )
}
