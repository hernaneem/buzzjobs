"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import type { BehaviorCategory } from "@/lib/services/user-behavior-service"

interface TimeOnPageTrackerProps {
  category: BehaviorCategory
  minTimeToRecord?: number // Tiempo mínimo en segundos para registrar
}

export function TimeOnPageTracker({ category, minTimeToRecord = 5 }: TimeOnPageTrackerProps) {
  const pathname = usePathname()
  const { trackTimeSpent } = useBehaviorTracking()

  // Usar refs para almacenar el tiempo de inicio y la página actual
  const startTimeRef = useRef<number>(Date.now())
  const currentPathRef = useRef<string | null>(pathname)

  useEffect(() => {
    // Reiniciar el tiempo cuando cambia la página
    startTimeRef.current = Date.now()
    currentPathRef.current = pathname

    // Función para registrar el tiempo al salir de la página
    const recordTimeSpent = () => {
      if (currentPathRef.current) {
        const timeSpentSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000)

        // Solo registrar si el tiempo es significativo
        if (timeSpentSeconds >= minTimeToRecord) {
          trackTimeSpent(currentPathRef.current, timeSpentSeconds, category)
        }
      }
    }

    // Registrar tiempo cuando:
    // 1. El usuario cambia de página (cleanup function)
    // 2. El usuario cierra la pestaña/navegador (beforeunload)
    // 3. El usuario pone la pestaña en segundo plano (visibilitychange)

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        recordTimeSpent()
      } else if (document.visibilityState === "visible") {
        // Reiniciar el tiempo cuando la pestaña vuelve a estar visible
        startTimeRef.current = Date.now()
      }
    }

    const handleBeforeUnload = () => {
      recordTimeSpent()
    }

    // Añadir event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Cleanup
    return () => {
      recordTimeSpent()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [pathname, category, trackTimeSpent, minTimeToRecord])

  // Este componente no renderiza nada visible
  return null
}
