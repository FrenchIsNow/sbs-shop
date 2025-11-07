# Configuration n8n - SBS SHOP E-Bike Leads

## 📋 Vue d'ensemble

Ce workflow n8n reçoit les leads du formulaire de la landing page et les enregistre automatiquement dans Google Sheets.

## 🔧 Configuration

### 1. Importer le workflow

1. Ouvre ton instance n8n: `https://n8n.srv759792.hstgr.cloud`
2. Va dans **Workflows** > **Add workflow** > **Import from File**
3. Sélectionne le fichier `app/n8n.json`
4. Le workflow "RAGE E-Bike Catalogue Leads (Fixed)" sera créé

### 2. Configurer Google Sheets

1. Dans le node **"Append Lead to Sheet"**, vérifie:
   - Document ID: `1hog1XvrnNDqGKz_LGa9yBgBHD0H2F-yzuIIYg3atwvk`
   - Sheet Name: `LEAD`
   - Colonnes mappées: `NOM`, `EMAIL`, `NUMERO`, `MESSAGE`

2. Configure les credentials Google Sheets OAuth2 si nécessaire

### 3. Structure de la Google Sheet

Ta Google Sheet doit avoir ces colonnes (dans l'ordre):

| NOM | EMAIL | NUMERO | MESSAGE |
|-----|-------|--------|---------|
|     |       |        |         |

### 4. Activer le workflow

1. Clique sur **"Active"** en haut à droite
2. Le webhook sera disponible à: `https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue`

## 🎯 Flux de données

```
Formulaire Website
    ↓
Webhook n8n (POST)
    ↓
Google Sheets (Append)
    ↓
Réponse JSON
```

## 📤 Format des données envoyées

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+33 6 12 34 56 78",
  "message": "Je suis passionné de motos électriques et j'aimerais en savoir plus sur vos modèles."
}
```

**Note:** Le champ `message` est optionnel et peut être vide.

## ✅ Réponse de succès

```json
{
  "status": "success",
  "message": "Lead saved successfully"
}
```

## 🔍 Vérification

Pour tester le webhook manuellement:

```bash
curl -X POST https://n8n.srv759792.hstgr.cloud/webhook/ebike-catalogue \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+33612345678"
  }'
```

Réponse attendue:
```json
{
  "status": "success",
  "message": "Lead saved successfully"
}
```

## ⚠️ Notes importantes

1. **Response Mode**: Le webhook DOIT être configuré en mode `responseNode` (pas `onReceived`)
2. **Content-Type**: Le header `Content-Type: application/json` est automatiquement ajouté
3. **CORS Headers**: Les headers CORS sont configurés pour autoriser les requêtes cross-origin:
   - `Access-Control-Allow-Origin: *`
   - `Access-Control-Allow-Methods: POST, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type`
4. **Credentials**: Assure-toi que les credentials Google Sheets sont bien configurés
5. **Timezone**: Configuré sur `Europe/Paris`

## 🐛 Troubleshooting

### Le formulaire ne reçoit pas de réponse
- Vérifie que le workflow est **Active**
- Vérifie que `responseMode` est bien `responseNode`
- Vérifie les logs n8n pour voir les erreurs

### Les données n'arrivent pas dans Google Sheets
- Vérifie les credentials OAuth2
- Vérifie que le Document ID est correct
- Vérifie que la sheet "LEAD" existe avec les bonnes colonnes

### Erreur "Content-Type"
- Assure-toi que le node "Respond Success" a le header `Content-Type: application/json`
- La configuration actuelle inclut déjà ce header

### Erreur CORS (Access-Control-Allow-Origin)
- Vérifie que le webhook a `allowedOrigins: *` dans les options
- Vérifie que tous les headers CORS sont présents:
  - Dans le Webhook node
  - Dans le Respond Success node
- Si tu veux restreindre l'origine, remplace `*` par ton domaine exact (ex: `https://sbsshop.com`)

## 📊 Monitoring

Tu peux voir tous les leads dans:
- **n8n**: Onglet "Executions" pour voir l'historique
- **Google Sheets**: Document directement pour voir les données

