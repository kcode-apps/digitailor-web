import { cn } from '@/utilities/ui'
import React from 'react'

export type BrandLoaderSize = 'sm' | 'md' | 'lg'

const trackWidth: Record<BrandLoaderSize, string> = {
  sm: 'w-16',
  md: 'w-24',
  lg: 'w-32',
}

export type BrandLoaderProps = {
  className?: string
  size?: BrandLoaderSize
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({ className, size = 'md' }) => {
  return (
    <div aria-hidden className={cn('flex flex-col items-center', className)}>
      <div className={cn('relative h-px overflow-hidden bg-blush/25', trackWidth[size])}>
        <span className="animate-brand-stitch absolute inset-y-0 w-1/3 bg-blush" />
      </div>
    </div>
  )
}
