import type { Form } from '@/payload-types'
import type { Payload } from 'payload'

import { getDiscoveryCallFormEmails } from '@/lib/cms/forms/discoveryCallFormEmails'
import {
  DISCOVERY_CALL_FORM_TITLE,
  discoveryCallFormStarterData,
} from '@/lib/cms/forms/discoveryCallForm'

function needsEmailConfig(form: Form): boolean {
  return !form.emails?.length
}

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

  const form = existing.docs[0]

  if (form) {
    if (!needsEmailConfig(form)) {
      return form
    }

    const emails = getDiscoveryCallFormEmails()

    if (!emails.length) {
      return form
    }

    return payload.update({
      id: form.id,
      collection: 'forms',
      context: {
        disableRevalidate: true,
      },
      data: {
        emails,
      },
      depth: 0,
      overrideAccess: true,
    })
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
