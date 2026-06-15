import type { Form } from '@/payload-types'
import type { Payload } from 'payload'

import {
  DISCOVERY_CALL_FORM_TITLE,
  discoveryCallFormStarterData,
} from '@/lib/cms/forms/discoveryCallForm'

export async function ensureDiscoveryCallForm(payload: Payload): Promise<Form | null> {
  const existing = await payload.find({
    collection: 'forms',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      title: {
        equals: DISCOVERY_CALL_FORM_TITLE,
      },
    },
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  return payload.create({
    collection: 'forms',
    context: {
      disableRevalidate: true,
    },
    data: discoveryCallFormStarterData(),
    depth: 0,
    overrideAccess: true,
  })
}
