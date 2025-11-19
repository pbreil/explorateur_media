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

  it('devrait traduire tous les éléments visuels de l\'interface principale', () => {
    // Vérifier le titre principal
    cy.get('h1').should('be.visible').and('contain', 'Explorateur de Planètes');

    // Vérifier le tooltip du bouton paramètres
    cy.get('button[icon="pi pi-cog"]').trigger('mouseenter');
    cy.get('.p-tooltip').should('contain', 'Paramètres');

    // Vérifier tous les boutons principaux
    cy.contains('button', 'Afficher les filtres de colonnes').should('be.visible');
    cy.contains('button', 'Télécharger CSV').should('be.visible');

    // Vérifier le dropdown de filtre
    cy.get('p-select').should('exist');

    // Vérifier qu'il n'y a aucune clé i18n visible
    cy.get('body').then(($body) => {
      const text = $body.text();
      expect(text).to.not.include('planetTable.showFilters');
      expect(text).to.not.include('planetTable.hideFilters');
      expect(text).to.not.include('planetTable.downloadCSV');
      expect(text).to.not.include('planetTable.filterAll');
      expect(text).to.not.include('app.title');
      expect(text).to.not.include('app.settings');
    });
  });

  it('devrait traduire correctement le dropdown de filtrage', () => {
    // Ouvrir le dropdown
    cy.get('p-select').click();
    cy.wait(300);

    // Vérifier que les options sont traduites en français
    cy.get('.p-select-option').should('contain', 'Tous les corps célestes');
    cy.get('.p-select-option').should('contain', 'Planètes uniquement');
    cy.get('.p-select-option').should('contain', 'Satellites uniquement');

    // Vérifier qu'il n'y a pas de clés i18n
    cy.get('.p-select-option').should('not.contain', 'planetTable.filter');

    // Fermer le dropdown
    cy.get('body').click(0, 0);
  });

  it('devrait traduire les filtres de colonnes quand ils sont affichés', () => {
    // Afficher les filtres
    cy.contains('button', 'Afficher les filtres de colonnes').click();
    cy.wait(300);

    // Vérifier le titre de la section
    cy.contains('h5', 'Sélectionnez les colonnes à afficher :').should('be.visible');

    // Vérifier que les labels de colonnes sont traduits
    cy.contains('label', 'Nom').should('be.visible');
    cy.contains('label', 'Diamètre').should('be.visible');
    cy.contains('label', 'Distance du Soleil').should('be.visible');
    cy.contains('label', 'Période Orbitale').should('be.visible');
    cy.contains('label', 'Nombre de Lunes').should('be.visible');

    // Vérifier qu'il n'y a pas de clés i18n
    cy.get('.bg-blue-50').should('not.contain', 'planetTable.columns.');
    cy.get('.bg-blue-50').should('not.contain', 'planetTable.selectColumns');

    // Cacher les filtres
    cy.contains('button', 'Masquer les filtres de colonnes').click();
  });

  it('devrait traduire correctement tous les en-têtes de colonnes', () => {
    // Vérifier tous les en-têtes de colonnes visibles
    const expectedHeaders = [
      'Nom',
      'Diamètre',
      'Distance du Soleil',
      'Période Orbitale',
      'Nombre de Lunes',
      'Gravité de Surface',
      'Pression Atmosphérique',
      'Température Moyenne',
      'Masse',
      'Année de Découverte',
      'Découvreur'
    ];

    // Vérifier qu'au moins quelques en-têtes sont visibles
    cy.get('th').contains('Nom').should('be.visible');
    cy.get('th').contains('Diamètre').should('be.visible');
    cy.get('th').contains('Distance du Soleil').should('be.visible');

    // Vérifier qu'aucun en-tête ne contient une clé i18n
    cy.get('th').each(($th) => {
      const text = $th.text().trim();
      if (text) { // Ignorer les en-têtes vides (icônes de tri)
        expect(text).to.not.include('planetTable.columns.');
      }
    });
  });

  it('devrait traduire les éléments dans toutes les langues disponibles', () => {
    const languages = [
      { code: 'en', name: 'English', title: 'Planet Viewer', showFilters: 'Show Column Filters', downloadCSV: 'Download CSV' },
      { code: 'fr', name: 'Français', title: 'Explorateur de Planètes', showFilters: 'Afficher les filtres de colonnes', downloadCSV: 'Télécharger CSV' },
      { code: 'es', name: 'Español', title: 'Explorador de Planetas', showFilters: 'Mostrar Filtros de Columnas', downloadCSV: 'Descargar CSV' },
      { code: 'de', name: 'Deutsch', title: 'Planeten-Betrachter', showFilters: 'Spaltenfilter anzeigen', downloadCSV: 'CSV herunterladen' },
      { code: 'it', name: 'Italiano', title: 'Visualizzatore di Pianeti', showFilters: 'Mostra Filtri Colonne', downloadCSV: 'Scarica CSV' },
      { code: 'pt', name: 'Português', title: 'Visualizador de Planetas', showFilters: 'Mostrar Filtros de Colunas', downloadCSV: 'Baixar CSV' }
    ];

    languages.forEach((lang) => {
      // Ouvrir les paramètres
      cy.get('button[icon="pi pi-cog"]').click();
      cy.wait(300);

      // Changer la langue
      cy.get('p-select').click();
      cy.contains('.p-select-option', lang.name).click();
      cy.wait(500);

      // Fermer les paramètres (le bouton peut avoir changé de langue)
      cy.get('p-dialog .p-dialog-header button[icon="pi pi-times"]').click();
      cy.wait(500);

      // Vérifier que les textes sont traduits
      cy.get('h1').should('contain', lang.title);
      cy.contains('button', lang.showFilters).should('be.visible');
      cy.contains('button', lang.downloadCSV).should('be.visible');

      // Vérifier qu'il n'y a pas de clés i18n
      cy.get('body').should('not.contain', 'planetTable.');
      cy.get('body').should('not.contain', 'app.title');
    });
  });

  it('devrait afficher les traductions immédiatement au chargement de la page', () => {
    // Recharger la page
    cy.reload();

    // Vérifier que le titre est traduit dès le début (pas de flash de clé i18n)
    cy.get('h1', { timeout: 1000 }).should(($h1) => {
      const text = $h1.text();
      expect(text).to.not.include('app.title');
      expect(text.length).to.be.greaterThan(0);
    });

    // Vérifier que les boutons sont traduits dès le début
    cy.get('button').contains(/Afficher|Show/).should('be.visible');
  });

  it('devrait vérifier qu\'aucune clé i18n n\'est visible après changement de filtre', () => {
    // Changer le filtre pour afficher seulement les satellites
    cy.get('p-select').click();
    cy.contains('.p-select-option', 'Satellites uniquement').click();
    cy.wait(300);

    // Vérifier qu'il n'y a pas de clés i18n
    cy.get('body').should('not.contain', 'planetTable.');

    // Afficher les filtres de colonnes
    cy.contains('button', 'Afficher les filtres de colonnes').click();
    cy.wait(300);

    // Vérifier que les colonnes spécifiques aux satellites sont traduites
    cy.contains('label', 'Nom de la Planète').should('be.visible');
    cy.contains('label', 'Distance de la Planète').should('be.visible');

    // Vérifier qu'il n'y a pas de clés i18n
    cy.get('.bg-blue-50').should('not.contain', 'planetTable.columns.');
  });
});
