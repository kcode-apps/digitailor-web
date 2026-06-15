import type { RequiredDataFromCollectionSlug } from 'payload'

import { DEFAULT_TIMEZONE } from '@/lib/formBuilder/datetime'

export const DISCOVERY_CALL_FORM_TITLE = 'Discovery Call'

/** Starter data for seed + ensure only — not used by frontend components. */
export function discoveryCallFormStarterData(): RequiredDataFromCollectionSlug<'forms'> {
  return {
    title: DISCOVERY_CALL_FORM_TITLE,
    submitButtonLabel: 'Book discovery call',
    confirmationType: 'message',
    confirmationMessage: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Your discovery call request was submitted successfully.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: "We'll review your details and get back to you to confirm a time.",
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
    },
    fields: [
      {
        name: 'name',
        blockName: 'name',
        blockType: 'text',
        label: 'Name',
        required: true,
        width: 100,
      },
      {
        name: 'email',
        blockName: 'email',
        blockType: 'email',
        label: 'Email',
        required: true,
        width: 100,
      },
      {
        name: 'preferred-datetime',
        blockName: 'preferred-datetime',
        blockType: 'datetime',
        label: 'Preferred date & time',
        required: true,
        width: 100,
        defaultTimezone: DEFAULT_TIMEZONE,
        includeTimezoneSelect: true,
      },
      {
        name: 'phoneNumber',
        blockName: 'phoneNumber',
        blockType: 'text',
        label: 'Phone number',
        required: false,
        width: 100,
      },
      {
        name: 'purpose',
        blockName: 'purpose',
        blockType: 'textarea',
        label: 'Purpose',
        required: false,
        width: 100,
      },
    ],
  }
}
