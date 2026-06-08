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
        'font-sans text-xs font-medium uppercase tracking-[0.14em] transition-colors',
        isActive ? 'text-charcoal' : 'text-warm-gray hover:text-charcoal',
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
