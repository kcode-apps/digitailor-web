import type { Metadata } from 'next'

import { HomePageLoader } from '@/components/home/HomePageLoader'
import { getCachedHomepage } from '@/lib/cms/queries'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import React from 'react'

export default function HomePage() {
  return <HomePageLoader />
}

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getCachedHomepage(0)()

  const title = [homepage.headline, homepage.headlineAccent].filter(Boolean).join(' ').trim()
  const description = homepage.subheadline

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      description: description || undefined,
      title,
      url: getServerSideURL(),
    }),
  }
}
