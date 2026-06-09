import type { Payload } from 'payload'

import { aboutPageData } from '@/lib/cms/pages/aboutPageData'

export async function ensureAboutPage(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: 'pages',
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: 'about',
      },
    },
  })

  if (existing.docs.length > 0) {
    return
  }

  await payload.create({
    collection: 'pages',
    data: aboutPageData(),
    overrideAccess: true,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Created default About page in Pages collection')
}
