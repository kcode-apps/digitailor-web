import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating services page after service change')
    revalidatePath('/services')
    revalidateTag('services-list', 'max')
  }

  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/services')
    revalidateTag('services-list', 'max')
  }
}
