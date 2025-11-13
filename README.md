# Explorateur Média

Application web d'exploration de contenu multimédia.

## Site web

L'application est disponible à l'adresse suivante : [https://pbreil.github.io/explorateur_media/](https://pbreil.github.io/explorateur_media/)

## Description du projet

Ce repository contient **deux applications distinctes** :

### 1. Planet Viewer (Application principale)

Une application web Angular moderne qui affiche des informations sur les planètes du système solaire. Les utilisateurs peuvent consulter un tableau de planètes avec des colonnes triables et cliquer sur chaque planète pour voir des détails supplémentaires.

**Technologies utilisées :**
- Angular 20.2.0 (avec composants standalone)
- PrimeNG 20.1.1 (composants UI)
- TypeScript 5.9.2
- Support multilingue (Anglais, Français, Espagnol)
- Déployé sur GitHub Pages

**Fonctionnalités :**
- Affichage d'un tableau interactif de 8 planètes
- Tri multi-colonnes
- Export CSV
- Vue détaillée pour chaque planète
- Navigation dynamique avec routing
- Interface responsive
- Tests unitaires avec Jasmine et Karma

### 2. Hello World

Une API REST simple démontrant un service web Java basique avec Spring Boot.

**Technologies utilisées :**
- Spring Boot 3.4.0
- Java 17
- Maven

**Fonctionnalités :**
- Endpoint GET à la racine retournant "Hello world"

## Structure du projet

```
explorateur_media/
├── explorateur-media/      # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── planet-table/         # Composant tableau
│   │   │   ├── planet-details/       # Composant détails
│   │   │   ├── planet.service.ts     # Service de données
│   │   │   └── ...
│   │   └── locale/                    # Fichiers de traduction i18n
│   └── ...
├── hello-world/        # Application Spring Boot
│   └── src/main/java/com/example/helloworld/
└── docs/               # Build déployé sur GitHub Pages
```

## Données des planètes

L'application Planet Viewer affiche les informations suivantes pour chaque planète :
- Nom
- Diamètre
- Distance par rapport au Soleil
- Nombre de lunes

Les données sont actuellement codées en dur dans le service `PlanetService` et couvrent les 8 planètes du système solaire (Mercure à Neptune).

## Architecture technique

### Planet Viewer

L'application utilise une architecture Angular moderne avec :
- **Composants standalone** (pas de NgModule)
- **Routing fonctionnel** pour la navigation
- **Service singleton** pour la gestion des données
- **PrimeNG** pour les composants UI avancés
- **TypeScript strict** pour la sécurité du typage

### Déploiement

Deux workflows GitHub Actions sont configurés :
- `build-docs.yml` : Build manuel avec commit dans le dossier docs
- `deploy-pages.yml` : Déploiement automatique sur GitHub Pages lors des pushs sur main

## Développement

### Explorateur Média

```bash
cd explorateur-media
npm install
npm start
```

L'application sera accessible sur `http://localhost:4200`

### Hello World

```bash
cd hello-world
./mvnw spring-boot:run
```

L'API sera accessible sur `http://localhost:8080`

## Tests

### Explorateur Média

```bash
cd explorateur-media
npm test
```

Les tests unitaires couvrent :
- AppComponent
- PlanetTableComponent
- PlanetDetailsComponent
