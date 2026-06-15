import type { Metadata } from 'next'

import { ServicesPageLoader } from '@/components/services/ServicesPageLoader'
import { getCachedServicesPage } from '@/lib/cms/queries'
import { formatPageTitle } from '@/lib/cms/siteMeta'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import React from 'react'

export default function ServicesRoute() {
  return <ServicesPageLoader />
}

export async function generateMetadata(): Promise<Metadata> {
  const servicesPage = await getCachedServicesPage(0)()

  const title = formatPageTitle(
    [servicesPage.headline, servicesPage.headlineAccent].filter(Boolean).join(' '),
  )
  const description = servicesPage.description || servicesPage.subheadline || servicesPage.headline

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      description: description || undefined,
      title,
      url: `${getServerSideURL()}/services`,
    }),
  }
}
