import { SiteFooter } from '@/components/layout/SiteFooter'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Footer() {
  const [footer, siteSettings] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  return <SiteFooter footer={footer} siteSettings={siteSettings} />
}
