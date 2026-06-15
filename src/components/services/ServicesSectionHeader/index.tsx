import React from 'react'

type ServicesSectionHeaderProps = {
  overline?: string | null
}

export const ServicesSectionHeader: React.FC<ServicesSectionHeaderProps> = ({ overline }) => {
  if (!overline) return null

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <div aria-hidden className="h-px flex-1 bg-warm-border/60" />
      <p className="shrink-0 font-sans text-xs font-medium uppercase tracking-[0.16em] text-warm-gray">
        {overline}
      </p>
      <div aria-hidden className="h-px flex-1 bg-warm-border/60" />
    </div>
  )
}
