import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateSiteSettings: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating site settings')
    // 'max' is the cache profile name — required by Next.js 16's revalidateTag API
    revalidateTag('global_site-settings', 'max')
  }

  return doc
}
