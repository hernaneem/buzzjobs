import { trackUserBehavior, syncLocalEvents } from "@/lib/services/user-behavior-service"
import { createClient } from "@supabase/supabase-js"
import { jest } from "@jest/globals"

// Mock de Supabase
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          then: jest.fn().mockImplementation((callback) => Promise.resolve(callback({ data: [], error: null }))),
        }),
      }),
    }),
  })),
}))

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("User Behavior Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.clear()
  })

  test("trackUserBehavior inserts event into database", async () => {
    const userId = "user-123"
    const eventType = "page_view"
    const category = "navigation"
    const elementId = "/jobs"
    const metadata = { referrer: "/home" }

    await trackUserBehavior(userId, eventType, category, elementId, metadata)

    // Verificar que se llamó a createClient
    expect(createClient).toHaveBeenCalled()

    // Verificar que se llamó a from con la tabla correcta
    const supabaseClient = createClient("", "")
    expect(supabaseClient.from).toHaveBeenCalledWith("user_behavior_events")

    // Verificar que se llamó a insert con los datos correctos
    const fromResult = supabaseClient.from("user_behavior_events")
    expect(fromResult.insert).toHaveBeenCalledWith({
      user_id: userId,
      event_type: eventType,
      category,
      element_id: elementId,
      metadata,
    })
  })

  test("syncLocalEvents processes stored events", async () => {
    const userId = "user-123"
    const storedEvents = [
      {
        eventType: "page_view",
        category: "navigation",
        elementId: "/jobs",
        metadata: { referrer: "/home" },
        timestamp: new Date().toISOString(),
      },
      {
        eventType: "click",
        category: "ui",
        elementId: "apply-button",
        metadata: { jobId: "job-456" },
        timestamp: new Date().toISOString(),
      },
    ]

    // Almacenar eventos en localStorage
    localStorageMock.setItem("behavior_events", JSON.stringify(storedEvents))

    await syncLocalEvents(userId)

    // Verificar que se llamó a createClient
    expect(createClient).toHaveBeenCalled()

    // Verificar que se llamó a from con la tabla correcta
    const supabaseClient = createClient("", "")
    expect(supabaseClient.from).toHaveBeenCalledWith("user_behavior_events")

    // Verificar que se llamó a insert para cada evento
    const fromResult = supabaseClient.from("user_behavior_events")
    expect(fromResult.insert).toHaveBeenCalledTimes(storedEvents.length)

    // Verificar que se limpiaron los eventos de localStorage
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("behavior_events")
  })

  test("syncLocalEvents handles empty localStorage", async () => {
    const userId = "user-123"

    // No almacenar eventos en localStorage
    localStorageMock.setItem("behavior_events", JSON.stringify([]))

    await syncLocalEvents(userId)

    // Verificar que no se llamó a insert
    const supabaseClient = createClient("", "")
    const fromResult = supabaseClient.from("user_behavior_events")
    expect(fromResult.insert).not.toHaveBeenCalled()
  })

  test("syncLocalEvents handles invalid JSON", async () => {
    const userId = "user-123"

    // Almacenar JSON inválido en localStorage
    localStorageMock.setItem("behavior_events", "invalid-json")

    await syncLocalEvents(userId)

    // Verificar que no se llamó a insert
    const supabaseClient = createClient("", "")
    const fromResult = supabaseClient.from("user_behavior_events")
    expect(fromResult.insert).not.toHaveBeenCalled()

    // Verificar que se limpió localStorage
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("behavior_events")
  })
})
