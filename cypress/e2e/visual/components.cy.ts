describe("Pruebas de regresión visual de componentes", () => {
  beforeEach(() => {
    // Desactivar animaciones para evitar falsos positivos
    cy.visit("/", {
      onBeforeLoad(win) {
        win.document.documentElement.classList.add("no-animations")
      },
    })

    // Esperar a que la página se cargue completamente
    cy.get("body").should("be.visible")
    cy.wait(1000) // Esperar a que se completen las animaciones iniciales
  })

  it("Navbar debe verse correctamente", () => {
    cy.get("nav").should("be.visible")
    cy.get("nav").matchImageSnapshot("navbar")
  })

  it("Footer debe verse correctamente", () => {
    cy.get("footer").scrollIntoView()
    cy.get("footer").should("be.visible")
    cy.get("footer").matchImageSnapshot("footer")
  })

  it("Botón primario debe verse correctamente", () => {
    cy.contains("button", "Iniciar sesión").should("be.visible")
    cy.contains("button", "Iniciar sesión").matchImageSnapshot("boton-primario")
  })

  it("Botón secundario debe verse correctamente", () => {
    cy.contains("button", "Registrarse").should("be.visible")
    cy.contains("button", "Registrarse").matchImageSnapshot("boton-secundario")
  })
})
