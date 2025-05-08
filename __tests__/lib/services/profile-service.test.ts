import { getProfile, updateProfile, createProfile } from "@/lib/services/profile-service"
import { createClient } from "@supabase/supabase-js"

// Mock de Supabase
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      then: jest.fn().mockImplementation((callback) =>
        Promise.resolve(
          callback({
            data: { id: "profile-123", user_id: "user-123", full_name: "Test User" },
            error: null,
          }),
        ),
      ),
    }),
  })),
}))

describe("Profile Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("getProfile fetches user profile", async () => {
    const userId = "user-123"

    const profile = await getProfile(userId)

    // Verificar que se llamó a createClient
    expect(createClient).toHaveBeenCalled()

    // Verificar que se llamó a from con la tabla correcta
    const supabaseClient = createClient("", "")
    expect(supabaseClient.from).toHaveBeenCalledWith("profiles")

    // Verificar que se llamó a select
    const fromResult = supabaseClient.from("profiles")
    expect(fromResult.select).toHaveBeenCalledWith("*")

    // Verificar que se llamó a eq con el userId
    expect(fromResult.eq).toHaveBeenCalledWith("user_id", userId)

    // Verificar que se llamó a single
    expect(fromResult.single).toHaveBeenCalled()

    // Verificar el resultado
    expect(profile).toEqual({ id: "profile-123", user_id: "user-123", full_name: "Test User" })
  })

  test("updateProfile updates user profile", async () => {
    const profileId = "profile-123"
    const profileData = {
      full_name: "Updated Name",
      bio: "Updated bio",
      skills: ["React", "TypeScript"],
    }

    const result = await updateProfile(profileId, profileData)

    // Verificar que se llamó a createClient
    expect(createClient).toHaveBeenCalled()

    // Verificar que se llamó a from con la tabla correcta
    const supabaseClient = createClient("", "")
    expect(supabaseClient.from).toHaveBeenCalledWith("profiles")

    // Verificar que se llamó a update con los datos correctos
    const fromResult = supabaseClient.from("profiles")
    expect(fromResult.update).toHaveBeenCalledWith(profileData)

    // Verificar que se llamó a eq con el profileId
    expect(fromResult.eq).toHaveBeenCalledWith("id", profileId)

    // Verificar el resultado
    expect(result).toEqual({ id: "profile-123", user_id: "user-123", full_name: "Test User" })
  })

  test("createProfile creates new user profile", async () => {
    const userId = "user-123"
    const profileData = {
      full_name: "New User",
      role: "candidate",
      email: "new@example.com",
    }

    const result = await createProfile(userId, profileData)

    // Verificar que se llamó a createClient
    expect(createClient).toHaveBeenCalled()

    // Verificar que se llamó a from con la tabla correcta
    const supabaseClient = createClient("", "")
    expect(supabaseClient.from).toHaveBeenCalledWith("profiles")

    // Verificar que se llamó a insert con los datos correctos
    const fromResult = supabaseClient.from("profiles")
    expect(fromResult.insert).toHaveBeenCalledWith({
      ...profileData,
      user_id: userId,
    })

    // Verificar el resultado
    expect(result).toEqual({ id: "profile-123", user_id: "user-123", full_name: "Test User" })
  })
})
