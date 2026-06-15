import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)
    // 'max' is the cache profile name — required by Next.js 16's revalidateTag API
    revalidateTag('global_header', 'max')
  }

  return doc
}
