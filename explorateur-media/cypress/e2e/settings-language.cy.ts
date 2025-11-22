/// <reference types="cypress" />

describe('Menu des langues dans Settings', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForTranslations();
  });

  it('devrait afficher le menu de choix de langue dans la page settings', () => {
    // Naviguer vers settings (en cliquant sur le bouton ou en naviguant directement)
    cy.visit('/settings');
    cy.waitForTranslations();

    // Vérifier que le titre de la page est visible
    cy.contains(/paramètres|settings/i).should('be.visible');

    // Vérifier que le label de langue est visible
    cy.contains(/langue|language/i).should('be.visible');

    // Vérifier que le select de langue est visible
    cy.get('p-select').should('be.visible');
  });

  it('devrait afficher toutes les langues disponibles dans le select', () => {
    cy.visit('/settings');
    cy.waitForTranslations();

    // Ouvrir le select de langue
    cy.get('p-select').click();

    // Vérifier que toutes les langues sont présentes
    const languages = ['Français', 'English', 'Español', 'Português', 'Italiano', 'Deutsch'];
    
    languages.forEach(lang => {
      cy.get('.p-select-overlay').should('contain', lang);
    });
  });

  it('devrait permettre de changer de langue depuis la page settings', () => {
    cy.visit('/settings');
    cy.waitForTranslations();

    // Changer la langue vers l'anglais
    cy.get('p-select').click();
    cy.get('.p-select-option').contains('English').click();

    // Attendre que la langue soit appliquée
    cy.wait(500);

    // Vérifier que l'interface est en anglais
    cy.contains('Settings').should('be.visible');

    // Revenir au français
    cy.get('p-select').click();
    cy.get('.p-select-option').contains('Français').click();

    // Attendre que la langue soit appliquée
    cy.wait(500);

    // Vérifier que l'interface est en français
    cy.contains('Paramètres').should('be.visible');
  });

  it('devrait persister le choix de langue après rechargement', () => {
    cy.visit('/settings');
    cy.waitForTranslations();

    // Changer la langue vers l'espagnol
    cy.get('p-select').click();
    cy.get('.p-select-option').contains('Español').click();

    cy.wait(500);

    // Recharger la page
    cy.reload();
    cy.waitForTranslations();

    // Vérifier que la langue est toujours l'espagnol
    cy.contains('Configuración').should('be.visible');

    // Remettre en français pour les autres tests
    cy.get('p-select').click();
    cy.get('.p-select-option').contains('Français').click();
    cy.wait(500);
  });

  it('devrait afficher le select avec un z-index approprié', () => {
    cy.visit('/settings');
    cy.waitForTranslations();

    // Ouvrir le select
    cy.get('p-select').click();

    // Vérifier que le dropdown est visible et au-dessus des autres éléments
    cy.get('.p-select-overlay').should('be.visible');
    cy.get('.p-select-overlay').should('have.css', 'z-index');
  });
});
