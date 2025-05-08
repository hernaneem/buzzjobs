describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("displays the main heading", () => {
    cy.get("h1").should("contain", "BuzzJobs")
  })

  it("has navigation links", () => {
    cy.get("nav").within(() => {
      cy.contains("a", "Empleos").should("be.visible")
      cy.contains("a", "Empresas").should("be.visible")
      cy.contains("a", "Blog").should("be.visible")
    })
  })

  it("has a search form", () => {
    cy.get("form").within(() => {
      cy.get("input[placeholder*='Buscar']").should("be.visible")
      cy.get("button[type='submit']").should("be.visible")
    })
  })

  it("navigates to jobs page when clicking on jobs link", () => {
    cy.contains("a", "Empleos").click()
    cy.url().should("include", "/jobs")
  })

  it("navigates to companies page when clicking on companies link", () => {
    cy.contains("a", "Empresas").click()
    cy.url().should("include", "/companies")
  })

  it("has a footer with links", () => {
    cy.get("footer").within(() => {
      cy.contains("a", "Acerca de").should("be.visible")
      cy.contains("a", "Contacto").should("be.visible")
      cy.contains("a", "Términos").should("be.visible")
      cy.contains("a", "Privacidad").should("be.visible")
    })
  })

  it("has call-to-action buttons", () => {
    cy.contains("button", /Iniciar sesión|Registrarse/).should("be.visible")
  })
})
