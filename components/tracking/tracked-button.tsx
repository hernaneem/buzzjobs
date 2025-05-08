"use client"

import type React from "react"
import { Button, type ButtonProps } from "@/components/ui/button-custom"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import type { BehaviorCategory } from "@/lib/services/user-behavior-service"

interface TrackedButtonProps extends ButtonProps {
  trackingId: string
  category: BehaviorCategory
  actionType?: "click" | "save" | "apply" | "contact" | "share" | "download" | "submit"
  metadata?: Record<string, any>
}

export function TrackedButton({
  children,
  trackingId,
  category,
  actionType = "click",
  metadata,
  onClick,
  ...props
}: TrackedButtonProps) {
  const { trackUserAction } = useBehaviorTracking()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackUserAction(actionType, category, trackingId, metadata)

    // Llamar al manejador original si existe
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
