describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/")
    // Interceptar llamadas a la API de Supabase
    cy.intercept("POST", "**/auth/v1/token*").as("authRequest")
  })

  it("opens auth modal when clicking login button", () => {
    cy.contains("button", "Iniciar sesión").click()
    cy.get("form").within(() => {
      cy.get("input[type='email']").should("be.visible")
      cy.get("input[type='password']").should("be.visible")
      cy.get("button[type='submit']").should("contain", "Iniciar sesión")
    })
  })

  it("allows user to switch to registration form", () => {
    cy.contains("button", "Iniciar sesión").click()
    cy.contains("¿No tienes una cuenta? Regístrate").click()

    cy.get("form").within(() => {
      cy.get("input[name='fullName']").should("be.visible")
      cy.get("input[type='email']").should("be.visible")
      cy.get("input[type='password']").should("be.visible")
      cy.get("button[type='submit']").should("contain", "Registrarse")
    })
  })

  it("shows validation errors for empty fields", () => {
    cy.contains("button", "Iniciar sesión").click()
    cy.get("button[type='submit']").click()

    cy.contains("El email es requerido").should("be.visible")
    cy.contains("La contraseña es requerida").should("be.visible")
  })

  it("handles login with valid credentials", () => {
    // Mock successful login response
    cy.intercept("POST", "**/auth/v1/token*", {
      statusCode: 200,
      body: {
        access_token: "fake-token",
        user: {
          id: "user-123",
          email: "test@example.com",
          user_metadata: {
            full_name: "Test User",
            role: "candidate",
          },
        },
      },
    }).as("loginSuccess")

    cy.contains("button", "Iniciar sesión").click()

    cy.get("input[type='email']").type("test@example.com")
    cy.get("input[type='password']").type("password123")
    cy.get("button[type='submit']").click()

    cy.wait("@loginSuccess")
    cy.contains("Test User").should("be.visible")
  })

  it("handles login failure", () => {
    // Mock failed login response
    cy.intercept("POST", "**/auth/v1/token*", {
      statusCode: 400,
      body: {
        error: "Invalid login credentials",
        error_description: "Email or password is incorrect",
      },
    }).as("loginFailure")

    cy.contains("button", "Iniciar sesión").click()

    cy.get("input[type='email']").type("wrong@example.com")
    cy.get("input[type='password']").type("wrongpassword")
    cy.get("button[type='submit']").click()

    cy.wait("@loginFailure")
    cy.contains("Email or password is incorrect").should("be.visible")
  })
})
