# Configuration du Countdown

## Changer la date du countdown

### Méthode 1: Variable d'environnement (Recommandée)

1. Créez un fichier `.env.local` à la racine du projet:
```bash
NEXT_PUBLIC_COUNTDOWN_DATE=2026-01-23T00:30:00
```

2. Redémarrez le serveur de développement:
```bash
npm run dev
```

### Méthode 2: Modification directe

Si vous ne voulez pas utiliser de variable d'environnement, modifiez le fichier `app/config.js`:

```javascript
export const COUNTDOWN_DATE = "2026-01-23T00:30:00";
```

## Format de la date

La date doit être au format ISO 8601: `YYYY-MM-DDTHH:mm:ss`

Exemples:
- `2026-12-31T23:59:59` - 31 décembre 2026 à 23:59:59
- `2025-06-15T12:00:00` - 15 juin 2025 à 12:00:00
- `2026-01-01T00:00:00` - 1er janvier 2026 à minuit

