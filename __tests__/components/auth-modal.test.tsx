"use client"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { AuthModal } from "@/components/auth-modal"
import { mockAuthContext } from "../mocks/supabase"

// Mock del contexto de autenticación
jest.mock("@/contexts/auth-context", () => ({
  useAuth: () => mockAuthContext,
}))

describe("AuthModal Component", () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders sign in form by default", () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Iniciar sesión/i })).toBeInTheDocument()
  })

  test("toggles between sign in and sign up forms", () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />)

    // Inicialmente muestra el formulario de inicio de sesión
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument()

    // Cambiar a registro
    fireEvent.click(screen.getByText(/¿No tienes una cuenta\? Regístrate/i))

    // Ahora debería mostrar el formulario de registro
    expect(screen.getByText(/Crear cuenta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Registrarse/i })).toBeInTheDocument()

    // Volver a inicio de sesión
    fireEvent.click(screen.getByText(/¿Ya tienes una cuenta\? Inicia sesión/i))

    // Debería mostrar el formulario de inicio de sesión de nuevo
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument()
  })

  test("handles sign in submission", async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />)

    // Completar formulario
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } })
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "password123" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }))

    // Verificar que se llamó a la función de inicio de sesión
    await waitFor(() => {
      expect(mockAuthContext.signIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
    })
  })

  test("handles sign up submission", async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />)

    // Cambiar a registro
    fireEvent.click(screen.getByText(/¿No tienes una cuenta\? Regístrate/i))

    // Completar formulario
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: "John Doe" } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "password123" } })

    // Seleccionar rol
    fireEvent.click(screen.getByLabelText(/Candidato/i))

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }))

    // Verificar que se llamó a la función de registro
    await waitFor(() => {
      expect(mockAuthContext.signUp).toHaveBeenCalledWith({
        email: "john@example.com",
        password: "password123",
        options: {
          data: {
            full_name: "John Doe",
            role: "candidate",
          },
        },
      })
    })
  })

  test("closes modal when close button is clicked", () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />)

    fireEvent.click(screen.getByRole("button", { name: /Cerrar/i }))

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test("does not render when isOpen is false", () => {
    render(<AuthModal isOpen={false} onClose={mockOnClose} />)

    expect(screen.queryByText(/Iniciar sesión/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument()
  })

  test("shows error message when sign in fails", async () => {
    // Configurar el mock para simular un error
    mockAuthContext.signIn.mockRejectedValueOnce({ message: "Invalid credentials" })

    render(<AuthModal isOpen={true} onClose={mockOnClose} />)

    // Completar formulario
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } })
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "wrong-password" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }))

    // Verificar que se muestra el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    })
  })
})
