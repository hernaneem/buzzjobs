"use client"

import { useEffect, useRef } from "react"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import type { BehaviorCategory } from "@/lib/services/user-behavior-service"

interface FilterTrackerProps {
  filterId: string
  value: any
  category: BehaviorCategory
  debounceMs?: number
}

export function FilterTracker({ filterId, value, category, debounceMs = 500 }: FilterTrackerProps) {
  const { trackFilterUse } = useBehaviorTracking()
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastValueRef = useRef<any>(null)

  useEffect(() => {
    // No registrar si es el mismo valor
    if (JSON.stringify(value) === JSON.stringify(lastValueRef.current)) return

    // Limpiar el temporizador anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Configurar un nuevo temporizador
    debounceTimerRef.current = setTimeout(() => {
      trackFilterUse(filterId, value, category)
      lastValueRef.current = value
    }, debounceMs)

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [filterId, value, category, trackFilterUse, debounceMs])

  // Este componente no renderiza nada visible
  return null
}
