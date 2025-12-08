# Adaptation du projet ANUTTC vers ANDF

## Récapitulatif des modifications effectuées

### ✅ 1. Identité visuelle
- **ANUTTC** → **ANDF** (Agence Nationale du Domaine et du Foncier)
- Logo : `anuttc-logo.jpeg` → `logo-andf.png` 
- Classes CSS : `anuttc-green` → `andf-green`
- Couleurs adaptées : Vert foncé (#006400) et or (#FFD700) pour le Bénin

### ✅ 2. Fichiers renommés
- `anuttc-theme.css` → `andf-theme.css`
- `anuttc-theme.css.1.css` → `andf-theme.css.1.css`
- Suppression des fichiers `souscrire&operation=X.html`

### ✅ 3. Meta et SEO
- **Titles** : "ANDF - Agence Nationale du Domaine et du Foncier (Bénin)"
- **Meta descriptions** : Adaptées pour les services fonciers du Bénin
- **Alt images** : "ANDF Bénin" au lieu de "ANUTTC"

### ✅ 4. URLs et liens
- `anuttc-gb.com` → `andf.bj`
- Tous les liens de navigation mis à jour
- Favicon : `logo-andf.png`

### ✅ 5. Contenus textuels adaptés
- **Mission ANDF** : Gestion et sécurisation foncière, délivrance de titres de propriété, cadastre national
- **Services** : e-Foncier Bénin, services numériques
- **Localisation** : Gabon/Libreville → Bénin/Cotonou
- **Témoignages** : Adaptés au contexte béninois

### ✅ 6. Pages spécifiques
- **Contact** : 
  - Email : `contact@andf.bj`
  - Téléphone : `+229 XX XX XX XX`
  - Adresse : `Cotonou, Bénin`
- **Paiement** : Support Mobile Money (MTN MoMo, Moov Money)
- **Services** : Titres de propriété, cadastre, e-Foncier numérique

### ✅ 7. Zones géographiques
- **Cotonou** (Littoral) - Titres de propriété
- **Porto-Novo** (Ouémé) - Services cadastraux  
- **Parakou** (Borgou) - e-Foncier numérique

### ✅ 8. Nettoyage final
- Suppression de toutes les références ANUTTC/Gabon
- Mise à jour des copyrights
- Harmonisation des styles CSS

## Structure finale des fichiers

```
anuttc-main/
├── andf-theme.css
├── andf-theme.css.1.css
├── logo-andf.png
├── index.html
├── apropos.html
├── contact.html
├── conditions.html
├── identification.html
├── paiement.html
├── recherche-quittance.html
├── souscrire.html
├── type-parcelle.html
└── CHANGEMENTS_ANDF.md
```

## Résultat
🎯 **Site entièrement adapté pour l'ANDF Bénin** avec :
- Identité visuelle cohérente  
- Contenus adaptés aux services fonciers
- Informations de contact béninoises
- Support des paiements locaux
- SEO optimisé pour le Bénin

Le site est maintenant prêt pour l'Agence Nationale du Domaine et du Foncier du Bénin !