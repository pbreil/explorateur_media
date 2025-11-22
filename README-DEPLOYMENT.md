# 🚀 Guide de Déploiement - Explorateur Media + Pronofoot

## 📋 Vue d'ensemble

Ce projet contient :
- **Frontend Angular** : Application web pour l'explorateur de média et Pronofoot
- **Backend Spring Boot** : API REST avec base de données MySQL
- **Docker** : Containerisation de l'application

## 🐳 Déploiement avec Docker

### Prérequis

- Docker 20.10+
- Docker Compose 2.0+

### Déploiement local

1. **Cloner le repository**
   ```bash
   git clone https://github.com/pbreil/explorateur_media.git
   cd explorateur_media
   ```

2. **Créer le fichier `.env`**
   ```bash
   cp .env.example .env
   # Éditer .env et modifier les valeurs par défaut
   ```

3. **Lancer l'application**
   ```bash
   docker-compose up -d
   ```

4. **Vérifier le statut**
   ```bash
   docker-compose ps
   docker-compose logs -f spring-app
   ```

5. **Accéder aux services**
   - API Backend : http://localhost:8080
   - Health Check : http://localhost:8080/actuator/health
   - API Football : http://localhost:8080/api/football/classement

### Arrêter l'application

```bash
docker-compose down
```

Pour supprimer également les volumes (données) :
```bash
docker-compose down -v
```

## 📦 Images Docker

Les images Docker sont automatiquement construites et publiées sur **GitHub Container Registry** (ghcr.io) via GitHub Actions.

### Récupérer l'image

```bash
docker pull ghcr.io/pbreil/explorateur_media/spring-app:latest
```

### Utiliser l'image publiée

Modifiez `docker-compose.yml` pour utiliser l'image publiée :

```yaml
spring-app:
  image: ghcr.io/pbreil/explorateur_media/spring-app:latest
  # Commentez la section 'build'
```

## 🌐 Déploiement en Production

### Option 1 : Heroku

1. Installer Heroku CLI
2. Créer une application :
   ```bash
   heroku create pronofoot-app
   heroku addons:create jawsdb:kitefin  # MySQL
   ```

3. Configurer les variables d'environnement :
   ```bash
   heroku config:set DB_HOST=<jawsdb-host>
   heroku config:set DB_NAME=<jawsdb-database>
   heroku config:set DB_USER=<jawsdb-user>
   heroku config:set DB_PASSWORD=<jawsdb-password>
   ```

4. Déployer :
   ```bash
   git push heroku main
   ```

### Option 2 : Railway

1. Créer un compte sur [Railway.app](https://railway.app)
2. Créer un nouveau projet
3. Ajouter MySQL depuis le marketplace
4. Déployer depuis GitHub
5. Configurer les variables d'environnement automatiquement

### Option 3 : Render

1. Créer un compte sur [Render.com](https://render.com)
2. Créer une base de données PostgreSQL ou MySQL
3. Créer un Web Service depuis le repository GitHub
4. Configurer Docker comme environnement
5. Définir les variables d'environnement

### Option 4 : VPS (DigitalOcean, AWS, etc.)

1. Provisionner un serveur Ubuntu
2. Installer Docker et Docker Compose
3. Cloner le repository
4. Configurer `.env`
5. Lancer avec `docker-compose up -d`
6. Configurer Nginx comme reverse proxy

## 📊 Frontend (GitHub Pages)

Le frontend Angular est déployé sur GitHub Pages.

### Build et déploiement

```bash
cd explorateur-media
npm install
npm run build:gh-pages
```

L'application sera disponible sur : `https://pbreil.github.io/explorateur_media/`

### Configuration de l'API

Pour le frontend en production, assurez-vous de mettre à jour l'URL de l'API dans `src/environments/environment.prod.ts` :

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://votre-api.com'  // URL de votre backend déployé
};
```

## 🔧 Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `DB_HOST` | Hôte MySQL | `mysql` |
| `DB_PORT` | Port MySQL | `3306` |
| `DB_NAME` | Nom de la base | `football_db` |
| `DB_USER` | Utilisateur MySQL | `football_user` |
| `DB_PASSWORD` | Mot de passe MySQL | `password` |
| `SPRING_PROFILES_ACTIVE` | Profil Spring | `prod` |

## 🏥 Health Checks

- **Application** : `GET /actuator/health`
- **Base de données** : Inclus dans le health check

## 📝 Logs

Consulter les logs :
```bash
# Tous les services
docker-compose logs -f

# Spring app uniquement
docker-compose logs -f spring-app

# MySQL uniquement
docker-compose logs -f mysql
```

## 🔄 Mise à jour

```bash
# Récupérer les dernières modifications
git pull origin main

# Reconstruire et redémarrer
docker-compose up -d --build
```

## 🛠️ Troubleshooting

### L'application ne démarre pas

1. Vérifier les logs : `docker-compose logs spring-app`
2. Vérifier que MySQL est prêt : `docker-compose ps mysql`
3. Vérifier les variables d'environnement : `docker-compose config`

### Erreur de connexion à la base de données

1. Vérifier que le conteneur MySQL est en cours d'exécution
2. Vérifier les credentials dans `.env`
3. Attendre que le health check MySQL soit OK

### Port déjà utilisé

```bash
# Changer le port dans docker-compose.yml
ports:
  - "8081:8080"  # Utilisez 8081 au lieu de 8080
```

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation Spring Boot
- Consulter la documentation Docker

## 📜 Licence

Ce projet est sous licence MIT.
