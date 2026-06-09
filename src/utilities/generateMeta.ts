import type { Metadata } from 'next'

import type { Media, Page, Project, Config } from '../payload-types'

import { formatPageTitle, siteMeta } from '@/lib/cms/siteMeta'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + siteMeta.defaultOgImagePath

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Project> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const title = formatPageTitle(doc?.meta?.title)

  return {
    description: doc?.meta?.description || siteMeta.defaultDescription,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || siteMeta.defaultDescription,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
