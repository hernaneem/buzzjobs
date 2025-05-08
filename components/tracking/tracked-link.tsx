"use client"

import type React from "react"
import Link, { type LinkProps } from "next/link"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import type { BehaviorCategory } from "@/lib/services/user-behavior-service"

interface TrackedLinkProps extends LinkProps {
  children: React.ReactNode
  trackingId?: string
  category: BehaviorCategory
  metadata?: Record<string, any>
  className?: string
}

export function TrackedLink({ children, trackingId, category, metadata, className, ...props }: TrackedLinkProps) {
  const { trackEvent } = useBehaviorTracking()

  const handleClick = () => {
    trackEvent("link_click", category, {
      elementId: trackingId || props.href.toString(),
      metadata,
    })
  }

  return (
    <Link className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
