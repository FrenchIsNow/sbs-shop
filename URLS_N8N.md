# 🔗 Guide des URLs n8n - Test vs Production

## 📋 Configuration Actuelle

Ton projet est maintenant configuré avec des **variables d'environnement** pour basculer facilement entre test et production.

---

## 🎯 Les Deux URLs

### 1️⃣ Test URL (Développement) 🧪

```
https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue
```

#### Quand utiliser:
- ✅ Développement local
- ✅ Débogage en temps réel
- ✅ Voir les données sur le canvas

#### Avantages:
- 👁️ Visible sur le canvas n8n
- 🔄 Voir les données circuler en temps réel
- 🐛 Facile à déboguer
- 🚀 Pas besoin d'activer le workflow

#### Comment utiliser:

**Étape 1:** Ouvre n8n
```
https://n8n.srv759792.hstgr.cloud
```

**Étape 2:** Ouvre ton workflow "RAGE E-Bike Catalogue Leads"

**Étape 3:** Clique sur **"Execute Workflow"** (bouton en haut)
- Le bouton est en haut à droite du canvas
- Un message apparaît: "Workflow was started"

**Étape 4:** IMMÉDIATEMENT après, teste:
```bash
./test-webhook.sh
```

⚠️ **Important:** La test URL ne fonctionne que pour **UN SEUL APPEL** après avoir cliqué sur "Execute Workflow". Tu dois re-cliquer pour chaque test!

#### Workflow:
```
1. Click "Execute Workflow" dans n8n
2. Lance ./test-webhook.sh (dans les 2-3 minutes)
3. Regarde les données apparaître sur le canvas en temps réel
4. Pour tester à nouveau: répète depuis l'étape 1
```

---

### 2️⃣ Production URL (Live) 🚀

```
https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue
```

#### Quand utiliser:
- ✅ Site en production
- ✅ Tests finaux avant déploiement
- ✅ Usage réel par les visiteurs

#### Avantages:
- 🔒 Stable et performante
- ♾️ Appels illimités
- 📊 Logs dans "Executions"
- 🎯 URL publique permanente

#### Comment utiliser:

**Étape 1:** Active le workflow dans n8n
```
1. Ouvre https://n8n.srv759792.hstgr.cloud
2. Ouvre ton workflow
3. Clique sur le toggle "Inactive" → "Active" (en haut à droite)
```

**Étape 2:** Teste avec production URL
```bash
N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue ./test-webhook.sh
```

⚠️ **Requis:** Le workflow DOIT être activé (toggle vert) sinon → erreur 404

#### Workflow:
```
1. Active le workflow UNE FOIS dans n8n (toggle vert)
2. Teste autant de fois que tu veux
3. Pas besoin de re-cliquer à chaque fois
4. Fonctionne de manière permanente
```

---

## ⚙️ Configuration

### Fichier `.env.local` créé automatiquement:

```env
# URL active (par défaut: test URL)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue
```

### Pour basculer vers Production:

Édite `.env.local`:
```env
# URL active (changé vers prod)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue
```

Puis redémarre:
```bash
npm run dev
```

---

## 🧪 Tests Rapides

### Test avec Test URL (défaut)
```bash
# 1. Clique "Execute Workflow" dans n8n
# 2. Lance immédiatement:
./test-webhook.sh
```

### Test avec Production URL
```bash
# Active le workflow dans n8n d'abord, puis:
N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue ./test-webhook.sh
```

---

## 📊 Comparaison

| Aspect | Test URL | Production URL |
|--------|----------|----------------|
| **URL** | `/webhook-test/...` | `/webhook/...` |
| **Activation** | ❌ Pas nécessaire | ✅ Requis (toggle) |
| **Pré-requis** | Click "Execute" | Active workflow |
| **Durée validité** | 1 appel | Illimité |
| **Visibilité** | ✅ Canvas n8n | ❌ Executions only |
| **Usage** | 🧪 Dev/Debug | 🚀 Production |
| **Re-exécution** | Click à chaque fois | Permanent |

---

## 🎯 Recommandations

### Pour Développement Local:
```env
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue
```

**Workflow:**
1. Ouvre n8n
2. Clique "Execute Workflow"
3. Teste avec le bouton 🧪 du site
4. Vois les données sur le canvas
5. Répète 2-4 pour chaque test

### Pour Production:
```env
# .env.local (ou .env.production)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue
```

**Workflow:**
1. Active le workflow UNE FOIS
2. Déploie le site
3. Ça marche automatiquement
4. Pas besoin de re-cliquer

---

## 🐛 Erreurs Communes

### Test URL: "Webhook not registered"
```
❌ Click the 'Execute workflow' button on the canvas, then try again
```

**Solution:**
1. Ouvre n8n
2. Ouvre ton workflow
3. Clique sur **"Execute Workflow"** en haut à droite
4. Re-teste IMMÉDIATEMENT (dans les 2-3 min)

### Production URL: "Webhook not registered"
```
❌ The workflow must be active for a production URL to run successfully
```

**Solution:**
1. Ouvre n8n
2. Ouvre ton workflow  
3. Clique sur le **toggle "Inactive"** pour le passer à **"Active"**
4. Re-teste

### Test URL: Fonctionne une fois puis arrête
**C'est normal!** La test URL ne fonctionne que pour UN appel. Re-clique sur "Execute Workflow" pour chaque nouveau test.

---

## 🔄 Workflow Recommandé

### Phase 1: Développement (Test URL)
```bash
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue

# Terminal 1: Dev server
npm run dev

# Terminal 2 (ou n8n): 
# 1. Click "Execute Workflow" dans n8n
# 2. ./test-webhook.sh
# 3. Répète 1-2 pour chaque test
```

### Phase 2: Pré-Production (Production URL en local)
```bash
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue

# 1. Active le workflow dans n8n (une seule fois)
# 2. npm run dev
# 3. Teste autant que tu veux
# 4. ./test-webhook.sh (autant de fois que nécessaire)
```

### Phase 3: Production (Déploiement)
```bash
# Sur ton hébergeur (Vercel, Netlify, etc.)
# Configure la variable d'environnement:
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue

# Build et deploy
npm run build
```

---

## ✅ Quick Checklist

### Pour Tester avec Test URL:
- [ ] Workflow ouvert dans n8n
- [ ] Cliqué sur "Execute Workflow"
- [ ] Testé immédiatement après
- [ ] Re-cliquer pour chaque nouveau test

### Pour Tester avec Production URL:
- [ ] Workflow activé (toggle vert)
- [ ] `.env.local` configuré avec prod URL
- [ ] Dev server redémarré
- [ ] Teste autant que tu veux

---

## 🎯 Commandes Rapides

```bash
# Tester avec test URL (défaut)
./test-webhook.sh

# Tester avec production URL
N8N_WEBHOOK_URL=https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue ./test-webhook.sh

# Éditer .env.local
nano .env.local

# Redémarrer dev server (après changement .env)
# Ctrl+C puis:
npm run dev

# Voir l'URL actuellement configurée
grep NEXT_PUBLIC_N8N_WEBHOOK_URL .env.local
```

---

## 💡 Pro Tips

1. **Développement:** Utilise Test URL + "Execute Workflow" à chaque test
2. **Pré-prod:** Bascule vers Production URL pour valider l'activation
3. **Production:** Production URL uniquement, workflow toujours actif
4. **Débogage:** Test URL te montre les données en temps réel sur le canvas
5. **Performance:** Production URL est optimisée pour les appels multiples

---

**Maintenant tu peux tester! 🚀**

**Pour test URL:**
```bash
# 1. Ouvre n8n et click "Execute Workflow"
# 2. Lance immédiatement:
./test-webhook.sh
```

**Pour production URL:**
```bash
# 1. Active le workflow dans n8n (toggle vert)
# 2. Change .env.local vers production URL
# 3. npm run dev
# 4. Teste!
```

