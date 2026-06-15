import type { Payload } from 'payload'

import { serviceStarterData } from '@/lib/cms/services/serviceSeedData'

export async function ensureServices(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: 'services',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
  })

  if (existing.totalDocs > 0) {
    return
  }

  for (const data of serviceStarterData()) {
    await payload.create({
      collection: 'services',
      data,
      depth: 0,
      overrideAccess: true,
      context: {
        disableRevalidate: true,
      },
    })
  }

  payload.logger.info('Populated default Services collection content')
}
