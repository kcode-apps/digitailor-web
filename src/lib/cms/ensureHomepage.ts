import type { Payload } from 'payload'

import { homepageStarterData } from '@/lib/cms/defaults'

export async function ensureHomepage(payload: Payload): Promise<void> {
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 0,
    overrideAccess: true,
  })

  if (homepage.headline?.trim()) {
    return
  }

  await payload.updateGlobal({
    slug: 'homepage',
    data: homepageStarterData(),
    overrideAccess: true,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Populated default homepage content')
}
