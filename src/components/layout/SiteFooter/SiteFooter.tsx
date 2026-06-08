import type { Footer, SiteSetting } from '@/payload-types'

import { CTAButton } from '@/components/layout/CTAButton'
import { NavLink } from '@/components/layout/NavLink'
import { SiteLogo } from '@/components/layout/SiteLogo'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { siteDefaults } from '@/lib/cms/defaults'
import { resolveLinkProps } from '@/lib/cms/resolveLink'
import React from 'react'

type SiteFooterProps = {
  footer: Footer
  siteSettings: SiteSetting
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ footer, siteSettings }) => {
  const siteName = siteSettings.siteName || siteDefaults.siteName
  const siteTagline = siteSettings.siteTagline || siteDefaults.siteTagline
  const copyright = siteSettings.copyright || siteDefaults.copyright
  const navItems = footer.navItems || []
  const social = siteSettings.socialLinks

  return (
    <footer className="mt-auto bg-charcoal text-off-white">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          <SiteLogo
            className="[&_span:first-child]:text-off-white [&_span:last-child]:text-off-white/60"
            siteName={siteName}
            siteTagline={siteTagline}
          />

          <p className="font-sans text-xs text-off-white/70 md:text-center">{copyright}</p>

          <SocialLinks
            className="md:justify-end"
            email={social?.email}
            instagram={social?.instagram}
            linkedin={social?.linkedin}
          />
        </div>

        {navItems.length > 0 && (
          <nav
            aria-label="Footer navigation"
            className="mt-8 flex flex-wrap gap-6 border-t border-off-white/10 pt-8"
          >
            {navItems.map(({ link, id }) => {
              const resolved = resolveLinkProps(link)
              if (!resolved) return null

              return (
                <NavLink
                  key={id || resolved.href}
                  className="text-off-white/70 hover:text-off-white"
                  href={resolved.href}
                  label={resolved.label || ''}
                  newTab={resolved.newTab}
                />
              )
            })}
          </nav>
        )}
      </div>
    </footer>
  )
}
