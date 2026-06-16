import { resendAdapter } from '@payloadcms/email-resend'

import { getEmailFromAddress } from '@/lib/env/server'

export function getEmailAdapter() {
  const apiKey = process.env.RESEND_API_KEY?.trim()

  if (!apiKey) {
    return undefined
  }

  return resendAdapter({
    apiKey,
    defaultFromAddress: getEmailFromAddress(),
    defaultFromName: 'DIGITAILOR',
  })
}
