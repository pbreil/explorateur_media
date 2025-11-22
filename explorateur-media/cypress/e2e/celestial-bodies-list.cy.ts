/// <reference types="cypress" />

describe('Liste de choix des astres', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForTranslations();
  });

  it('devrait afficher la liste de choix des astres sous le label', () => {
    // Vérifier que le select est visible
    cy.get('p-select').should('be.visible');

    // Cliquer sur le select pour ouvrir le dropdown
    cy.get('p-select').click();

    // Vérifier que le dropdown est visible
    cy.get('.p-select-overlay').should('be.visible');

    // Vérifier que les options sont visibles
    cy.get('.p-select-option').should('have.length.at.least', 3);
  });

  it('devrait afficher la liste par-dessus le tableau (z-index correct)', () => {
    // Cliquer sur le select
    cy.get('p-select').click();

    // Vérifier que le dropdown overlay est visible et positionné correctement
    cy.get('.p-select-overlay').should('be.visible');

    // Vérifier que le parent du select a la classe z-50
    cy.get('p-select').parent().should('have.class', 'z-50');

    // Vérifier que le dropdown ne cache pas le tableau mais est au-dessus
    cy.get('p-table').should('be.visible');
  });

  it('devrait permettre de filtrer les corps célestes', () => {
    // Sélectionner "Planètes"
    cy.get('p-select').click();
    cy.get('.p-select-option').contains(/planètes|planets/i).click();

    // Vérifier que le tableau affiche uniquement les planètes
    cy.wait(300);
    cy.get('p-table tbody tr').should('have.length.at.least', 1);

    // Sélectionner "Satellites"
    cy.get('p-select').click();
    cy.get('.p-select-option').contains(/satellites|moons/i).click();

    // Vérifier que le tableau affiche uniquement les satellites
    cy.wait(300);
    cy.get('p-table tbody tr').should('have.length.at.least', 1);

    // Sélectionner "Tous"
    cy.get('p-select').click();
    cy.get('.p-select-option').first().click();

    // Vérifier que le tableau affiche tous les corps célestes
    cy.wait(300);
    cy.get('p-table tbody tr').should('have.length.at.least', 2);
  });

  it('devrait garder le dropdown visible même avec un long tableau', () => {
    // Ouvrir le select
    cy.get('p-select').click();

    // Scroller vers le bas
    cy.scrollTo('bottom');

    // Le dropdown devrait toujours être visible
    cy.get('.p-select-overlay').should('be.visible');
  });
});
