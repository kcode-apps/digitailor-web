'use client'

import type { Header, SiteSetting } from '@/payload-types'

import { CTAButton } from '@/components/layout/CTAButton'
import { NavLink } from '@/components/layout/NavLink'
import { SiteLogo } from '@/components/layout/SiteLogo'
import { resolveLinkProps } from '@/lib/cms/resolveLink'
import { cn } from '@/utilities/ui'
import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'

type SiteHeaderProps = {
  header: Header
  siteSettings: SiteSetting
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ header, siteSettings }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const siteName = siteSettings.siteName
  const siteTagline = siteSettings.siteTagline
  const navItems = header.navItems || []
  const primaryCta = resolveLinkProps(siteSettings.primaryCta)

  return (
    <header className="sticky top-0 z-50 border-b border-warm-border/60 bg-beige/95 backdrop-blur-sm">
      <div className="container">
        <div className="flex h-20 items-center justify-between gap-6">
          <SiteLogo siteName={siteName} siteTagline={siteTagline} />

          <nav
            aria-label="Main navigation"
            className="hidden flex-1 items-center justify-center gap-8 lg:flex"
          >
            {navItems.map(({ link, id }) => {
              const resolved = resolveLinkProps(link)
              if (!resolved) return null

              return (
                <NavLink
                  key={id || resolved.href}
                  href={resolved.href}
                  label={resolved.label || ''}
                  newTab={resolved.newTab}
                />
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            {primaryCta && (
              <CTAButton
                className="hidden sm:inline-flex"
                href={primaryCta.href}
                label={primaryCta.label || ''}
                newTab={primaryCta.newTab}
              />
            )}

            <button
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex items-center justify-center p-2 text-charcoal lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              type="button"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <nav
          className={cn(
            'border-t border-warm-border/60 py-4 lg:hidden',
            mobileOpen ? 'block' : 'hidden',
          )}
        >
          <ul className="flex flex-col gap-4">
            {navItems.map(({ link, id }) => {
              const resolved = resolveLinkProps(link)
              if (!resolved) return null

              return (
                <li key={id || resolved.href}>
                  <NavLink
                    href={resolved.href}
                    label={resolved.label || ''}
                    newTab={resolved.newTab}
                    onClick={() => setMobileOpen(false)}
                  />
                </li>
              )
            })}
            {primaryCta && (
              <li className="pt-2">
                <CTAButton
                  href={primaryCta.href}
                  label={primaryCta.label || ''}
                  newTab={primaryCta.newTab}
                />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
