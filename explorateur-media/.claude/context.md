# Explorateur de Planètes - Contexte du Projet

## Vue d'ensemble du projet

Explorateur de Planètes est une application web Angular qui permet de visualiser et d'explorer des informations sur les planètes du système solaire et leurs satellites. L'application met l'accent sur l'internationalisation (i18n) et offre une expérience utilisateur multilingue.

## Stack technique

- **Framework**: Angular 20.2.0 (standalone components)
- **UI Library**: PrimeNG 20.3.0 (composants Table, Button, Select, Dialog, etc.)
- **Styling**: TailwindCSS
- **Internationalisation**: ngx-translate 17.0.0
- **Tests E2E**: Cypress 15.7.0
- **Langues supportées**: Français (par défaut), Anglais, Espagnol, Portugais, Italien, Allemand

## Structure du projet

```
explorateur-media/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── settings/          # Composant de configuration (changement de langue)
│   │   ├── models/
│   │   │   └── planet.model.ts    # Modèles de données (Planet, Satellite)
│   │   ├── services/
│   │   │   ├── language.service.ts # Service de gestion de l'i18n
│   │   │   └── planet.service.ts   # Service de données des planètes
│   │   ├── planet-table/          # Composant principal du tableau
│   │   ├── planet-details/        # Composant de détails d'une planète
│   │   ├── app.component.*        # Composant racine
│   │   ├── app.config.ts          # Configuration de l'app (TranslateModule)
│   │   └── app.routes.ts          # Routes de l'application
│   ├── assets/
│   │   └── i18n/                  # Fichiers de traduction JSON
│   │       ├── fr.json            # Français
│   │       ├── en.json            # Anglais
│   │       ├── es.json            # Espagnol
│   │       ├── de.json            # Allemand
│   │       ├── it.json            # Italien
│   │       └── pt.json            # Portugais
│   └── locale/                    # XLF files (Angular i18n - non utilisés)
├── cypress/
│   ├── e2e/
│   │   └── i18n.cy.ts             # Tests E2E d'internationalisation
│   └── support/
│       └── commands.ts            # Commandes Cypress personnalisées
└── docs/                          # Build pour GitHub Pages
```

## Architecture et fonctionnalités clés

### Internationalisation (i18n)

**C'est la fonctionnalité la plus critique du projet.**

#### Configuration
- Utilise `@ngx-translate/core` et `@ngx-translate/http-loader`
- Les traductions sont chargées depuis `/assets/i18n/{lang}.json`
- Configuration dans `app.config.ts` avec `APP_INITIALIZER` pour charger les traductions avant le démarrage de l'app

#### LanguageService
- **Fichier**: `src/app/services/language.service.ts`
- **Responsabilités**:
  - Initialiser la langue au démarrage (par ordre: cookie > langue du navigateur > français)
  - Gérer le changement de langue
  - Sauvegarder la langue choisie dans un cookie
  - Fournir `waitForInitialization()` pour garantir que les traductions sont chargées

#### Garde de rendu
**IMPORTANT**: Le `AppComponent` utilise une garde `*ngIf="translationsLoaded"` pour ne rien afficher tant que les traductions ne sont pas chargées. Cela évite le "flash" des clés i18n (ex: "app.title" au lieu de "Explorateur de Planètes").

#### Structure des clés de traduction

```typescript
{
  "app": {
    "title": "...",
    "settings": "..."
  },
  "settings": {
    "title": "...",
    "language": "...",
    "selectLanguage": "...",
    "close": "...",
    "save": "..."
  },
  "planetTable": {
    "showFilters": "...",
    "hideFilters": "...",
    "selectColumns": "...",
    "downloadCSV": "...",
    "filterAll": "...",
    "filterPlanets": "...",
    "filterSatellites": "...",
    "columns": {
      "name": "...",
      "diameter": "...",
      "distanceFromSun": "...",
      // etc.
    }
  },
  "planetDetails": {
    "backToList": "...",
    "generalInformation": "...",
    // etc.
  }
}
```

### Composants principaux

#### AppComponent
- Affiche le titre et le bouton de paramètres
- Garde de rendu pour attendre les traductions
- Spinner de chargement pendant l'initialisation

#### PlanetTableComponent
- Tableau avec tri, pagination, filtrage
- Colonnes configurables (avec sauvegarde dans cookies)
- Filtrage par type (tous/planètes/satellites)
- Export CSV
- Utilise `translate.instant()` pour les traductions programmatiques

#### SettingsComponent
- Dialog modal pour changer la langue
- Sélecteur de langue avec noms natifs
- Fermeture automatique après changement de langue

### Tests Cypress

#### Commandes personnalisées
- `cy.waitForTranslations()`: Attend que les traductions soient chargées (vérifie l'absence de clés i18n dans le DOM)

#### Tests i18n complets
Le fichier `cypress/e2e/i18n.cy.ts` contient des tests exhaustifs:
1. Vérification de la langue par défaut (français)
2. Changement de langue
3. Absence de clés i18n dans l'interface
4. Persistance de la langue après rechargement
5. Traduction des en-têtes de colonnes
6. Traduction de tous les éléments visuels
7. Traduction du dropdown de filtrage
8. Traduction des filtres de colonnes
9. Test de toutes les langues disponibles
10. Vérification du chargement immédiat des traductions
11. Traduction après changement de filtre

## Bonnes pratiques à respecter

### Internationalisation

1. **TOUJOURS** utiliser le pipe `translate` dans les templates:
   ```html
   {{ 'app.title' | translate }}
   [label]="'button.label' | translate"
   ```

2. **TOUJOURS** utiliser `translate.instant()` pour les traductions programmatiques:
   ```typescript
   this.translate.instant('planetTable.filterAll')
   ```

3. **TOUJOURS** attendre l'initialisation dans `ngOnInit()`:
   ```typescript
   async ngOnInit(): Promise<void> {
     await this.languageService.waitForInitialization();
     // Suite du code...
   }
   ```

4. **TOUJOURS** s'abonner aux changements de langue pour mettre à jour les textes dynamiques:
   ```typescript
   this.translate.onLangChange.subscribe(() => {
     this.updateTranslatedTexts();
   });
   ```

5. **JAMAIS** afficher de contenu traduit sans la garde `translationsLoaded`

### Développement Angular

1. Utiliser des **standalone components** (pas de NgModule)
2. Importer `CommonModule` pour utiliser `*ngIf`, `*ngFor`, etc.
3. Utiliser `TranslateModule` dans les imports de chaque composant qui utilise le pipe translate

### Tests

1. Toujours tester l'absence de clés i18n dans l'interface
2. Tester tous les scénarios de changement de langue
3. Tester la persistance des préférences (cookies)
4. Tester visuellement avec `cy.contains()` et `cy.get().should('contain', ...)`

## Problèmes courants et solutions

### Problème: Les clés i18n s'affichent au lieu des traductions

**Causes possibles**:
1. Les traductions ne sont pas encore chargées → Utiliser la garde `translationsLoaded`
2. La clé n'existe pas dans le fichier JSON → Vérifier le fichier de traduction
3. Le `TranslateModule` n'est pas importé → Ajouter dans les imports du composant
4. Le service n'est pas initialisé → Appeler `await languageService.waitForInitialization()`

**Solutions**:
1. Ajouter `*ngIf="translationsLoaded"` sur les éléments qui utilisent des traductions
2. Vérifier que tous les fichiers JSON contiennent la clé
3. Importer `TranslateModule` dans le composant
4. Attendre l'initialisation dans `ngOnInit()`

### Problème: Les traductions ne se mettent pas à jour après changement de langue

**Cause**: Les textes sont traduits avec `translate.instant()` mais pas mis à jour

**Solution**: S'abonner à `translate.onLangChange` et réexécuter les traductions

### Problème: Les cookies ne sont pas sauvegardés

**Vérifier**:
1. Le domaine et le path du cookie
2. La durée de vie (`max-age`)
3. Les restrictions du navigateur

## Scripts NPM importants

```bash
npm start                 # Démarre le serveur de développement (port 4200)
npm run build             # Build de production (avec tests E2E)
npm run build:gh-pages    # Build pour GitHub Pages
npm run test:unit         # Tests unitaires (Karma)
npm run test:e2e          # Tests E2E (Cypress)
npm run cypress:open      # Ouvre Cypress en mode interactif
npm run cypress:run       # Lance Cypress en mode headless
```

## Déploiement

L'application est déployée sur GitHub Pages:
- URL de production: https://pbreil.github.io/explorateur_media/
- Le build est dans le dossier `docs/`
- Configuration: `--base-href /explorateur_media/`

## Points d'attention pour Claude Code

1. **Toujours vérifier l'i18n**: Quand tu modifies un composant, assure-toi que toutes les chaînes de caractères sont traduites
2. **Tester visuellement**: Utilise Cypress pour tester que les traductions s'affichent correctement
3. **Ne pas casser les tests**: Avant de commit, vérifie que tous les tests passent
4. **Respecter la structure**: Utilise les patterns existants (standalone components, translate pipe, etc.)
5. **Documenter les changements**: Si tu ajoutes de nouvelles clés de traduction, documente-les

## Ressources

- [Documentation ngx-translate](https://github.com/ngx-translate/core)
- [Documentation PrimeNG](https://primeng.org/)
- [Documentation Angular](https://angular.dev/)
- [Documentation Cypress](https://docs.cypress.io/)
