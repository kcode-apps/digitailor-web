import type { Metadata } from 'next'

import { HomeHero } from '@/components/home/HomeHero'
import { ImpactSection } from '@/components/home/ImpactSection'
import { OutputsSection } from '@/components/home/OutputsSection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import React from 'react'

export default async function HomePage() {
  const homepage = await getCachedGlobal('homepage', 2)()

  return (
    <>
      <HomeHero homepage={homepage} />
      <OutputsSection outputs={homepage.outputs} />
      <ImpactSection impact={homepage.impact} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getCachedGlobal('homepage', 0)()

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
