import type { Config, Page, Project } from '@/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { draftMode } from 'next/headers'

type Global = keyof Config['globals']
type Collection = keyof Config['collections']

async function getGlobal<T extends Global>(
  slug: T,
  depth = 0,
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug, depth })
}

export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, depth), [slug, String(depth)], {
    tags: [`global_${slug}`],
  })

export const getCachedHomepage = (depth = 0) => getCachedGlobal('homepage', depth)

async function findPageBySlug(slug: string, draft: boolean): Promise<Page | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Page | undefined) ?? null
}

async function findProjectBySlug(slug: string, draft: boolean): Promise<Project | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Project | undefined) ?? null
}

export const getPageBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  return findPageBySlug(slug, draft)
})

export const getProjectBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  return findProjectBySlug(slug, draft)
})

async function getDocumentById(collection: Collection, id: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })
  return payload.findByID({ collection, id, depth })
}

export const getCachedDocumentById = (collection: Collection, id: string, depth = 0) =>
  unstable_cache(
    async () => getDocumentById(collection, id, depth),
    [collection, id, String(depth)],
    {
      tags: [`${collection}_${id}`],
    },
  )

export async function getPublishedPageSlugs() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return pages.docs?.filter((doc) => doc.slug !== 'home').map(({ slug }) => slug) ?? []
}

export async function getPublishedProjects(options?: { depth?: number; limit?: number }) {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'projects',
    depth: options?.depth ?? 1,
    limit: options?.limit ?? 100,
    overrideAccess: false,
    pagination: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })
}

export async function getPublishedProjectSlugs() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return projects.docs.map(({ slug }) => slug)
}

export async function getRedirects(depth = 1) {
  const payload = await getPayload({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
  })

  return redirects
}

export const getCachedRedirects = () =>
  unstable_cache(async () => getRedirects(), ['redirects'], {
    tags: ['redirects'],
  })
