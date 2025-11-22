/// <reference types="cypress" />

// Custom command to wait for translations to be loaded
Cypress.Commands.add('waitForTranslations', () => {
  // Wait for the app to be loaded (no i18n keys visible)
  cy.get('body').should('not.contain', 'app.title');
  cy.get('body').should('not.contain', 'planetTable.');
  cy.wait(100); // Small delay to ensure DOM is stable
});

// Custom command to change language
Cypress.Commands.add('changeLanguage', (languageCode: string) => {
  // Navigate to settings page
  cy.get('[data-cy="settings-button"]').should('be.visible').click();

  // Wait for settings page to load
  cy.url().should('include', '/settings');

  // Select language
  cy.get('p-select[data-cy="language-selector"]').should('be.visible').click();
  cy.get('.p-select-overlay').should('be.visible');
  cy.contains('.p-select-option', new RegExp(languageCode, 'i')).click();

  // Wait for language to be applied
  cy.wait(500);
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for translations to be loaded
       * @example cy.waitForTranslations()
       */
      waitForTranslations(): Chainable<void>;

      /**
       * Change the application language
       * @example cy.changeLanguage('en')
       */
      changeLanguage(languageCode: string): Chainable<void>;
    }
  }
}

export {};
