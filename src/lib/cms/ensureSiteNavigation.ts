import type { Payload } from 'payload'

import { defaultHeaderNavItems } from '@/lib/cms/defaultNavigation'

export async function ensureSiteNavigation(payload: Payload): Promise<void> {
  const header = await payload.findGlobal({
    slug: 'header',
    depth: 0,
    overrideAccess: true,
  })

  if (!header.navItems?.length) {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: defaultHeaderNavItems(),
      },
      overrideAccess: true,
      context: {
        disableRevalidate: true,
      },
    })

    payload.logger.info('Populated default header navigation')
  }
}
