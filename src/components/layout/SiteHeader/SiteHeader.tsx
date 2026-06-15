'use client'

import type { Form, Header, SiteSetting } from '@/payload-types'

import { CTAButton } from '@/components/layout/CTAButton'
import { DiscoveryCallModal } from '@/components/layout/DiscoveryCallModal'
import { NavLink } from '@/components/layout/NavLink'
import { SiteLogo } from '@/components/layout/SiteLogo'
import { resolveLinkProps } from '@/lib/cms/resolveLink'
import { cn } from '@/utilities/ui'
import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'

type SiteHeaderProps = {
  discoveryCallForm: Form | null
  header: Header
  siteSettings: SiteSetting
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  discoveryCallForm,
  header,
  siteSettings,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [discoveryModalOpen, setDiscoveryModalOpen] = useState(false)

  const siteName = siteSettings.siteName
  const siteTagline = siteSettings.siteTagline
  const navItems = header.navItems || []
  const primaryCtaLabel = siteSettings.primaryCtaLabel?.trim() || 'Book a discovery call'
  const modalDescription = siteSettings.discoveryCallModalDescription?.trim()

  const openDiscoveryModal = () => {
    setMobileOpen(false)
    setDiscoveryModalOpen(true)
  }

  const renderPrimaryCta = (className?: string) => {
    if (!discoveryCallForm) {
      return null
    }

    return (
      <CTAButton
        aria-haspopup="dialog"
        className={className}
        label={primaryCtaLabel}
        onClick={openDiscoveryModal}
      />
    )
  }

  return (
    <>
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
              {renderPrimaryCta('hidden sm:inline-flex')}

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
              {discoveryCallForm && <li className="pt-2">{renderPrimaryCta()}</li>}
            </ul>
          </nav>
        </div>
      </header>

      {discoveryCallForm && (
        <DiscoveryCallModal
          description={modalDescription}
          form={discoveryCallForm}
          onOpenChange={setDiscoveryModalOpen}
          open={discoveryModalOpen}
        />
      )}
    </>
  )
}
