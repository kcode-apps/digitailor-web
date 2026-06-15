'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function isInternalNavigation(href: string, pathname: string, search: string) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false
  }

  try {
    const url = new URL(href, window.location.origin)

    if (url.origin !== window.location.origin) {
      return false
    }

    return url.pathname + url.search !== pathname + search
  } catch {
    return false
  }
}

export function useNavigationPending(): boolean {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const currentLocation = search ? `${pathname}?${search}` : pathname
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setPending(false)
  }, [currentLocation])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest('a')

      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return
      }

      const href = anchor.getAttribute('href')

      if (!href || !isInternalNavigation(href, pathname, search ? `?${search}` : '')) {
        return
      }

      setPending(true)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [pathname, search])

  return pending
}
