import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { projectSeedData } from '@/lib/cms/projects/projectSeedData'
import { defaultHeaderNavItems } from '@/lib/cms/defaultNavigation'
import {
  aboutStarterData,
  homepageClearData,
  homepageSeedData,
  projectsPageStarterData,
  siteSettingsStarterData,
} from '@/lib/cms/defaults'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'

const collectionsToClear: CollectionSlug[] = [
  'pages',
  'projects',
  'media',
  'forms',
  'form-submissions',
]

const SEED_IMAGE_URLS = [
  'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post1.webp',
  'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post2.webp',
  'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post3.webp',
  'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-hero1.webp',
]

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding DIGITAILOR demo data...')

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: { navItems: [] },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: { navItems: [] },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'homepage',
      data: {
        ...homepageClearData(),
        heroImage: null,
      } as Record<string, unknown>,
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'about',
      data: aboutStarterData(),
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'projects-page',
      data: projectsPageStarterData(),
      depth: 0,
      context: { disableRevalidate: true },
    }),
  ])

  const collectionsWithoutMedia = collectionsToClear.filter((collection) => collection !== 'media')

  await Promise.all(
    collectionsWithoutMedia.map((collection) =>
      payload.db.deleteMany({ collection, req, where: {} }),
    ),
  )

  await payload.db.deleteMany({ collection: 'media', req, where: {} })

  await Promise.all(
    collectionsToClear
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, heroBuffer] = await Promise.all(
    SEED_IMAGE_URLS.map((url) => fetchFileByURL(url)),
  )

  const [image1Doc, image2Doc, image3Doc, imageHeroDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: heroBuffer,
    }),
  ])

  payload.logger.info(`— Seeding contact form and pages...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  await payload.create({
    collection: 'pages',
    depth: 0,
    data: contactPageData({ contactForm }),
  })

  payload.logger.info(`— Seeding projects...`)

  await Promise.all(
    projectSeedData([image1Doc, image2Doc, image3Doc]).map((data) =>
      payload.create({
        collection: 'projects',
        depth: 0,
        context: { disableRevalidate: true },
        data,
      }),
    ),
  )

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: { navItems: defaultHeaderNavItems() },
    }),
    payload.updateGlobal({
      slug: 'site-settings',
      data: siteSettingsStarterData(),
    }),
    payload.updateGlobal({
      slug: 'homepage',
      data: {
        ...homepageSeedData([image1Doc.id, image2Doc.id, image3Doc.id, image1Doc.id, image2Doc.id]),
        heroImage: imageHeroDoc.id,
      },
    }),
  ])

  payload.logger.info('Seeded DIGITAILOR demo data successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
