"use client"

import { useCallback, useContext } from "react"
import { useAuth } from "@/contexts/auth-context"
import {
  type BehaviorCategory,
  type BehaviorEventType,
  trackBehaviorEvent,
  trackBehaviorEventClient,
} from "@/lib/services/user-behavior-service"
import { BehaviorTrackingContext } from "@/contexts/behavior-tracking-context"

interface TrackEventOptions {
  elementId?: string
  metadata?: Record<string, any>
  immediate?: boolean
}

export function useBehaviorTracking() {
  const { user } = useAuth()
  const { isEnabled, sessionEvents, addSessionEvent } = useContext(BehaviorTrackingContext)

  // Función para registrar un evento
  const trackEvent = useCallback(
    (eventType: BehaviorEventType, category: BehaviorCategory, options: TrackEventOptions = {}) => {
      if (!isEnabled) return

      const { elementId, metadata, immediate = false } = options

      // Crear objeto de evento
      const event = {
        event_type: eventType,
        category,
        element_id: elementId,
        metadata,
      }

      // Añadir a eventos de sesión para análisis en tiempo real
      addSessionEvent(event)

      // Enviar al servidor o almacenar localmente
      if (user?.id) {
        trackBehaviorEvent({
          user_id: user.id,
          ...event,
        }).catch((error) => {
          console.error("Error al registrar evento:", error)
        })
      } else {
        // Almacenar localmente si no hay usuario autenticado
        trackBehaviorEventClient(event)
      }
    },
    [user, isEnabled, addSessionEvent],
  )

  // Función para registrar vista de página
  const trackPageView = useCallback(
    (pagePath: string, category: BehaviorCategory, metadata?: Record<string, any>) => {
      trackEvent("page_view", category, {
        elementId: pagePath,
        metadata: {
          path: pagePath,
          ...metadata,
        },
      })
    },
    [trackEvent],
  )

  // Función para registrar interacción con tooltip
  const trackTooltipInteraction = useCallback(
    (tooltipId: string, interactionType: "hover" | "click", metadata?: Record<string, any>) => {
      trackEvent(interactionType === "hover" ? "tooltip_hover" : "tooltip_click", "general", {
        elementId: tooltipId,
        metadata,
      })
    },
    [trackEvent],
  )

  // Función para registrar búsqueda
  const trackSearch = useCallback(
    (searchTerm: string, category: BehaviorCategory, metadata?: Record<string, any>) => {
      trackEvent("search", category, {
        metadata: {
          term: searchTerm,
          ...metadata,
        },
      })
    },
    [trackEvent],
  )

  // Función para registrar uso de filtros
  const trackFilterUse = useCallback(
    (filterId: string, value: any, category: BehaviorCategory) => {
      trackEvent("filter_use", category, {
        elementId: filterId,
        metadata: {
          filter: filterId,
          value,
        },
      })
    },
    [trackEvent],
  )

  // Función para registrar vista de elemento
  const trackItemView = useCallback(
    (
      itemType: "job" | "company" | "application" | "candidate" | "interview",
      itemId: string,
      metadata?: Record<string, any>,
    ) => {
      const eventTypeMap = {
        job: "job_view",
        company: "company_view",
        application: "application_view",
        candidate: "candidate_view",
        interview: "interview_view",
      } as const

      const categoryMap = {
        job: "job",
        company: "company",
        application: "application",
        candidate: "candidate",
        interview: "interview",
      } as const

      trackEvent(eventTypeMap[itemType], categoryMap[itemType], {
        elementId: itemId,
        metadata,
      })
    },
    [trackEvent],
  )

  // Función para registrar acción del usuario
  const trackUserAction = useCallback(
    (
      actionType: "save" | "apply" | "contact" | "share" | "download" | "submit" | "click",
      category: BehaviorCategory,
      elementId?: string,
      metadata?: Record<string, any>,
    ) => {
      trackEvent(`${actionType}_action` as BehaviorEventType, category, {
        elementId,
        metadata,
      })
    },
    [trackEvent],
  )

  // Función para registrar tiempo de permanencia
  const trackTimeSpent = useCallback(
    (pageId: string, timeInSeconds: number, category: BehaviorCategory) => {
      trackEvent("time_spent", category, {
        elementId: pageId,
        metadata: {
          seconds: timeInSeconds,
        },
      })
    },
    [trackEvent],
  )

  return {
    trackEvent,
    trackPageView,
    trackTooltipInteraction,
    trackSearch,
    trackFilterUse,
    trackItemView,
    trackUserAction,
    trackTimeSpent,
    sessionEvents,
  }
}
