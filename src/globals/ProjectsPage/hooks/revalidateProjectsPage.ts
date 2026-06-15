import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateProjectsPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating projects page')
    // 'max' is the cache profile name — required by Next.js 16's revalidateTag API
    revalidateTag('global_projects-page', 'max')
    revalidatePath('/projects', 'layout')
  }

  return doc
}
