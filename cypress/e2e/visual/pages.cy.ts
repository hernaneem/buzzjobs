describe("Pruebas de regresión visual de páginas", () => {
  it("Página de inicio debe verse correctamente", () => {
    cy.visit("/")
    // Esperar a que se carguen todos los elementos
    cy.get("body").should("be.visible")
    cy.wait(1000)
    cy.matchImageSnapshot("pagina-inicio")
  })

  it("Página de empleos debe verse correctamente", () => {
    cy.visit("/jobs")
    // Esperar a que se carguen todos los elementos
    cy.get("body").should("be.visible")
    cy.wait(1000)
    cy.matchImageSnapshot("pagina-empleos")
  })

  it("Página de empresas debe verse correctamente", () => {
    cy.visit("/companies")
    // Esperar a que se carguen todos los elementos
    cy.get("body").should("be.visible")
    cy.wait(1000)
    cy.matchImageSnapshot("pagina-empresas")
  })

  it("Página de blog debe verse correctamente", () => {
    cy.visit("/blog")
    // Esperar a que se carguen todos los elementos
    cy.get("body").should("be.visible")
    cy.wait(1000)
    cy.matchImageSnapshot("pagina-blog")
  })
})
