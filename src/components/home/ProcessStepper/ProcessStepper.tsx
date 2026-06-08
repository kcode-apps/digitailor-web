import type { Homepage } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

type ProcessStep = NonNullable<Homepage['processSteps']>[number]

type ProcessStepperProps = {
  steps: ProcessStep[]
  className?: string
}

export const ProcessStep: React.FC<{ step: ProcessStep; isLast: boolean }> = ({ step, isLast }) => {
  return (
    <li className="relative flex gap-4">
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[1.35rem] top-12 hidden h-[calc(100%-1rem)] w-px bg-warm-border lg:block"
        />
      )}

      <div className="relative z-10 shrink-0">
        {step.image && typeof step.image === 'object' ? (
          <div className="size-11 overflow-hidden rounded-full border border-warm-border bg-off-white lg:size-14">
            <Media
              imgClassName="size-full object-cover"
              resource={step.image}
              size="56px"
            />
          </div>
        ) : (
          <div className="size-11 rounded-full border border-warm-border bg-off-white lg:size-14" />
        )}
      </div>

      <div className="min-w-0 pb-6 lg:pb-8">
        <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-warm-gray">
          {step.stepNumber}
        </p>
        <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-charcoal">
          {step.title}
        </p>
        {step.description && (
          <p className="mt-2 hidden font-sans text-sm leading-relaxed text-warm-gray lg:block">
            {step.description}
          </p>
        )}
      </div>
    </li>
  )
}

export const ProcessStepper: React.FC<ProcessStepperProps> = ({ steps, className }) => {
  if (!steps.length) return null

  return (
    <aside
      aria-label="Production process"
      className={cn(
        'rounded-sm border border-warm-border/80 bg-off-white/95 p-5 backdrop-blur-sm lg:max-w-[16rem] lg:p-6',
        className,
      )}
    >
      <ol className="flex flex-col">
        {steps.map((step, index) => (
          <ProcessStep isLast={index === steps.length - 1} key={step.id || index} step={step} />
        ))}
      </ol>
    </aside>
  )
}
