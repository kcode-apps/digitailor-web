import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateHomepage: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating homepage')
    // 'max' is the cache profile name — required by Next.js 16's revalidateTag API
    revalidateTag('global_homepage', 'max')
    revalidatePath('/', 'layout')
  }

  return doc
}
