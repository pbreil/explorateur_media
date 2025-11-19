/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for translations to be loaded
       * @example cy.waitForTranslations()
       */
      waitForTranslations(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('waitForTranslations', () => {
  // Wait for the page to load and translations to be applied
  cy.wait(500);
});

export {};
