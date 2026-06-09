import type { Payload } from 'payload'

import { aboutStarterData } from '@/lib/cms/defaults'

export async function ensureAbout(payload: Payload): Promise<void> {
  const about = await payload.findGlobal({
    slug: 'about',
    depth: 0,
    overrideAccess: true,
  })

  if (about.headline?.trim()) {
    return
  }

  await payload.updateGlobal({
    slug: 'about',
    data: aboutStarterData(),
    overrideAccess: true,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Populated default About content')
}
