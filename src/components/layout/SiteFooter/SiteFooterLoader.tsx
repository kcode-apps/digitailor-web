import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'
import { getCachedGlobal } from '@/lib/cms/queries'
import React from 'react'

export async function SiteFooterLoader() {
  const [footer, siteSettings] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  return <SiteFooter footer={footer} siteSettings={siteSettings} />
}
