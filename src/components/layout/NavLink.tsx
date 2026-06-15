'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavLinkProps = {
  href: string
  label: string
  newTab?: boolean | null
  className?: string
  onClick?: () => void
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  newTab,
  className,
  onClick,
}) => {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {}

  return (
    <Link
      className={cn(
        'relative font-sans text-xs font-medium uppercase tracking-[0.14em] transition-gentle',
        'after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-blush after:transition-all after:duration-300 after:content-[""]',
        isActive ? 'text-charcoal after:w-full' : 'text-warm-gray after:w-0 hover:text-charcoal hover:after:w-full',
        className,
      )}
      href={href}
      onClick={onClick}
      {...newTabProps}
    >
      {label}
    </Link>
  )
}
