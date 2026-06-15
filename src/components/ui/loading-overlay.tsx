import * as React from 'react'

import { BrandLoader } from '@/components/brand/BrandLoader'
import { cn } from '@/utilities/ui'

export type LoadingOverlayScope = 'inline' | 'section' | 'page' | 'viewport'

export type LoadingOverlayProps = {
  className?: string
  /** Screen-reader label only — no visible loading copy. */
  label?: string
  /** Omit to always render (e.g. Suspense fallbacks). Set false to hide. */
  open?: boolean
  scope?: LoadingOverlayScope
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
  label = 'Loading page',
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
          'fixed inset-0 z-[200] flex items-center justify-center bg-cream/55 backdrop-blur-[3px]',
          className,
        )}
        label={label}
      >
        <BrandLoader size="lg" />
      </OverlayPanel>
    )
  }

  if (scope === 'page') {
    return (
      <div className={cn('relative min-h-[50vh] w-full py-24', className)}>
        <OverlayPanel
          className="absolute inset-0 flex items-center justify-center bg-cream/50 backdrop-blur-[2px]"
          label={label}
        >
          <BrandLoader size="lg" />
        </OverlayPanel>
      </div>
    )
  }

  if (scope === 'section') {
    return (
      <div className={cn('relative min-h-20 w-full', className)}>
        <OverlayPanel
          className="absolute inset-0 flex items-center justify-center bg-cream/60 backdrop-blur-[1px]"
          label={label}
        >
          <BrandLoader size="md" />
        </OverlayPanel>
      </div>
    )
  }

  return (
    <OverlayPanel
      className={cn(
        'pointer-events-auto absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-cream/65 backdrop-blur-[1px]',
        className,
      )}
      label={label}
    >
      <BrandLoader size="md" />
    </OverlayPanel>
  )
}
