import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    // FIX: Previously this checked !req.data.publishedAt, which would stamp
    // the current time on every autosave/update where the field wasn't included
    // in the request body — including draft saves. We now guard on _status so
    // the timestamp is only set when the document is actually being published.
    if (data._status === 'published' && !data.publishedAt) {
      const now = new Date()
      return {
        ...data,
        publishedAt: now,
      }
    }
  }

  return data
}
