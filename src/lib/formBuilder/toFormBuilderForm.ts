import type { Form as FormBuilderForm } from '@payloadcms/plugin-form-builder/types'
import type { Form as PayloadForm } from '@/payload-types'

/** Payload-generated `Form` matches the form-builder runtime shape; centralize the assertion here. */
export function toFormBuilderForm(form: PayloadForm): FormBuilderForm {
  return form as unknown as FormBuilderForm
}
