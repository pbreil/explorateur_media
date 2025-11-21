describe('Navigation par le sidebar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForTranslations();
  });

  it('devrait afficher le sidebar fixe avec tous les éléments de menu', () => {
    // Vérifier que le sidebar est visible
    cy.get('.sidebar-fixed').should('be.visible');

    // Vérifier que le header du sidebar est présent
    cy.get('.sidebar-header').should('be.visible');
    cy.get('.sidebar-title').should('contain', 'Navigation');

    // Vérifier que le statut du serveur est affiché
    cy.get('.server-status').should('be.visible');

    // Vérifier que les 3 items de menu sont présents avec les bonnes icônes
    cy.get('p-menu').should('be.visible');
    cy.get('.p-menuitem').should('have.length', 3);

    // Vérifier les icônes des menu items
    cy.get('.p-menuitem-icon.pi-globe').should('be.visible');
    cy.get('.p-menuitem-icon.pi-cog').should('be.visible');
    cy.get('.p-menuitem-icon.pi-server').should('be.visible');
  });

  it('devrait naviguer vers la page Planets au clic sur le premier item', () => {
    // Trouver et cliquer sur l'item Planets
    cy.get('.p-menuitem-icon.pi-globe').parent('.p-menuitem-link').click();
    cy.waitForTranslations();

    // Vérifier qu'on est sur la page d'accueil (table des planètes)
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('p-table').should('be.visible');
  });

  it('devrait naviguer vers la page Settings au clic sur le deuxième item', () => {
    // Trouver et cliquer sur l'item Settings
    cy.get('.p-menuitem-icon.pi-cog').parent('.p-menuitem-link').click();
    cy.waitForTranslations();

    // Vérifier qu'on est sur la page des paramètres
    cy.url().should('include', '/settings');

    // Vérifier que la page settings contient le sélecteur de langue
    cy.get('p-select').should('be.visible');
  });

  it('devrait naviguer vers la page Server Info au clic sur le troisième item', () => {
    // Trouver et cliquer sur l'item Server Info
    cy.get('.p-menuitem-icon.pi-server').parent('.p-menuitem-link').click();
    cy.waitForTranslations();

    // Vérifier qu'on est sur la page server info
    cy.url().should('include', '/server-info');
  });

  it('devrait permettre de naviguer entre différentes pages via le menu', () => {
    // Navigation vers Settings
    cy.get('.p-menuitem-icon.pi-cog').parent('.p-menuitem-link').click();
    cy.wait(300);
    cy.url().should('include', '/settings');

    // Navigation vers Server Info
    cy.get('.p-menuitem-icon.pi-server').parent('.p-menuitem-link').click();
    cy.wait(300);
    cy.url().should('include', '/server-info');

    // Retour vers Planets
    cy.get('.p-menuitem-icon.pi-globe').parent('.p-menuitem-link').click();
    cy.wait(300);
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('p-table').should('be.visible');
  });

  it('devrait afficher le statut du serveur (actif, inactif ou en vérification)', () => {
    // Vérifier que le statut du serveur est affiché
    cy.get('.server-status').should('be.visible');

    // Vérifier qu'une des icônes de statut est présente
    cy.get('.server-status i').should('satisfy', ($icon) => {
      const classes = $icon.attr('class') || '';
      return classes.includes('pi-check-circle') ||
             classes.includes('pi-times-circle') ||
             classes.includes('pi-spinner');
    });

    // Vérifier que le texte du statut est présent
    cy.get('.server-status-text').should('be.visible');
    cy.get('.server-status-text').invoke('text').should('match', /actif|inactif|vérification|active|inactive|checking/i);
  });

  it('devrait conserver le sidebar visible pendant la navigation', () => {
    // Vérifier que le sidebar est visible au départ
    cy.get('.sidebar-fixed').should('be.visible');

    // Naviguer vers Settings
    cy.get('.p-menuitem-icon.pi-cog').parent('.p-menuitem-link').click();
    cy.wait(300);

    // Vérifier que le sidebar est toujours visible
    cy.get('.sidebar-fixed').should('be.visible');

    // Naviguer vers Server Info
    cy.get('.p-menuitem-icon.pi-server').parent('.p-menuitem-link').click();
    cy.wait(300);

    // Vérifier que le sidebar est toujours visible
    cy.get('.sidebar-fixed').should('be.visible');
  });

  it('ne devrait pas afficher le bouton paramètres dans l\'en-tête', () => {
    // Vérifier qu'il n'y a pas de bouton paramètres avec l'icône pi-cog dans l'en-tête principal
    cy.get('h1').parent().find('button[icon="pi pi-cog"]').should('not.exist');
  });

  it('devrait traduire les items du menu selon la langue sélectionnée', () => {
    // Vérifier les labels en français
    cy.get('.p-menuitem-text').first().should('contain', 'Planètes');

    // Aller vers Settings et changer la langue
    cy.get('.p-menuitem-icon.pi-cog').parent('.p-menuitem-link').click();
    cy.wait(300);

    // Changer la langue vers l'anglais
    cy.get('p-select').click();
    cy.contains('.p-select-option', 'English').click();
    cy.waitForTranslations();

    // Vérifier que le menu a été traduit en anglais
    cy.get('.p-menuitem-text').first().should('contain', 'Planets');
    cy.get('.p-menuitem-text').eq(1).should('contain', 'Settings');
    cy.get('.p-menuitem-text').eq(2).should('contain', 'Server Info');
  });

  it('devrait occuper toute la hauteur de la page', () => {
    // Vérifier que le sidebar a une hauteur de 100vh
    cy.get('.sidebar-fixed').should('have.css', 'height', '100vh');

    // Vérifier que le sidebar est positionné en fixed
    cy.get('.sidebar-fixed').should('have.css', 'position', 'fixed');

    // Vérifier que le sidebar commence en haut de la page
    cy.get('.sidebar-fixed').should('have.css', 'top', '0px');
  });
});
