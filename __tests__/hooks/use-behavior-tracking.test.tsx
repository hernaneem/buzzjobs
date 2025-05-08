import type React from "react"
import { renderHook, act } from "@testing-library/react"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import { BehaviorTrackingProvider } from "@/contexts/behavior-tracking-context"
import { mockAuthContext } from "../mocks/supabase"

// Mock del contexto de autenticación
jest.mock("@/contexts/auth-context", () => ({
  useAuth: () => mockAuthContext,
}))

// Mock del servicio de comportamiento de usuario
jest.mock("@/lib/services/user-behavior-service", () => ({
  trackUserBehavior: jest.fn().mockResolvedValue({ success: true }),
  BehaviorCategory: {
    JOB: "job",
    COMPANY: "company",
    NAVIGATION: "navigation",
    SEARCH: "search",
    FILTER: "filter",
    UI: "ui",
    TOOLTIP: "tooltip",
  },
}))

describe("useBehaviorTracking Hook", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BehaviorTrackingProvider>{children}</BehaviorTrackingProvider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
    // Limpiar localStorage
    localStorage.clear()
  })

  test("provides tracking methods", () => {
    const { result } = renderHook(() => useBehaviorTracking(), { wrapper })

    expect(result.current.trackEvent).toBeDefined()
    expect(result.current.trackPageView).toBeDefined()
    expect(result.current.trackItemView).toBeDefined()
    expect(result.current.trackUserAction).toBeDefined()
    expect(result.current.trackSearch).toBeDefined()
    expect(result.current.trackFilter).toBeDefined()
    expect(result.current.trackTooltipInteraction).toBeDefined()
    expect(result.current.isEnabled).toBeDefined()
    expect(result.current.setIsEnabled).toBeDefined()
  })

  test("trackEvent adds event to session events", () => {
    const { result } = renderHook(() => useBehaviorTracking(), { wrapper })

    act(() => {
      result.current.trackEvent("test_event", "ui", {
        elementId: "test-button",
        metadata: { page: "home" },
      })
    })

    // Verificar que el evento se almacena en localStorage cuando no hay usuario autenticado
    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")
    expect(storedEvents.length).toBe(1)
    expect(storedEvents[0].eventType).toBe("test_event")
    expect(storedEvents[0].category).toBe("ui")
    expect(storedEvents[0].elementId).toBe("test-button")
    expect(storedEvents[0].metadata).toEqual({ page: "home" })
  })

  test("trackPageView calls trackEvent with correct parameters", () => {
    const { result } = renderHook(() => useBehaviorTracking(), { wrapper })

    act(() => {
      result.current.trackPageView("/jobs", { referrer: "/home" })
    })

    // Verificar que se llama a trackEvent con los parámetros correctos
    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")
    expect(storedEvents.length).toBe(1)
    expect(storedEvents[0].eventType).toBe("page_view")
    expect(storedEvents[0].category).toBe("navigation")
    expect(storedEvents[0].elementId).toBe("/jobs")
    expect(storedEvents[0].metadata).toEqual({ referrer: "/home" })
  })

  test("trackItemView calls trackEvent with correct parameters", () => {
    const { result } = renderHook(() => useBehaviorTracking(), { wrapper })

    act(() => {
      result.current.trackItemView("job", "job-123", { title: "Developer", company: "Acme" })
    })

    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")
    expect(storedEvents.length).toBe(1)
    expect(storedEvents[0].eventType).toBe("item_view")
    expect(storedEvents[0].category).toBe("job")
    expect(storedEvents[0].elementId).toBe("job-123")
    expect(storedEvents[0].metadata).toEqual({ title: "Developer", company: "Acme" })
  })

  test("trackUserAction calls trackEvent with correct parameters", () => {
    const { result } = renderHook(() => useBehaviorTracking(), { wrapper })

    act(() => {
      result.current.trackUserAction("apply", "job", "job-123", { jobTitle: "Developer" })
    })

    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")
    expect(storedEvents.length).toBe(1)
    expect(storedEvents[0].eventType).toBe("user_action")
    expect(storedEvents[0].category).toBe("job")
    expect(storedEvents[0].elementId).toBe("job-123")
    expect(storedEvents[0].metadata).toEqual({
      action: "apply",
      jobTitle: "Developer",
    })
  })

  test("setIsEnabled updates tracking state", () => {
    const { result } = renderHook(() => useBehaviorTracking(), { wrapper })

    // Por defecto, el seguimiento está habilitado
    expect(result.current.isEnabled).toBe(true)

    // Deshabilitar el seguimiento
    act(() => {
      result.current.setIsEnabled(false)
    })

    expect(result.current.isEnabled).toBe(false)

    // Verificar que no se registran eventos cuando está deshabilitado
    act(() => {
      result.current.trackEvent("test_event", "ui", { elementId: "test-button" })
    })

    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")
    expect(storedEvents.length).toBe(0)
  })
})
