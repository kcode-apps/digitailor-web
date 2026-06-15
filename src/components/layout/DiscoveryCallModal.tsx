'use client'

import type { Form } from '@/payload-types'

import { FormBlock } from '@/blocks/Form/Component'
import { toFormBuilderForm } from '@/lib/formBuilder/toFormBuilderForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import React, { useCallback, useState } from 'react'

type DiscoveryCallModalProps = {
  description?: string
  form: Form
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({
  description,
  form,
  onOpenChange,
  open,
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setHasSubmitted(false)
        setFormKey((key) => key + 1)
      }

      onOpenChange(nextOpen)
    },
    [onOpenChange],
  )

  const dialogTitle = hasSubmitted ? 'Discovery call request submitted' : form.title

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        aria-describedby={hasSubmitted || !description ? undefined : 'discovery-call-modal-description'}
        className="max-w-xl rounded-md border-blush/25 bg-cream paper-texture shadow-[0_12px_40px_rgb(26_26_26_/0.08)]"
        overlayClassName="bg-charcoal/40 backdrop-blur-[2px]"
      >
        <DialogHeader>
          <DialogTitle className={hasSubmitted ? 'text-center' : undefined}>{dialogTitle}</DialogTitle>
          {!hasSubmitted && description && (
            <DialogDescription
              className="text-warm-gray leading-relaxed"
              id="discovery-call-modal-description"
            >
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <FormBlock
          key={formKey}
          embedded
          enableIntro={false}
          form={toFormBuilderForm(form)}
          onSubmitted={() => setHasSubmitted(true)}
          suppressConfirmationHeading
        />
      </DialogContent>
    </Dialog>
  )
}
