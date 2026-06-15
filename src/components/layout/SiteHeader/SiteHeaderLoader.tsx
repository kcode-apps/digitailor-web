import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { getCachedDiscoveryCallForm, getCachedGlobal } from '@/lib/cms/queries'
import React from 'react'

export async function SiteHeaderLoader() {
  const [header, siteSettings, discoveryCallForm] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('site-settings', 1)(),
    getCachedDiscoveryCallForm()(),
  ])

  return (
    <SiteHeader
      discoveryCallForm={discoveryCallForm}
      header={header}
      siteSettings={siteSettings}
    />
  )
}
