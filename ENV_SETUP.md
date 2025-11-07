# 🔐 Configuration des Variables d'Environnement

## 📋 Vue d'ensemble

Ton application utilise des variables d'environnement pour configurer l'URL du webhook n8n. Cela permet de basculer facilement entre les URLs de test et de production.

---

## 🚀 Setup Rapide

### 1. Copie le fichier d'exemple
```bash
cp .env.example .env.local
```

### 2. Édite `.env.local`
```bash
nano .env.local
# ou
code .env.local
```

### 3. Configure l'URL active
Change la valeur de `NEXT_PUBLIC_N8N_WEBHOOK_URL` selon ton besoin.

---

## 🔗 Les Deux URLs n8n

### Test URL (Développement) 🧪
```
https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue
```

**Caractéristiques:**
- ✅ Visible sur le canvas n8n
- ✅ Parfait pour le développement
- ✅ Permet de voir les données en temps réel
- ✅ Pas besoin d'activer le workflow
- ⚠️ NE PAS utiliser en production

**Quand l'utiliser:**
- Développement local
- Tests avec le bouton 🧪
- Débogage
- Vérification du flow

### Production URL (Live) 🚀
```
https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue
```

**Caractéristiques:**
- ✅ URL publique stable
- ✅ Performante
- ✅ Logs dans "Executions"
- ⚠️ Nécessite workflow ACTIF
- ⚠️ Non visible sur le canvas

**Quand l'utiliser:**
- Site déployé en production
- Tests finaux avant déploiement
- Validation du workflow activé

---

## ⚙️ Configuration du fichier `.env.local`

### Option 1: Mode Développement (Recommandé)
```env
# .env.local

# Test URL - Visible dans n8n, pas besoin d'activer
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue

# Autres URLs disponibles (commentées)
# NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue
```

### Option 2: Mode Production
```env
# .env.local

# Production URL - Nécessite workflow actif
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue

# Test URL (commentée)
# NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue
```

### Option 3: Les Deux (avec basculement facile)
```env
# .env.local

# URLs disponibles
NEXT_PUBLIC_N8N_WEBHOOK_URL_TEST=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue
NEXT_PUBLIC_N8N_WEBHOOK_URL_PROD=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue

# URL active - Change TEST en PROD pour basculer
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue
```

---

## 🧪 Tester avec le Script

Le script `test-webhook.sh` supporte maintenant les variables d'environnement:

### Test avec Test URL (défaut)
```bash
./test-webhook.sh
```

### Test avec Production URL
```bash
N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue ./test-webhook.sh
```

### Test avec URL personnalisée
```bash
N8N_WEBHOOK_URL=https://custom-url.com/webhook ./test-webhook.sh
```

---

## 🔄 Workflow de Développement

### Phase 1: Développement Local
```env
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue
```

```bash
npm run dev
# Teste avec le bouton 🧪
# Vérifie les données dans n8n canvas
```

### Phase 2: Tests Pre-Production
```env
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue
```

```bash
# Active le workflow dans n8n ⚡
npm run dev
# Teste avec le bouton 🧪
# Vérifie dans Google Sheet
./test-webhook.sh
```

### Phase 3: Déploiement Production
```bash
# Configure la production URL sur ton hébergeur
# (Vercel, Netlify, etc.)

# Variable d'environnement:
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue

# Build et deploy
npm run build
```

---

## 🎯 Différences Clés

| Aspect | Test URL | Production URL |
|--------|----------|----------------|
| **Path** | `/webhook-test/...` | `/webhook/...` |
| **Activation** | ❌ Pas nécessaire | ✅ Requis |
| **Visibilité** | ✅ Canvas n8n | ❌ Executions only |
| **Usage** | 🧪 Dev/Debug | 🚀 Production |
| **Performance** | Standard | Optimisée |
| **Logs** | Canvas + Executions | Executions only |

---

## 🔍 Vérification

### Vérifier l'URL active dans le site
1. Lance le dev server:
```bash
npm run dev
```

2. Ouvre la console du navigateur (F12)

3. Soumets le formulaire

4. Dans la console, tu verras la requête fetch avec l'URL utilisée

### Vérifier l'URL dans le script
```bash
# Affiche l'URL qui sera utilisée
N8N_WEBHOOK_URL=https://example.com/test ./test-webhook.sh
# La première ligne affiche: "URL: https://example.com/test"
```

---

## 📝 Fichier `.env.local` Complet Recommandé

```env
# ==============================================
# n8n Webhook Configuration
# ==============================================

# TEST URL - Use during development
# No need to activate workflow
# Visible on n8n canvas
NEXT_PUBLIC_N8N_WEBHOOK_URL_TEST=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue

# PRODUCTION URL - Use in production
# Requires active workflow
# Only visible in executions
NEXT_PUBLIC_N8N_WEBHOOK_URL_PROD=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue

# ACTIVE URL - Currently used by the application
# Switch between TEST and PROD by changing the value below
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue

# ==============================================
# Tips:
# - Use TEST URL for local development
# - Use PROD URL only when workflow is activated
# - Never commit .env.local to git
# - Restart dev server after changing env vars
# ==============================================
```

---

## 🐛 Troubleshooting

### Les changements ne sont pas pris en compte
**Solution:** Redémarre le serveur de dev
```bash
# Ctrl+C pour arrêter
npm run dev
```

### Erreur 404 avec Production URL
**Solution:** Active le workflow dans n8n
- Va sur https://n8n.srv759792.hstgr.cloud
- Toggle le workflow à "Active"

### Test URL fonctionne mais pas Production URL
**Vérifications:**
1. ✅ Workflow est-il activé dans n8n?
2. ✅ L'URL dans `.env.local` est-elle correcte?
3. ✅ As-tu redémarré le serveur après changement?

### Variables d'environnement non définies
**Solution:** Assure-toi que le fichier `.env.local` existe
```bash
# Vérifie le fichier
cat .env.local

# Si absent, crée-le
cp .env.example .env.local
```

---

## 🔒 Sécurité

### ✅ Bonnes Pratiques
- `.env.local` est dans `.gitignore` (ne jamais commit)
- `.env.example` peut être commité (pas de secrets)
- Utilise `NEXT_PUBLIC_*` uniquement pour les variables côté client
- Ne mets jamais de clés secrètes dans `NEXT_PUBLIC_*`

### ⚠️ Important
Les variables `NEXT_PUBLIC_*` sont **exposées côté client**. C'est OK pour les URLs publiques de webhook, mais **jamais pour des tokens ou clés API secrètes**.

---

## 📚 Ressources

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [n8n Webhook Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

---

## 🎯 Quick Commands

```bash
# Créer .env.local depuis l'exemple
cp .env.example .env.local

# Éditer .env.local
nano .env.local

# Tester avec test URL
./test-webhook.sh

# Tester avec production URL
N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue ./test-webhook.sh

# Démarrer dev server (charge .env.local automatiquement)
npm run dev

# Build pour production
npm run build
```

---

**Recommandation:** Commence avec la **Test URL** pour le développement, puis bascule vers la **Production URL** une fois que tout fonctionne! 🚀

