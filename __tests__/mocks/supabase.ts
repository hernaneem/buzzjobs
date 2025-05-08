import { jest } from "@jest/globals"

// Mock para Supabase
export const mockSupabase = {
  auth: {
    getUser: jest.fn(),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  },
  from: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    then: jest.fn().mockImplementation((callback) => Promise.resolve(callback({ data: [], error: null }))),
  }),
  storage: {
    from: jest.fn().mockReturnValue({
      upload: jest.fn(),
      getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: "https://example.com/image.jpg" } }),
    }),
  },
}

// Mock para el contexto de autenticación
export const mockAuthContext = {
  user: {
    id: "test-user-id",
    email: "test@example.com",
    user_metadata: {
      full_name: "Test User",
      role: "candidate",
    },
  },
  isLoading: false,
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
}

// Mock para el contexto de seguimiento de comportamiento
export const mockBehaviorTrackingContext = {
  isEnabled: true,
  setIsEnabled: jest.fn(),
  trackEvent: jest.fn(),
  trackPageView: jest.fn(),
  trackItemView: jest.fn(),
  trackUserAction: jest.fn(),
  trackSearch: jest.fn(),
  trackFilter: jest.fn(),
  trackTooltipInteraction: jest.fn(),
}

// Mock para el contexto de preferencias de tooltips
export const mockTooltipPreferencesContext = {
  isTooltipEnabled: jest.fn().mockReturnValue(true),
  isFieldEnabled: jest.fn().mockReturnValue(true),
  profiles: [
    {
      id: "default",
      name: "Default",
      description: "Default profile",
      isDefault: true,
      settings: {
        job: { enabled: true, fields: ["title", "company", "location"] },
        company: { enabled: true, fields: ["name", "industry", "size"] },
        application: { enabled: true, fields: ["status", "applied"] },
        interview: { enabled: true, fields: ["date", "time"] },
        candidate: { enabled: true, fields: ["name", "position"] },
      },
    },
  ],
  activeProfileId: "default",
  setActiveProfile: jest.fn(),
  createProfile: jest.fn(),
  updateProfile: jest.fn(),
  deleteProfile: jest.fn(),
  duplicateProfile: jest.fn(),
}
