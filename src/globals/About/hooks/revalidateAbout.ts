import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateAbout: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating about page')
    revalidateTag('global_about', 'max')
    revalidatePath('/about', 'layout')
  }

  return doc
}
