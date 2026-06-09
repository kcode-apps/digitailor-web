import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function SiteHeaderLoader() {
  const [header, siteSettings] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  return <SiteHeader header={header} siteSettings={siteSettings} />
}
