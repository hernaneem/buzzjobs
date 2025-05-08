"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import { BehaviorTrackingProvider, useBehaviorTracking } from "@/contexts/behavior-tracking-context"
import { mockAuthContext } from "../mocks/supabase"

// Mock del contexto de autenticación
jest.mock("@/contexts/auth-context", () => ({
  useAuth: () => mockAuthContext,
}))

// Mock del servicio de comportamiento de usuario
jest.mock("@/lib/services/user-behavior-service", () => ({
  trackUserBehavior: jest.fn().mockResolvedValue({ success: true }),
}))

// Componente de prueba que usa el contexto
const TestComponent = () => {
  const { isEnabled, setIsEnabled, trackEvent } = useBehaviorTracking()

  return (
    <div>
      <div data-testid="tracking-status">{isEnabled ? "Enabled" : "Disabled"}</div>
      <button onClick={() => setIsEnabled(!isEnabled)} data-testid="toggle-button">
        Toggle Tracking
      </button>
      <button onClick={() => trackEvent("test_click", "ui", { elementId: "test-button" })} data-testid="track-button">
        Track Event
      </button>
    </div>
  )
}

describe("BehaviorTrackingContext", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  test("provides tracking context to children", () => {
    render(
      <BehaviorTrackingProvider>
        <TestComponent />
      </BehaviorTrackingProvider>,
    )

    expect(screen.getByTestId("tracking-status")).toHaveTextContent("Enabled")
  })

  test("allows toggling tracking state", () => {
    render(
      <BehaviorTrackingProvider>
        <TestComponent />
      </BehaviorTrackingProvider>,
    )

    // Inicialmente habilitado
    expect(screen.getByTestId("tracking-status")).toHaveTextContent("Enabled")

    // Deshabilitar
    fireEvent.click(screen.getByTestId("toggle-button"))
    expect(screen.getByTestId("tracking-status")).toHaveTextContent("Disabled")

    // Habilitar de nuevo
    fireEvent.click(screen.getByTestId("toggle-button"))
    expect(screen.getByTestId("tracking-status")).toHaveTextContent("Enabled")
  })

  test("stores tracking preference in localStorage", () => {
    render(
      <BehaviorTrackingProvider>
        <TestComponent />
      </BehaviorTrackingProvider>,
    )

    // Deshabilitar tracking
    fireEvent.click(screen.getByTestId("toggle-button"))

    // Verificar que se guarda en localStorage
    expect(localStorage.getItem("tracking_enabled")).toBe("false")

    // Habilitar de nuevo
    fireEvent.click(screen.getByTestId("toggle-button"))
    expect(localStorage.getItem("tracking_enabled")).toBe("true")
  })

  test("respects initial tracking preference from localStorage", () => {
    // Establecer preferencia en localStorage
    localStorage.setItem("tracking_enabled", "false")

    render(
      <BehaviorTrackingProvider>
        <TestComponent />
      </BehaviorTrackingProvider>,
    )

    // Debería estar deshabilitado inicialmente
    expect(screen.getByTestId("tracking-status")).toHaveTextContent("Disabled")
  })

  test("stores events in localStorage when tracking is enabled", () => {
    render(
      <BehaviorTrackingProvider>
        <TestComponent />
      </BehaviorTrackingProvider>,
    )

    // Registrar un evento
    fireEvent.click(screen.getByTestId("track-button"))

    // Verificar que se almacena en localStorage
    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")
    expect(storedEvents.length).toBe(1)
    expect(storedEvents[0].eventType).toBe("test_click")
    expect(storedEvents[0].category).toBe("ui")
    expect(storedEvents[0].elementId).toBe("test-button")
  })

  test("does not store events when tracking is disabled", () => {
    render(
      <BehaviorTrackingProvider>
        <TestComponent />
      </BehaviorTrackingProvider>,
    )

    // Deshabilitar tracking
    fireEvent.click(screen.getByTestId("toggle-button"))

    // Intentar registrar un evento
    fireEvent.click(screen.getByTestId("track-button"))

    // Verificar que no se almacena en localStorage
    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")
    expect(storedEvents.length).toBe(0)
  })
})
