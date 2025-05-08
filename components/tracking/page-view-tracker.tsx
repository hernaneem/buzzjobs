"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import type { BehaviorCategory } from "@/lib/services/user-behavior-service"

interface PageViewTrackerProps {
  category: BehaviorCategory
  metadata?: Record<string, any>
}

export function PageViewTracker({ category, metadata }: PageViewTrackerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { trackPageView } = useBehaviorTracking()

  useEffect(() => {
    // Crear URL completa con parámetros de búsqueda
    const url = searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname

    // Registrar vista de página
    if (url) {
      trackPageView(url, category, metadata)
    }
  }, [pathname, searchParams, category, metadata, trackPageView])

  // Este componente no renderiza nada visible
  return null
}
