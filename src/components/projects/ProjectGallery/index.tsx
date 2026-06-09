'use client'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

type ProjectGalleryProps = {
  images: MediaType[]
  initialIndex?: number
  priority?: boolean
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images,
  initialIndex = 0,
  priority = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const selectedImage = images[selectedIndex]

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }, [images.length])

  const showNext = useCallback(() => {
    setSelectedIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }, [images.length])

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }

      if (event.key === 'ArrowLeft') {
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeLightbox, lightboxOpen, showNext, showPrevious])

  if (!selectedImage) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center bg-beige-dark text-xs uppercase tracking-[0.14em] text-warm-gray">
        Project image
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <button
          aria-label="View enlarged image"
          className="relative block aspect-[16/10] w-full overflow-hidden bg-beige-dark"
          onClick={() => openLightbox(selectedIndex)}
          type="button"
        >
          <Media
            fill
            imgClassName="object-cover"
            priority={priority}
            resource={selectedImage}
            size="(max-width: 1024px) 100vw, 58vw"
          />
        </button>

        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
            {images.map((image, index) => {
              const isSelected = index === selectedIndex

              return (
                <button
                  aria-current={isSelected ? 'true' : undefined}
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  className={cn(
                    'relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-beige-dark ring-offset-beige transition-shadow sm:w-auto',
                    isSelected
                      ? 'ring-2 ring-charcoal ring-offset-2'
                      : 'ring-1 ring-warm-border/60 hover:ring-charcoal/40',
                  )}
                  key={image.id ?? index}
                  onClick={() => setSelectedIndex(index)}
                  type="button"
                >
                  <Media
                    fill
                    imgClassName="object-cover"
                    resource={image}
                    size="(max-width: 768px) 50vw, 20vw"
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 md:p-8"
          role="dialog"
        >
          <button
            aria-label="Close enlarged image"
            className="absolute right-4 top-4 rounded-full border border-white/20 p-2 text-white transition-colors hover:bg-white/10 md:right-8 md:top-8"
            onClick={closeLightbox}
            type="button"
          >
            <X aria-hidden className="size-5" strokeWidth={1.5} />
          </button>

          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 p-2 text-white transition-colors hover:bg-white/10 md:left-8"
                onClick={showPrevious}
                type="button"
              >
                <ChevronLeft aria-hidden className="size-5" strokeWidth={1.5} />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 p-2 text-white transition-colors hover:bg-white/10 md:right-8"
                onClick={showNext}
                type="button"
              >
                <ChevronRight aria-hidden className="size-5" strokeWidth={1.5} />
              </button>
            </>
          )}

          <button
            aria-label="Close enlarged image backdrop"
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
            type="button"
          />

          <div className="relative h-[min(85vh,900px)] w-full max-w-6xl">
            <Media
              fill
              imgClassName="object-contain"
              priority
              resource={selectedImage}
              size="100vw"
            />
          </div>

          {images.length > 1 && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-xs uppercase tracking-[0.14em] text-white/80 md:bottom-8">
              {selectedIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  )
}
