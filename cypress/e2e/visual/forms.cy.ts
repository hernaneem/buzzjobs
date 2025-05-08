describe("Pruebas de regresión visual de formularios", () => {
  it("Formulario de inicio de sesión debe verse correctamente", () => {
    cy.visit("/")
    cy.contains("button", "Iniciar sesión").click()
    cy.get('[data-testid="login-form"]').should("be.visible")
    cy.get('[data-testid="login-form"]').matchImageSnapshot("formulario-login")
  })

  it("Formulario de registro debe verse correctamente", () => {
    cy.visit("/")
    cy.contains("button", "Registrarse").click()
    cy.get('[data-testid="register-form"]').should("be.visible")
    cy.get('[data-testid="register-form"]').matchImageSnapshot("formulario-registro")
  })

  it("Formulario de búsqueda de empleos debe verse correctamente", () => {
    cy.visit("/jobs")
    cy.get('[data-testid="job-search-form"]').should("be.visible")
    cy.get('[data-testid="job-search-form"]').matchImageSnapshot("formulario-busqueda-empleos")
  })

  it("Formulario de contacto debe verse correctamente", () => {
    cy.visit("/contact")
    cy.get('[data-testid="contact-form"]').should("be.visible")
    cy.get('[data-testid="contact-form"]').matchImageSnapshot("formulario-contacto")
  })
})
