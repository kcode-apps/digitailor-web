import type { Form } from '@/payload-types'

import { getDiscoveryCallNotifyEmail, getEmailFromAddress } from '@/lib/env/server'

function notificationMessage(): NonNullable<Form['emails']>[number]['message'] {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '{{*:table}}',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export function getDiscoveryCallFormEmails(): NonNullable<Form['emails']> {
  const emailTo = getDiscoveryCallNotifyEmail()

  if (!emailTo) {
    return []
  }

  return [
    {
      emailTo,
      emailFrom: getEmailFromAddress(),
      replyTo: '{{email}}',
      subject: 'New discovery call request',
      message: notificationMessage(),
    },
  ]
}
