import { APIError, type CollectionBeforeChangeHook } from 'payload'

const HONEYPOT_FIELD = '_hp'
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 5

type SubmissionEntry = {
  field: string
  value: unknown
}

function getSubmissionFieldValue(
  submissionData: SubmissionEntry[] | null | undefined,
  fieldName: string,
): string | null {
  const entry = submissionData?.find((item) => item.field === fieldName)
  return typeof entry?.value === 'string' ? entry.value.trim() : null
}

export const guardFormSubmission: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create' || !data) {
    return data
  }

  const submissionData = (data.submissionData as SubmissionEntry[] | undefined) ?? []

  if (getSubmissionFieldValue(submissionData, HONEYPOT_FIELD)) {
    throw new APIError('Invalid submission.', 400)
  }

  data.submissionData = submissionData.filter((entry) => entry.field !== HONEYPOT_FIELD)

  const email = getSubmissionFieldValue(data.submissionData as SubmissionEntry[], 'email')?.toLowerCase()

  if (!email || !data.form) {
    return data
  }

  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
  const recent = await req.payload.find({
    collection: 'form-submissions',
    depth: 0,
    limit: 100,
    overrideAccess: true,
    pagination: false,
    req,
    where: {
      and: [
        {
          form: {
            equals: data.form,
          },
        },
        {
          createdAt: {
            greater_than: windowStart,
          },
        },
      ],
    },
  })

  const matchingSubmissions = recent.docs.filter((doc) => {
    const docEmail = getSubmissionFieldValue(
      doc.submissionData as SubmissionEntry[] | undefined,
      'email',
    )?.toLowerCase()

    return docEmail === email
  }).length

  if (matchingSubmissions >= RATE_LIMIT_MAX) {
    throw new APIError('Too many submissions. Please try again later.', 429)
  }

  return data
}
