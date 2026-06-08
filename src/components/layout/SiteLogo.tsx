import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

type SiteLogoProps = {
  siteName: string
  siteTagline?: string | null
  className?: string
}

export const SiteLogo: React.FC<SiteLogoProps> = ({ siteName, siteTagline, className }) => {
  return (
    <Link className={cn('group inline-flex flex-col leading-none', className)} href="/">
      <span className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-charcoal">
        {siteName}
      </span>
      {siteTagline && (
        <span className="mt-1 font-sans text-[0.65rem] uppercase tracking-[0.15em] text-warm-gray">
          {siteTagline}
        </span>
      )}
    </Link>
  )
}
