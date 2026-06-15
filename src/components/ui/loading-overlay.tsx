import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utilities/ui'

export type LoadingOverlayScope = 'inline' | 'section' | 'page' | 'viewport'

export type LoadingOverlayProps = {
  className?: string
  label?: string
  /** Omit to always render (e.g. Suspense fallbacks). Set false to hide. */
  open?: boolean
  scope?: LoadingOverlayScope
}

const indicatorSizeClasses = {
  md: 'size-6',
  lg: 'size-10',
} as const

function LoadingIndicator({
  label,
  size,
}: {
  label: string
  size: keyof typeof indicatorSizeClasses
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Loader2
        aria-hidden
        className={cn('animate-spin text-charcoal', indicatorSizeClasses[size])}
      />
      <p className="text-warm-gray text-sm">{label}</p>
    </div>
  )
}

function OverlayPanel({
  children,
  className,
  label,
}: {
  children: React.ReactNode
  className?: string
  label: string
}) {
  return (
    <div
      aria-busy="true"
      aria-label={label}
      aria-live="polite"
      className={className}
      role="status"
    >
      {children}
    </div>
  )
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  className,
  label = 'Loading',
  open,
  scope = 'inline',
}) => {
  if (open === false) {
    return null
  }

  if (scope === 'viewport') {
    return (
      <OverlayPanel
        className={cn(
          'fixed inset-0 z-[200] flex items-center justify-center bg-beige/50 backdrop-blur-[2px]',
          className,
        )}
        label={label}
      >
        <div className="rounded-lg border border-warm-border/60 bg-beige/95 px-8 py-6 shadow-sm">
          <LoadingIndicator label={label} size="lg" />
        </div>
      </OverlayPanel>
    )
  }

  if (scope === 'page') {
    return (
      <div className={cn('relative min-h-[50vh] w-full py-24', className)}>
        <OverlayPanel
          className="absolute inset-0 flex items-center justify-center bg-beige/60 backdrop-blur-[1px]"
          label={label}
        >
          <LoadingIndicator label={label} size="lg" />
        </OverlayPanel>
      </div>
    )
  }

  if (scope === 'section') {
    return (
      <div className={cn('relative min-h-20 w-full', className)}>
        <OverlayPanel
          className="absolute inset-0 flex items-center justify-center bg-beige/70 backdrop-blur-[1px]"
          label={label}
        >
          <LoadingIndicator label={label} size="md" />
        </OverlayPanel>
      </div>
    )
  }

  return (
    <OverlayPanel
      className={cn(
        'pointer-events-auto absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-beige/70 backdrop-blur-[1px]',
        className,
      )}
      label={label}
    >
      <LoadingIndicator label={label} size="md" />
    </OverlayPanel>
  )
}
