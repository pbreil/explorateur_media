describe('Internationalisation (i18n)', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForTranslations();
  });

  it('devrait afficher les textes traduits en français par défaut', () => {
    // Vérifier que le titre est traduit et n'affiche pas la clé
    cy.get('h1').should('contain', 'Explorateur de Planètes');
    cy.get('h1').should('not.contain', 'app.title');

    // Vérifier que le bouton de filtres est traduit
    cy.contains('button', 'Afficher les filtres de colonnes').should('be.visible');
    cy.contains('button', 'planetTable.showFilters').should('not.exist');

    // Vérifier que le bouton de téléchargement CSV est traduit
    cy.contains('button', 'Télécharger CSV').should('be.visible');
    cy.contains('button', 'planetTable.downloadCSV').should('not.exist');
  });

  it('devrait changer la langue vers l\'anglais', () => {
    // Ouvrir les paramètres
    cy.get('button[icon="pi pi-cog"]').click();
    cy.waitForTranslations();

    // Vérifier que la fenêtre des paramètres est ouverte
    cy.contains('Paramètres').should('be.visible');

    // Changer la langue vers l'anglais
    cy.get('p-select').click();
    cy.contains('.p-select-option', 'English').click();
    cy.waitForTranslations();

    // Fermer les paramètres
    cy.contains('button', 'Close').click();
    cy.waitForTranslations();

    // Vérifier que le titre est maintenant en anglais
    cy.get('h1').should('contain', 'Planet Viewer');
    cy.get('h1').should('not.contain', 'app.title');

    // Vérifier que les boutons sont en anglais
    cy.contains('button', 'Show Column Filters').should('be.visible');
    cy.contains('button', 'Download CSV').should('be.visible');
  });

  it('ne devrait jamais afficher de clés i18n dans l\'interface', () => {
    // Vérifier qu'aucun texte contenant des points caractéristiques des clés i18n n'est affiché
    cy.get('body').should('not.contain', 'planetTable.');
    cy.get('body').should('not.contain', 'app.');
    cy.get('body').should('not.contain', 'settings.');

    // Ouvrir les filtres pour vérifier les colonnes
    cy.contains('button', 'Afficher les filtres de colonnes').click();
    cy.waitForTranslations();

    // Vérifier qu'aucune clé i18n n'est affichée dans les filtres
    cy.get('body').should('not.contain', 'planetTable.columns.');

    // Vérifier que les noms de colonnes sont traduits
    cy.contains('label', 'Nom').should('be.visible');
    cy.contains('label', 'Diamètre').should('be.visible');
  });

  it('devrait conserver la langue sélectionnée après un rechargement', () => {
    // Ouvrir les paramètres et changer la langue
    cy.get('button[icon="pi pi-cog"]').click();
    cy.waitForTranslations();

    cy.get('p-select').click();
    cy.contains('.p-select-option', 'Español').click();
    cy.waitForTranslations();

    cy.contains('button', 'Cerrar').click();
    cy.waitForTranslations();

    // Vérifier que l'interface est en espagnol
    cy.get('h1').should('contain', 'Explorador de Planetas');

    // Recharger la page
    cy.reload();
    cy.waitForTranslations();

    // Vérifier que la langue espagnole est conservée
    cy.get('h1').should('contain', 'Explorador de Planetas');
    cy.get('h1').should('not.contain', 'app.title');
  });

  it('devrait traduire correctement les en-têtes de colonnes du tableau', () => {
    // Attendre que le tableau soit chargé
    cy.get('p-table').should('be.visible');

    // Vérifier les en-têtes de colonnes en français
    cy.get('th').contains('Nom').should('be.visible');
    cy.get('th').contains('Diamètre').should('be.visible');
    cy.get('th').contains('Distance du Soleil').should('be.visible');

    // Vérifier qu'aucune clé n'est affichée
    cy.get('th').should('not.contain', 'planetTable.columns.');
  });
});
