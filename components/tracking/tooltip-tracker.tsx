"use client"

import type React from "react"
import { useState } from "react"
import { TooltipRoot, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"

interface TooltipTrackerProps {
  children: React.ReactNode
  content: React.ReactNode
  tooltipId: string
  metadata?: Record<string, any>
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

export function TooltipTracker({
  children,
  content,
  tooltipId,
  metadata,
  className,
  triggerClassName,
  contentClassName,
}: TooltipTrackerProps) {
  const { trackTooltipInteraction } = useBehaviorTracking()
  const [hasTrackedHover, setHasTrackedHover] = useState(false)

  const handleTooltipOpen = () => {
    if (!hasTrackedHover) {
      trackTooltipInteraction(tooltipId, "hover", metadata)
      setHasTrackedHover(true)
    }
  }

  const handleContentClick = () => {
    trackTooltipInteraction(tooltipId, "click", metadata)
  }

  return (
    <TooltipProvider>
      <TooltipRoot onOpenChange={(open) => open && handleTooltipOpen()}>
        <TooltipTrigger className={triggerClassName}>{children}</TooltipTrigger>
        <TooltipContent className={contentClassName} onClick={handleContentClick}>
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}
