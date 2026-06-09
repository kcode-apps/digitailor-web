import type { Payload } from 'payload'

import { siteSettingsStarterData } from '@/lib/cms/defaults'

export async function ensureSiteSettings(payload: Payload): Promise<void> {
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
    overrideAccess: true,
  })

  if (settings.siteName?.trim()) {
    return
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: siteSettingsStarterData(),
    overrideAccess: true,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Populated default site settings')
}
