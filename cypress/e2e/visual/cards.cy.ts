describe("Pruebas de regresión visual de tarjetas", () => {
  beforeEach(() => {
    // Visitar la página de empleos donde se muestran las tarjetas de trabajo
    cy.visit("/jobs")
    // Esperar a que se carguen todos los elementos
    cy.get("body").should("be.visible")
    cy.wait(1000)
  })

  it("JobCard debe verse correctamente", () => {
    cy.get('[data-testid="job-card"]').first().should("be.visible")
    cy.get('[data-testid="job-card"]').first().matchImageSnapshot("job-card")
  })

  it("CompanyCard debe verse correctamente", () => {
    cy.visit("/companies")
    cy.get('[data-testid="company-card"]').first().should("be.visible")
    cy.get('[data-testid="company-card"]').first().matchImageSnapshot("company-card")
  })

  it("ApplicationStatusCard debe verse correctamente", () => {
    // Primero necesitamos iniciar sesión
    cy.login("test@example.com", "password")
    cy.visit("/candidate/applications")
    cy.get('[data-testid="application-status-card"]').first().should("be.visible")
    cy.get('[data-testid="application-status-card"]').first().matchImageSnapshot("application-status-card")
  })
})
