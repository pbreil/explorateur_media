/// <reference types="cypress" />

describe('Clic sur les lunes/satellites', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForTranslations();
  });

  it('devrait afficher les satellites comme cliquables dans le tableau principal', () => {
    // Filtrer pour afficher uniquement les satellites
    cy.get('p-select').click();
    cy.get('.p-select-option').contains(/satellites|moons/i).click();
    cy.wait(300);

    // Vérifier que les lignes de satellites ont le curseur pointer et l'effet hover
    cy.get('[data-cy="satellite-row"]').first().should('have.class', 'cursor-pointer');
    cy.get('[data-cy="satellite-row"]').first().should('have.class', 'hover:bg-blue-100');
  });

  it('devrait naviguer vers les détails d\'un satellite depuis le tableau principal', () => {
    // Filtrer pour afficher uniquement les satellites
    cy.get('p-select').click();
    cy.get('.p-select-option').contains(/satellites|moons/i).click();
    cy.wait(300);

    // Cliquer sur le premier satellite
    cy.get('[data-cy="satellite-row"]').first().click();

    // Vérifier que l'URL a changé vers les détails du satellite
    cy.url().should('include', '/satellite/');

    // Vérifier que le contenu des détails est affiché
    cy.get('h2').should('be.visible');
    cy.get('p-card').should('be.visible');
  });

  it('devrait afficher les détails complets d\'un satellite', () => {
    // Naviguer directement vers un satellite connu (Moon)
    cy.visit('/satellite/moon');
    cy.waitForTranslations();

    // Vérifier que le nom du satellite est affiché
    cy.get('h2').should('contain', 'Moon');

    // Vérifier que le badge "Satellite de" est affiché
    cy.get('.bg-blue-100').should('contain', 'Earth');

    // Vérifier que les informations générales sont affichées
    cy.contains(/diamètre|diameter/i).should('be.visible');
    cy.contains(/masse|mass/i).should('be.visible');
    cy.contains(/période orbitale|orbital period/i).should('be.visible');

    // Vérifier que la distance depuis la planète est affichée (pas depuis le soleil)
    cy.contains(/distance.*planète|distance.*planet/i).should('be.visible');
  });

  it('devrait permettre de naviguer vers la planète parente depuis les détails d\'un satellite', () => {
    // Naviguer vers un satellite
    cy.visit('/satellite/moon');
    cy.waitForTranslations();

    // Cliquer sur le bouton "Voir la planète"
    cy.contains(/voir.*planète|view.*planet/i).click();

    // Vérifier que l'URL a changé vers les détails de la planète
    cy.url().should('include', '/planet/earth');

    // Vérifier que le nom de la planète est affiché
    cy.get('h2').should('contain', 'Earth');
  });

  it('devrait afficher les satellites comme cliquables dans la page de détails d\'une planète', () => {
    // Naviguer vers une planète avec des satellites (Jupiter)
    cy.visit('/planet/jupiter');
    cy.waitForTranslations();

    // Vérifier que le tableau des satellites est affiché
    cy.contains(/satellites|moons/i).should('be.visible');

    // Vérifier que les lignes de satellites sont cliquables
    cy.get('[data-cy="satellite-row"]').first().should('have.class', 'cursor-pointer');
    cy.get('[data-cy="satellite-row"]').first().should('have.class', 'hover:bg-blue-100');
  });

  it('devrait naviguer vers les détails d\'un satellite depuis la page de détails d\'une planète', () => {
    // Naviguer vers Jupiter qui a des satellites connus
    cy.visit('/planet/jupiter');
    cy.waitForTranslations();

    // Cliquer sur le premier satellite (probablement Io)
    cy.get('[data-cy="satellite-row"]').first().click();

    // Vérifier que l'URL a changé vers les détails du satellite
    cy.url().should('include', '/satellite/');

    // Vérifier que le badge indique Jupiter comme planète parente
    cy.get('.bg-blue-100').should('contain', 'Jupiter');
  });

  it('devrait permettre de revenir en arrière depuis les détails d\'un satellite', () => {
    // Naviguer vers un satellite
    cy.visit('/satellite/moon');
    cy.waitForTranslations();

    // Cliquer sur le bouton retour
    cy.contains(/retour|back/i).first().click();

    // Vérifier que l'on est revenu à la page précédente (tableau ou détails planète)
    // L'URL peut être soit / soit /planet/earth
    cy.url().should('match', /\/(planet\/earth)?$/);
  });

  it('devrait utiliser le composant partagé pour afficher les détails des planètes et satellites', () => {
    // Visiter une planète
    cy.visit('/planet/earth');
    cy.waitForTranslations();

    // Vérifier la présence de app-celestial-body-details
    cy.get('app-celestial-body-details').should('exist');

    // Visiter un satellite
    cy.visit('/satellite/moon');
    cy.waitForTranslations();

    // Vérifier la présence de app-celestial-body-details
    cy.get('app-celestial-body-details').should('exist');
  });
});
