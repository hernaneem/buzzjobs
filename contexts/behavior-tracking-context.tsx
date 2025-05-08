"use client"

import React from "react"
import { createContext, useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { syncLocalEvents } from "@/lib/services/user-behavior-service"

interface BehaviorEvent {
  event_type: string
  category: string
  element_id?: string
  metadata?: Record<string, any>
  timestamp?: string
}

interface BehaviorTrackingContextType {
  isEnabled: boolean
  enableTracking: () => void
  disableTracking: () => void
  sessionEvents: BehaviorEvent[]
  addSessionEvent: (event: BehaviorEvent) => void
  clearSessionEvents: () => void
}

export const BehaviorTrackingContext = createContext<BehaviorTrackingContextType>({
  isEnabled: true,
  enableTracking: () => {},
  disableTracking: () => {},
  sessionEvents: [],
  addSessionEvent: () => {},
  clearSessionEvents: () => {},
})

interface BehaviorTrackingProviderProps {
  children: React.ReactNode
  initialEnabled?: boolean
}

export function BehaviorTrackingProvider({ children, initialEnabled = true }: BehaviorTrackingProviderProps) {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    // Verificar si hay una preferencia guardada
    if (typeof window !== "undefined") {
      const savedPreference = localStorage.getItem("tracking_enabled")
      return savedPreference !== null ? savedPreference === "true" : initialEnabled
    }
    return initialEnabled
  })

  const [sessionEvents, setSessionEvents] = useState<BehaviorEvent[]>([])
  const { user } = useAuth()

  // Sincronizar eventos locales cuando el usuario inicia sesión
  useEffect(() => {
    if (user?.id) {
      syncLocalEvents(user.id).catch(console.error)
    }
  }, [user])

  // Guardar preferencia cuando cambia
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tracking_enabled", isEnabled.toString())
    }
  }, [isEnabled])

  const enableTracking = useCallback(() => {
    setIsEnabled(true)
  }, [])

  const disableTracking = useCallback(() => {
    setIsEnabled(false)
  }, [])

  const addSessionEvent = useCallback(
    (event: BehaviorEvent) => {
      if (!isEnabled) return

      setSessionEvents((prevEvents) => [
        ...prevEvents,
        {
          ...event,
          timestamp: new Date().toISOString(),
        },
      ])
    },
    [isEnabled],
  )

  const clearSessionEvents = useCallback(() => {
    setSessionEvents([])
  }, [])

  // Limpiar eventos de sesión después de un tiempo
  useEffect(() => {
    const interval = setInterval(
      () => {
        // Mantener solo los eventos de las últimas 2 horas
        const twoHoursAgo = new Date()
        twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)

        setSessionEvents((prevEvents) =>
          prevEvents.filter((event) => event.timestamp && new Date(event.timestamp) > twoHoursAgo),
        )
      },
      30 * 60 * 1000,
    ) // Ejecutar cada 30 minutos

    return () => clearInterval(interval)
  }, [])

  return (
    <BehaviorTrackingContext.Provider
      value={{
        isEnabled,
        enableTracking,
        disableTracking,
        sessionEvents,
        addSessionEvent,
        clearSessionEvents,
      }}
    >
      {children}
    </BehaviorTrackingContext.Provider>
  )
}

export function useBehaviorTracking() {
  const context = React.useContext(BehaviorTrackingContext)
  if (context === undefined) {
    throw new Error("useBehaviorTracking must be used within a BehaviorTrackingProvider")
  }
  return context
}
