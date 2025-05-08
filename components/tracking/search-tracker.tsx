"use client"

import { useEffect, useRef } from "react"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import type { BehaviorCategory } from "@/lib/services/user-behavior-service"

interface SearchTrackerProps {
  searchTerm: string
  category: BehaviorCategory
  metadata?: Record<string, any>
  debounceMs?: number
}

export function SearchTracker({ searchTerm, category, metadata, debounceMs = 1000 }: SearchTrackerProps) {
  const { trackSearch } = useBehaviorTracking()
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSearchTermRef = useRef<string>("")

  useEffect(() => {
    // No registrar búsquedas vacías o muy cortas
    if (!searchTerm || searchTerm.length < 2) return

    // No registrar si es la misma búsqueda
    if (searchTerm === lastSearchTermRef.current) return

    // Limpiar el temporizador anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Configurar un nuevo temporizador
    debounceTimerRef.current = setTimeout(() => {
      trackSearch(searchTerm, category, metadata)
      lastSearchTermRef.current = searchTerm
    }, debounceMs)

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchTerm, category, metadata, trackSearch, debounceMs])

  // Este componente no renderiza nada visible
  return null
}
