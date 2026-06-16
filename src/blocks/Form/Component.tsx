'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { LoadingOverlay } from '@/components/ui/loading-overlay'
import { cn } from '@/utilities/ui'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  embedded?: boolean
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  onSubmitted?: () => void
  suppressConfirmationHeading?: boolean
}

function buildDefaultValues(formFields: FormType['fields']): Record<string, unknown> {
  if (!formFields?.length) {
    return {}
  }

  return formFields.reduce<Record<string, unknown>>((values, field) => {
    if ('name' in field && field.name) {
      values[field.name] =
        'defaultValue' in field && field.defaultValue != null ? field.defaultValue : ''
    }

    return values
  }, {})
}

function getFieldKey(field: FormType['fields'] extends (infer T)[] | null | undefined ? T : never, index: number) {
  if ('id' in field && field.id) {
    return String(field.id)
  }

  if ('name' in field && field.name) {
    return field.name
  }

  if ('blockName' in field && field.blockName) {
    return field.blockName
  }

  return String(index)
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    embedded = false,
    enableIntro,
    onSubmitted,
    suppressConfirmationHeading = false,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const defaultValues = useMemo(
    () => buildDefaultValues(formFromProps.fields),
    [formFromProps.fields],
  )

  const formMethods = useForm({
    defaultValues: {
      ...defaultValues,
      _hp: '',
    },
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const formElementId = formID ? `form-${formID}` : 'form'

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const submitForm = async () => {
        if (typeof data._hp === 'string' && data._hp.trim()) {
          setHasSubmitted(true)
          onSubmitted?.()
          return
        }

        setError(undefined)
        setIsLoading(true)

        const dataToSend = Object.entries(data)
          .filter(([name]) => name !== '_hp')
          .map(([name, value]) => ({
            field: name,
            value,
          }))

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          if (req.status >= 400) {
            setError({
              message: res.errors?.[0]?.message || 'Something went wrong. Please try again.',
              status: res.status,
            })

            return
          }

          setHasSubmitted(true)
          onSubmitted?.()

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          setError({
            message: 'Something went wrong. Please try again.',
          })
        } finally {
          setIsLoading(false)
        }
      }

      void submitForm()
    },
    [router, formID, onSubmitted, redirect, confirmationType],
  )

  return (
    <div className={cn(!embedded && 'container lg:max-w-[48rem]')}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className={cn(!embedded && 'rounded-[0.8rem] border border-border p-4 lg:p-6')}>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText
              className={cn(
                embedded && 'text-center',
                suppressConfirmationHeading && '[&_h2:first-child]:hidden',
              )}
              data={confirmationMessage}
            />
          )}
          {error && (
            <p className="text-destructive mb-4 text-sm" role="alert">
              {error.message}
            </p>
          )}
          {!hasSubmitted && (
            <div className="relative">
              <LoadingOverlay label="Submitting form" open={isLoading} scope="inline" />
              <form id={formElementId} onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register('_hp')}
                  aria-hidden="true"
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  tabIndex={-1}
                  type="text"
                />
                <div className="mb-4 last:mb-0">
                  {formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={getFieldKey(field, index)}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
                </div>

                <Button disabled={isLoading} form={formElementId} type="submit" variant="default">
                  {submitButtonLabel}
                </Button>
              </form>
            </div>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
