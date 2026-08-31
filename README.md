# Oil Roxwood — Projet 1

Tableau de bord « Espace membre », direction artistique **Néon nocturne**.
Six écrans complets avec un jeu de données de démonstration, sans librairie ni build.

## Lancer

Double-cliquer sur `index.html`. Les polices viennent de Google Fonts ; hors ligne,
le navigateur retombe sur des polices système sans casser la mise en page.

## Arborescence

```
index.html        coquille : rail latéral, barre du haut, barre d'état, recherche
css/theme.css     tous les jetons de design (couleurs, typo, rayons, ombres, lueurs)
css/app.css       squelette et composants (cartes, KPI, tableaux, pastilles, grille)
js/data.js        LE jeu de données — le seul fichier à remplacer
js/charts.js      graphiques en SVG : sparkline, aire, anneau, jauge, barres
js/app.js         icônes, navigation, écrans, routage, recherche ⌘K
```

## Ce qui est construit

| Écran | Contenu |
|---|---|
| Vue d'ensemble | 4 KPI + sparklines, objectif collectif avec repère de rythme, historique 12 semaines, répartition par produit, production par grade, rythme quotidien, activité |
| Effectif | bandeau de synthèse, classement des experts avec avancement du quota et prime |
| Runs | 4 KPI, planning du jour avec états |
| Feuilles | table des saisies, file « à traiter », fiche de litige |
| Facturation | 4 KPI, factures clients, encours par ancienneté, rapprochement production / facturation |
| Ma semaine | jauge de quota, production quotidienne, agenda, to-do, 4 dernières semaines |

Les autres entrées du menu (Primes, Historique, Bilan compta, Quotas commerciaux,
To-do, Agenda, TV du dépôt, Journal, Paramètres) affichent un état vide propre.

## Brancher les vraies données

Tout part de `js/data.js` : mêmes noms, mêmes formes, et le reste suit.

```js
const D = { barils: 168430, objectif: 275000, /* … */ };
const EXPERTS = [ ['Nom','NI','Grade',niveau,produit,quota,'ok','ancienneté'], … ];
```

Pour ajouter un écran : une entrée dans `NAV` (`js/app.js`), puis
`SCREENS.monEcran = () => \`…\``. Sans cela, l'écran affiche l'état vide.

## Règles à tenir

- **Aucune couleur codée en dur hors de `theme.css`.** Si une teinte manque, on l'ajoute
  comme variable.
- **Séries de données : `--serie-1` à `--serie-4`, dans cet ordre.** Cette palette a été
  validée (bande de luminosité, écart daltonien, contraste sur ce fond violet). Une 5ᵉ teinte
  improvisée casserait la lisibilité — préférer un regroupement « Autres » ou des
  petits multiples.
- **Les couleurs d'état** (`--ok`, `--warn`, `--crit`) sont réservées à l'état. Elles ne
  servent jamais de « couleur de série n° 5 », et s'accompagnent toujours d'un mot,
  pas seulement d'une pastille.
- **Une seule échelle par graphique.** Jamais deux axes Y : deux mesures d'ordres différents
  = deux graphiques.
- **Tous les chiffres** en `var(--font-num)` avec `font-variant-numeric: tabular-nums`.
- Après chaque rendu contenant une aire, rappeler `wireCharts()` pour réactiver le survol.
- La direction Néon perd du contraste en plein jour : elle est prévue pour un poste
  en intérieur. Pour un écran d'atelier, prévoir une variante claire.

## Raccourcis

- `⌘K` / `Ctrl+K` — recherche rapide (écrans, experts, factures, runs)
- `Échap` — fermer la recherche
- L'URL retient l'écran courant (`index.html#billing`)

## État

`v1.0` — six écrans complets sur données de démonstration.
