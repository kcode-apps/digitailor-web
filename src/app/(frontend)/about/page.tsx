import type { Metadata } from 'next'

import { AboutPageLoader } from '@/components/about/AboutPageLoader'
import { getCachedAbout } from '@/lib/cms/queries'
import { formatPageTitle } from '@/lib/cms/siteMeta'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import React from 'react'

export default function AboutRoute() {
  return <AboutPageLoader />
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await getCachedAbout(0)()

  const title = formatPageTitle(about.headline)
  const description = about.bio

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      description: description || undefined,
      title,
      url: `${getServerSideURL()}/about`,
    }),
  }
}
