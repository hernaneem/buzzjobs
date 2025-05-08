import { render, screen, fireEvent } from "@testing-library/react"
import { ProfileSelector } from "@/components/profile-selector"
import { mockAuthContext } from "../mocks/supabase"

// Mock del contexto de autenticación
jest.mock("@/contexts/auth-context", () => ({
  useAuth: () => mockAuthContext,
}))

// Mock de next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe("ProfileSelector Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders correctly for candidate user", () => {
    // Configurar el mock para un usuario candidato
    const candidateUser = {
      ...mockAuthContext.user,
      user_metadata: {
        ...mockAuthContext.user.user_metadata,
        role: "candidate",
      },
    }

    jest.spyOn(mockAuthContext, "user", "get").mockReturnValue(candidateUser)

    render(<ProfileSelector />)

    expect(screen.getByText(/Test User/i)).toBeInTheDocument()
    expect(screen.getByText(/Candidato/i)).toBeInTheDocument()
  })

  test("renders correctly for employer user", () => {
    // Configurar el mock para un usuario empleador
    const employerUser = {
      ...mockAuthContext.user,
      user_metadata: {
        ...mockAuthContext.user.user_metadata,
        role: "employer",
      },
    }

    jest.spyOn(mockAuthContext, "user", "get").mockReturnValue(employerUser)

    render(<ProfileSelector />)

    expect(screen.getByText(/Test User/i)).toBeInTheDocument()
    expect(screen.getByText(/Empleador/i)).toBeInTheDocument()
  })

  test("opens dropdown menu when clicked", () => {
    render(<ProfileSelector />)

    // Clic en el selector de perfil
    fireEvent.click(screen.getByRole("button"))

    // Verificar que se muestra el menú desplegable
    expect(screen.getByText(/Mi perfil/i)).toBeInTheDocument()
    expect(screen.getByText(/Configuración/i)).toBeInTheDocument()
    expect(screen.getByText(/Cerrar sesión/i)).toBeInTheDocument()
  })

  test("calls signOut when logout option is clicked", () => {
    render(<ProfileSelector />)

    // Abrir menú
    fireEvent.click(screen.getByRole("button"))

    // Clic en cerrar sesión
    fireEvent.click(screen.getByText(/Cerrar sesión/i))

    // Verificar que se llamó a la función de cierre de sesión
    expect(mockAuthContext.signOut).toHaveBeenCalledTimes(1)
  })

  test("renders avatar with initials when no image is provided", () => {
    render(<ProfileSelector />)

    // Verificar que se muestra el avatar con iniciales
    expect(screen.getByText(/TU/i)).toBeInTheDocument()
  })

  test("renders avatar with image when provided", () => {
    // Configurar el mock para un usuario con imagen de perfil
    const userWithImage = {
      ...mockAuthContext.user,
      user_metadata: {
        ...mockAuthContext.user.user_metadata,
        avatar_url: "https://example.com/avatar.jpg",
      },
    }

    jest.spyOn(mockAuthContext, "user", "get").mockReturnValue(userWithImage)

    render(<ProfileSelector />)

    // Verificar que se muestra la imagen
    const avatar = screen.getByRole("img")
    expect(avatar).toHaveAttribute("src", expect.stringContaining("avatar.jpg"))
  })
})
