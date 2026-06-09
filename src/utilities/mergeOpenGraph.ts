import type { Metadata } from 'next'

import { siteMeta } from '@/lib/cms/siteMeta'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: siteMeta.defaultDescription,
  images: [
    {
      url: `${getServerSideURL()}${siteMeta.defaultOgImagePath}`,
    },
  ],
  siteName: siteMeta.siteName,
  title: siteMeta.defaultTitle,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
