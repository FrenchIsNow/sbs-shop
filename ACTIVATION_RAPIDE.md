# ⚡ Activation Rapide n8n - Guide Visuel

## 🎯 Problème Actuel
```
❌ Erreur: "Oups! Une erreur s'est produite. Réessaie."
```

**Cause:** Le workflow n8n n'est pas activé (erreur 404)

---

## ✅ Solution en 5 Minutes

### 📍 Étape 1: Accède à n8n

Ouvre dans ton navigateur:
```
https://n8n.srv759792.hstgr.cloud
```

Connecte-toi avec tes identifiants.

---

### 📍 Étape 2: Importe le Workflow

#### A. Crée un nouveau workflow
1. Dans le menu de gauche, clique sur **"Workflows"**
2. Clique sur le bouton **"+ Add workflow"** (en haut)

#### B. Importe le fichier
1. Une fois dans l'éditeur, clique sur le menu **trois points (⋮)** en haut à droite
2. Sélectionne **"Import from File..."**
3. Navigue vers: `/Users/levelup/Dev/WEBSITES/sbs-shop/app/n8n.json`
4. Clique **"Ouvrir"**

**✅ Le workflow va s'afficher avec 3 nodes:**
- Receive Lead (webhook)
- Append Lead to Sheet (Google Sheets)
- Respond Success (response)

---

### 📍 Étape 3: Configure Google Sheets

#### A. Clique sur le node "Append Lead to Sheet"
- C'est le node du milieu (Google Sheets)

#### B. Configure les Credentials
1. Dans le panneau de droite, cherche **"Credentials"**
2. Clique sur **"Select Credential"** ou **"+ New Credential"**
3. Si tu en as déjà une, sélectionne-la
4. Sinon, clique **"+ New Credential"**

#### C. Connecte ton compte Google
1. Choisis **"Google Sheets OAuth2 API"**
2. Clique sur **"Connect my account"**
3. Sélectionne ton compte Google
4. Autorise n8n à accéder à tes Google Sheets
5. Clique **"Save"**

#### D. Vérifie les Paramètres
Assure-toi que ces champs sont corrects:
- **Document ID:** `1hog1XvrnNDqGKz_LGa9yBgBHD0H2F-yzuIIYg3atwvk`
- **Sheet Name:** `LEAD`
- **Colonnes:**
  - NOM → `{{ $json.body.name }}`
  - EMAIL → `{{ $json.body.email }}`
  - NUMERO → `{{ $json.body.phone }}`
  - MESSAGE → `{{ $json.body.message || '' }}`

---

### 📍 Étape 4: Active le Workflow ⚡

**C'EST L'ÉTAPE CRITIQUE!**

1. En haut à droite de l'éditeur, tu verras un toggle **"Inactive"** (gris)
2. **Clique dessus** pour l'activer
3. Il doit devenir **"Active"** (vert/bleu)
4. Une notification doit apparaître: "Workflow activated"

**✅ C'est tout! Le webhook est maintenant actif!**

---

### 📍 Étape 5: Teste le Webhook

#### A. Test Terminal (Plus Rapide)
Reviens dans ton terminal et lance:
```bash
cd /Users/levelup/Dev/WEBSITES/sbs-shop
./test-webhook.sh
```

**Résultat attendu:**
```
✅ Test PASSED - Webhook is working!
📊 Check your Google Sheet for the test data
```

#### B. Test avec le Site
```bash
npm run dev
```

1. Ouvre http://localhost:3000
2. Clique sur le bouton **🧪 Test** (coin inférieur droit)
3. Clique sur **"🚀 Auto-Fill Form"**
4. Clique sur **"Recevoir le Catalogue"**
5. Tu devrais voir: **"Merci! Après validation..."**

#### C. Vérifie Google Sheet
Ouvre ta Google Sheet:
```
https://docs.google.com/spreadsheets/d/1hog1XvrnNDqGKz_LGa9yBgBHD0H2F-yzuIIYg3atwvk
```

Tu devrais voir les données de test dans la sheet "LEAD":
- NOM: Test User (ou Jean Dupont)
- EMAIL: test@example.com
- NUMERO: +33612345678
- MESSAGE: ...

---

## 🔍 Vérification Visuelle

### Workflow Activé (Correct) ✅
```
┌──────────────────────────────────┐
│  RAGE E-Bike Catalogue Leads     │
│                                  │
│  [Toggle: Active] ✅ ←── VERT    │
│                                  │
│  ○ Receive Lead                  │
│      ↓                           │
│  ○ Append Lead to Sheet          │
│      ↓                           │
│  ○ Respond Success               │
└──────────────────────────────────┘
```

### Workflow Inactif (Erreur) ❌
```
┌──────────────────────────────────┐
│  RAGE E-Bike Catalogue Leads     │
│                                  │
│  [Toggle: Inactive] ❌ ←── GRIS  │
│                                  │
│  ○ Receive Lead                  │
│      ↓                           │
│  ○ Append Lead to Sheet          │
│      ↓                           │
│  ○ Respond Success               │
└──────────────────────────────────┘
```

---

## 🐛 Problèmes Courants

### "Credential already in use"
✅ **Solution:** C'est normal! Utilise la credential existante.

### "Cannot connect to Google Sheets"
❌ **Solution:** 
1. Déconnecte et reconnecte ton compte Google
2. Assure-toi d'avoir les permissions sur la Sheet
3. Vérifie que le Document ID est correct

### "Sheet LEAD not found"
❌ **Solution:**
1. Ouvre ta Google Sheet
2. Crée un onglet nommé exactement **"LEAD"** (en majuscules)
3. Ajoute les headers: **NOM | EMAIL | NUMERO | MESSAGE**

### Le toggle reste "Inactive"
❌ **Solution:**
1. Vérifie que tous les nodes sont bien configurés (pas de ❌ rouge)
2. Vérifie que Google Sheets est bien connecté
3. Sauvegarde le workflow (Ctrl+S)
4. Réessaie d'activer

### Erreur "Missing parameter"
❌ **Solution:**
1. Clique sur chaque node
2. Vérifie que tous les champs requis sont remplis
3. Sauvegarde et réactive

---

## 📊 Structure Google Sheet Requise

Ta Google Sheet doit avoir cet en-tête exact:

| NOM | EMAIL | NUMERO | MESSAGE |
|-----|-------|--------|---------|
|     |       |        |         |

**Important:**
- ✅ Première ligne = Headers
- ✅ Noms en MAJUSCULES
- ✅ Orthographe exacte
- ✅ Sheet nommée "LEAD"

---

## ✅ Checklist Finale

Avant de quitter n8n, vérifie:

- [ ] Workflow importé
- [ ] Google Sheets connecté
- [ ] Document ID correct
- [ ] Sheet "LEAD" existe
- [ ] Headers présents
- [ ] **Toggle "Active" (VERT)** ⚡
- [ ] Test terminal réussi
- [ ] Test site réussi
- [ ] Données dans Google Sheet

---

## 🎉 Une Fois Activé

Le workflow fonctionnera automatiquement:
- ✅ Formulaire → n8n → Google Sheets
- ✅ Réponse automatique
- ✅ Pas besoin de réactiver
- ✅ Logs disponibles dans n8n

---

## 📞 Besoin d'Aide?

### Si ça ne marche toujours pas:

1. **Vérifie les logs n8n:**
   - Dans n8n, va dans "Executions"
   - Regarde la dernière exécution
   - Clique dessus pour voir les détails

2. **Test manuel avec cURL:**
```bash
curl -X POST https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"+33612345678","message":"Test"}'
```

3. **Vérifie le browser console:**
   - F12 dans le navigateur
   - Onglet "Console"
   - Cherche les erreurs rouges

---

## 🚀 Après Activation

Tu pourras tester avec:

1. **Bouton Test Auto-Fill:**
```bash
npm run dev
# Clique sur 🧪 Test
```

2. **Script Terminal:**
```bash
./test-webhook.sh
```

3. **Formulaire Manuel:**
   - Remplis le formulaire à la main
   - Soumets
   - Vérifie Google Sheet

---

**Maintenant, suis les étapes ci-dessus et active le workflow! 🎯**

Une fois fait, reviens tester avec `./test-webhook.sh`

