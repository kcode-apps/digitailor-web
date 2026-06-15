import type { Payload } from 'payload'

import { servicesPageStarterData } from '@/lib/cms/defaults'

export async function ensureServicesPage(payload: Payload): Promise<void> {
  const servicesPage = await payload.findGlobal({
    slug: 'services-page',
    depth: 0,
    overrideAccess: true,
  })

  if (servicesPage.headline?.trim()) {
    return
  }

  await payload.updateGlobal({
    slug: 'services-page',
    data: servicesPageStarterData(),
    overrideAccess: true,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Populated default Services Page content')
}
