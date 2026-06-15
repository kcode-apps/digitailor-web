import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  // 'max' is the cache profile name — required by Next.js 16's revalidateTag API
  revalidateTag('redirects', 'max')

  return doc
}
