/// <reference types="cypress" />
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command"

// Configuración de cypress-image-snapshot
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // umbral de fallo del 3%
  failureThresholdType: "percent",
  customDiffConfig: { threshold: 0.1 },
  capture: "viewport", // captura el viewport completo
})

// Comandos existentes
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/")
  cy.contains("button", "Iniciar sesión").click()

  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add("getByTestId", (testId) => {
  return cy.get(`[data-testid="${testId}"]`)
})

Cypress.Commands.add("checkAccessibility", () => {
  cy.injectAxe()
  cy.checkA11y()
})

// Comando para pruebas visuales de componentes específicos
Cypress.Commands.add("captureComponentScreenshot", (selector, name) => {
  cy.get(selector).should("be.visible")
  cy.get(selector).matchImageSnapshot(name)
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
      checkAccessibility(): Chainable<void>
      matchImageSnapshot(name?: string): Chainable<void>
      captureComponentScreenshot(selector: string, name: string): Chainable<void>
    }
  }
}
