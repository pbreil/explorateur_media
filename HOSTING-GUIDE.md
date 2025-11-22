# 🚀 Guide de Choix d'Hébergeur pour Pronofoot

Ce guide vous aide à choisir le meilleur hébergeur pour déployer votre application Spring Boot + MySQL.

## 📊 Comparatif des Hébergeurs

| Hébergeur | Prix Gratuit | Facilité | Docker | Auto-Deploy | Base de données | Recommandation |
|-----------|--------------|----------|--------|-------------|-----------------|----------------|
| **Railway** | 500h/mois | ⭐⭐⭐⭐⭐ | ✅ | ✅ | MySQL inclus | **Débutants** |
| **Render** | Gratuit | ⭐⭐⭐⭐ | ✅ | ✅ | MySQL payant | **Simple & fiable** |
| **Heroku** | Limité | ⭐⭐⭐ | ✅ | ✅ | Addons payants | **Ancien standard** |
| **AWS ECS** | 12 mois gratuit | ⭐⭐ | ✅ | ⚙️ | RDS disponible | **Production pro** |
| **DigitalOcean** | $200 crédit | ⭐⭐⭐ | ✅ | ⚙️ | Managed MySQL | **Bon rapport qualité/prix** |

## 🏆 Recommandations

### Pour débuter : **Railway** ⭐
- ✅ 500 heures gratuites par mois
- ✅ Configuration automatique
- ✅ MySQL inclus dans le plan gratuit
- ✅ Déploiement depuis GitHub en 1 clic

### Pour production légère : **Render**
- ✅ Plan gratuit permanent
- ✅ Auto-deploy depuis GitHub
- ✅ Excellent pour démarrer
- ⚠️ MySQL non inclus (plan payant)

### Pour production sérieuse : **AWS ECS**
- ✅ Scalabilité illimitée
- ✅ Infrastructure robuste
- ✅ 12 mois gratuits
- ⚠️ Configuration plus complexe

## 🚀 Déploiement Rapide avec Railway (Recommandé)

### Étape 1 : Créer un compte Railway
1. Aller sur https://railway.app
2. S'inscrire avec GitHub
3. Vous obtenez 500h gratuites/mois

### Étape 2 : Créer un projet
1. Cliquer sur "New Project"
2. Sélectionner "Deploy from GitHub repo"
3. Autoriser Railway à accéder à votre repo
4. Sélectionner `pbreil/explorateur_media`

### Étape 3 : Ajouter MySQL
1. Dans votre projet, cliquer "New"
2. Sélectionner "Database" > "Add MySQL"
3. Railway crée automatiquement la base de données

### Étape 4 : Configurer les variables d'environnement
Railway détecte automatiquement votre `docker-compose.yml` et `Dockerfile`.

Variables à définir (si nécessaire) :
```
DB_HOST=mysql (géré automatiquement par Railway)
DB_NAME=railway
DB_USER=root
DB_PASSWORD=xxx (généré automatiquement)
SPRING_PROFILES_ACTIVE=prod
```

### Étape 5 : Déployer
1. Railway détecte votre Dockerfile
2. Il build et déploie automatiquement
3. Vous obtenez une URL publique

### Étape 6 : Configuration GitHub Actions (Optionnel)
Pour déployer automatiquement à chaque push :

1. Dans Railway : Settings > Tokens > Create Token
2. Dans GitHub : Settings > Secrets > Actions > New secret
   - Nom: `RAILWAY_TOKEN`
   - Valeur: <votre-token>
3. Activer le workflow `.github/workflows/deploy-railway.yml`

## 🎯 Autres Options Détaillées

### Option 2 : Render.com

**Avantages :**
- Plan gratuit permanent
- SSL automatique
- Auto-scaling
- Bon monitoring

**Configuration :**
1. Créer un compte sur https://render.com
2. New > Web Service
3. Connecter votre repo GitHub
4. Sélectionner "Docker" comme environnement
5. Créer une base de données séparément (plan payant)

**Coût :**
- Web Service: Gratuit (avec limitations)
- MySQL: $7/mois minimum

### Option 3 : AWS ECS

**Avantages :**
- Infrastructure enterprise
- Scalabilité illimitée
- Intégration complète AWS

**Configuration :**
Suivez le fichier `.github/workflows/deploy-aws.yml`

**Coût :**
- 12 mois gratuits (niveau Free Tier)
- Après: ~$15-30/mois (selon usage)

### Option 4 : DigitalOcean App Platform

**Avantages :**
- $200 de crédit gratuit (60 jours)
- Interface simple
- Bon rapport qualité/prix

**Configuration :**
1. Créer un compte DigitalOcean
2. Créer un Container Registry
3. Créer une App depuis le registry
4. Créer une Managed Database MySQL

**Coût :**
- Basic App: $5/mois
- Managed MySQL: $15/mois

### Option 5 : Heroku

**⚠️ Attention :** Heroku a supprimé son plan gratuit en 2022.

**Coût :**
- Eco dynos: $5/mois
- MySQL addon (JawsDB): $10/mois

## 🔧 Configuration Post-Déploiement

### 1. Mettre à jour l'URL du backend dans le frontend

Éditez `explorateur-media/src/environments/environment.prod.ts` :

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://votre-app.railway.app'  // URL de votre backend
};
```

### 2. Rebuild le frontend

```bash
cd explorateur-media
npm run build:gh-pages
```

### 3. Tester l'application

1. Accéder au backend : `https://votre-app.railway.app/actuator/health`
2. Tester l'API : `https://votre-app.railway.app/api/football/classement`
3. Accéder au frontend : `https://pbreil.github.io/explorateur_media/`

## 📊 Monitoring et Logs

### Railway
- Onglet "Deployments" : Voir les déploiements
- Onglet "Logs" : Logs en temps réel
- Onglet "Metrics" : CPU, RAM, Network

### Render
- Dashboard > Logs
- Events pour les déploiements

### AWS CloudWatch
- Logs dans CloudWatch Logs
- Metrics dans CloudWatch Metrics

## 🆘 Troubleshooting

### Erreur : "Cannot connect to database"
1. Vérifier que la base de données est démarrée
2. Vérifier les variables d'environnement `DB_HOST`, `DB_USER`, `DB_PASSWORD`
3. Vérifier que l'app et la DB sont dans le même réseau

### Erreur : "Port already in use"
1. Sur Railway/Render : Le port est géré automatiquement
2. Vérifier que votre app écoute sur `$PORT` ou 8080

### L'application ne démarre pas
1. Consulter les logs de déploiement
2. Vérifier que le Dockerfile build correctement en local
3. Vérifier les health checks

## 💡 Conseils

1. **Commencez avec Railway** pour sa simplicité
2. **Utilisez les variables d'environnement** pour les secrets
3. **Surveillez vos quotas** sur le plan gratuit
4. **Activez le SSL/HTTPS** (automatique sur Railway/Render)
5. **Configurez les backups** de base de données en production

## 📞 Support

- Railway : https://docs.railway.app
- Render : https://render.com/docs
- AWS : https://docs.aws.amazon.com
- DigitalOcean : https://docs.digitalocean.com

---

**Note :** Ce guide a été créé pour le projet Pronofoot. Pour toute question spécifique, consultez la documentation de votre hébergeur.
