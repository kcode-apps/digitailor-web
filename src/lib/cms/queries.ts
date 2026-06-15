import type { Config, Form, Page, Project, SiteSetting } from '@/payload-types'

import configPromise from '@payload-config'
import { DISCOVERY_CALL_FORM_TITLE } from '@/lib/cms/forms/discoveryCallForm'
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

export const getCachedAbout = (depth = 0) => getCachedGlobal('about', depth)

export const getCachedProjectsPage = (depth = 0) => getCachedGlobal('projects-page', depth)

export function getDiscoveryCallFormFromSettings(settings: SiteSetting): Form | null {
  const linked = settings.discoveryCallForm

  if (linked && typeof linked === 'object') {
    return linked
  }

  return null
}

async function findDiscoveryCallFormByTitle(payload: Awaited<ReturnType<typeof getPayload>>) {
  const result = await payload.find({
    collection: 'forms',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      title: {
        equals: DISCOVERY_CALL_FORM_TITLE,
      },
    },
  })

  return result.docs[0] ?? null
}

export async function getDiscoveryCallForm(): Promise<Form | null> {
  const payload = await getPayload({ config: configPromise })

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
    overrideAccess: true,
  })

  const fromSettings = getDiscoveryCallFormFromSettings(settings)

  if (fromSettings) {
    return fromSettings
  }

  const linked = settings.discoveryCallForm

  if (typeof linked === 'number') {
    try {
      return await payload.findByID({
        collection: 'forms',
        depth: 0,
        id: linked,
        overrideAccess: true,
      })
    } catch {
      return findDiscoveryCallFormByTitle(payload)
    }
  }

  return findDiscoveryCallFormByTitle(payload)
}

export const getCachedDiscoveryCallForm = () =>
  unstable_cache(async () => getDiscoveryCallForm(), ['discovery-call-form'], {
    tags: ['discovery-call-form', 'global_site-settings'],
  })

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
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
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

export const getCachedPublishedProjects = (options?: { depth?: number; limit?: number }) => {
  const depth = options?.depth ?? 1
  const limit = options?.limit ?? 100

  return unstable_cache(
    async () => getPublishedProjects({ depth, limit }),
    ['published-projects', String(depth), String(limit)],
    {
      tags: ['projects-list'],
    },
  )
}

export async function getPublishedProjectSlugs() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
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
