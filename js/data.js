/* =============================================================
   OIL ROXWOOD — Projet 1
   data.js · jeu de démonstration.

   C'EST LE SEUL FICHIER À REMPLACER quand les vraies données
   arrivent : même forme, même nom d'export, et tout le reste suit.
   ============================================================= */

'use strict';

/* --- Contexte de la semaine affichée --------------------------------- */
const WEEK = {
  no: 36,
  from: 'lundi 31 août',
  to: 'dimanche 6 septembre',
  day: 4,      // jour écoulé dans la semaine
  days: 7,
};

const PRIX_BARIL = 5; // $ par baril

/* --- Chiffres consolidés --------------------------------------------- */
const D = {
  effectif: 34,
  effectifDelta: 3,
  barils: 168430,
  barilsPrev: 370374,
  objectif: 275000,
  quotasOk: 19,
  primes: 47850,
  runsJour: 26,
  runsPrev: 21,
  debitInstantane: 1842,   // barils / heure

  /* 12 semaines ; la dernière est la semaine en cours (tracée en pointillé) */
  histo: [
    ['S25', 218400], ['S26', 241900], ['S27', 233100], ['S28', 262500],
    ['S29', 249800], ['S30', 286300], ['S31', 271400], ['S32', 304600],
    ['S33', 318900], ['S34', 341200], ['S35', 370374], ['S36', 168430],
  ],

  /* [grade, effectif, barils] — total = D.barils */
  grades: [
    ['Technicien', 9, 41700],
    ['Chef de quart', 6, 38900],
    ['Ingénieur procédé', 4, 31200],
    ['Opérateur', 10, 29230],
    ['Superviseur', 5, 27400],
  ],

  /* [produit, barils] — assigne serie-1..4 dans cet ordre, jamais plus */
  produits: [
    ['Brut léger', 69056],
    ['Diesel', 45476],
    ['Kérosène', 32002],
    ['Bitume', 21896],
  ],

  /* [jour, barils] — 0 = jour non encore couru */
  jours: [['Lun', 52180], ['Mar', 44960], ['Mer', 41310], ['Jeu', 29980], ['Ven', 0], ['Sam', 0], ['Dim', 0]],
};

/* --- Effectif : [nom, initiales, grade, niveau, produit, quota, état, ancienneté] --- */
const EXPERTS = [
  ['Diego Herrera',   'DH', 'Direction',         6, 14820, 12000, 'ok',   '2 ans 4 mois'],
  ['Amara Okonkwo',   'AO', 'Ingénieur procédé', 5, 12640, 10000, 'ok',   '1 an 8 mois'],
  ['Lucas Ferreira',  'LF', 'Chef de quart',     4, 11980, 10000, 'ok',   '1 an 1 mois'],
  ['Nadia Belkacem',  'NB', 'Ingénieur procédé', 5, 11430, 10000, 'ok',   '11 mois'],
  ['Sven Halvorsen',  'SH', 'Chef de quart',     4,  9870, 10000, 'warn', '2 ans 0 mois'],
  ['Mia Tanaka',      'MT', 'Superviseur',       3,  9240,  8000, 'ok',   '7 mois'],
  ['Rui Almeida',     'RA', 'Technicien',        2,  8110,  6000, 'ok',   '1 an 5 mois'],
  ['Clara Vogt',      'CV', 'Superviseur',       3,  7620,  8000, 'warn', '4 mois'],
  ['Oumar Diallo',    'OD', 'Technicien',        2,  7180,  6000, 'ok',   '9 mois'],
  ['Ivy Novak',       'IN', 'Technicien',        2,  5940,  6000, 'warn', '3 mois'],
  ['Tomas Reyes',     'TR', 'Opérateur',         1,  4830,  4000, 'ok',   '1 an 2 mois'],
  ['Hana Kovac',      'HK', 'Opérateur',         1,  3110,  4000, 'crit', '2 mois'],
];

/* --- Runs : [ref, trajet, conducteur, départ, arrivée, barils, état] --- */
const RUNS = [
  ['RUN-4471', 'Dépôt Nord → Raffinerie A',       'Lucas Ferreira',  '06:00', '08:40', 12400, 'done'],
  ['RUN-4472', 'Puits 7 → Dépôt Nord',            'Amara Okonkwo',   '07:15', '09:05',  9800, 'done'],
  ['RUN-4473', 'Raffinerie A → Terminal Est',     'Mia Tanaka',      '09:20', '11:50', 15200, 'done'],
  ['RUN-4474', 'Puits 3 → Dépôt Sud',             'Rui Almeida',     '10:05', '—',      8600, 'live'],
  ['RUN-4475', 'Dépôt Sud → Raffinerie B',        'Sven Halvorsen',  '11:30', '—',     11000, 'live'],
  ['RUN-4476', 'Terminal Est → Client Vespucci',  'Nadia Belkacem',  '13:00', '—',     18400, 'plan'],
  ['RUN-4477', 'Puits 7 → Dépôt Nord',            'Oumar Diallo',    '14:15', '—',      9800, 'plan'],
  ['RUN-4478', 'Raffinerie B → Terminal Ouest',   'Clara Vogt',      '15:40', '—',     13600, 'plan'],
  ['RUN-4479', 'Dépôt Nord → Client Bayview',     'Tomas Reyes',     '17:00', '—',      7400, 'block'],
];

/* --- Feuilles de production : [ref, expert, poste, créneau, barils, état] --- */
const FEUILLES = [
  ['FP-2036-118', 'Amara Okonkwo',  'Colonne C-201',     '31/08 · 06:00-14:00', 12640, 'ok'],
  ['FP-2036-119', 'Lucas Ferreira', 'Unité de craquage', '31/08 · 06:00-14:00', 11980, 'ok'],
  ['FP-2036-120', 'Mia Tanaka',     'Stockage B',        '31/08 · 14:00-22:00',  9240, 'wait'],
  ['FP-2036-121', 'Sven Halvorsen', 'Colonne C-202',     '31/08 · 14:00-22:00',  9870, 'wait'],
  ['FP-2036-122', 'Ivy Novak',      'Conditionnement',   '31/08 · 14:00-22:00',  5940, 'dispute'],
  ['FP-2036-123', 'Hana Kovac',     'Chargement quai 4', '31/08 · 22:00-06:00',  3110, 'wait'],
];

/* --- Factures : [n°, client, émise, montant $, état, âge en jours] --- */
const FACTURES = [
  ['F-2026-0841', 'Vespucci Petro',       '04/08',  96400, 'paid',   0],
  ['F-2026-0842', 'Bayview Logistics',    '07/08',  52800, 'paid',   0],
  ['F-2026-0843', 'Del Perro Marine',     '12/08',  78200, 'late',  19],
  ['F-2026-0844', 'Sandy Shores Energy',  '18/08', 134500, 'sent',  13],
  ['F-2026-0845', 'Paleto Transit',       '21/08',  41900, 'late',  10],
  ['F-2026-0846', 'Vespucci Petro',       '25/08', 108300, 'sent',   6],
  ['F-2026-0847', 'Grapeseed Agri',       '28/08',  36700, 'draft',  3],
];

/* --- Journée de l'utilisateur connecté : [heure, intitulé, état] --- */
const AGENDA = [
  ['08:00', 'Relève de quart · équipe B',                  'done'],
  ['09:30', 'Point sécurité torchère',                     'done'],
  ['11:00', 'Validation des feuilles S36 (4 en attente)',  'now'],
  ['14:00', 'Appel client Del Perro Marine — facture 0843','next'],
  ['16:30', 'Revue des quotas 3 semaines',                 'next'],
  ['18:00', 'Clôture partielle du lundi',                  'next'],
];

/* --- To-do : [intitulé, priorité, urgent] --- */
const TODO = [
  ['Relancer Del Perro Marine (19 j de retard)',            'crit', true],
  ['Trancher le litige feuille FP-2036-122',                'warn', true],
  ['Valider les 4 feuilles en attente',                     'warn', false],
  ["Réajuster le quota de Hana Kovac (2 mois d'ancienneté)",'info', false],
  ['Préparer la clôture du lundi',                          'neut', false],
];

/* --- Activité récente : [icône, ton, texte html, âge] --- */
const ACTIVITE = [
  ['alert',   'crit', '<b>Écart compteur</b> <span>sur FP-2036-122 — 620 b</span>', 'il y a 8 min'],
  ['truck',   '',     '<b>RUN-4475</b> <span>parti vers Raffinerie B</span>',       'il y a 24 min'],
  ['sheet',   '',     '<b>2 feuilles</b> <span>validées par Diego H.</span>',       'il y a 41 min'],
  ['invoice', 'warn', '<b>F-2026-0843</b> <span>en retard de 19 jours</span>',      'il y a 2 h'],
  ['users',   '',     '<b>Ivy Novak</b> <span>passée Technicien</span>',            'il y a 5 h'],
];

/* --- Utilisateur connecté --- */
const ME = { nom: 'Diego Herrera', initiales: 'DH', role: 'Direction', quota: 12000, produit: 14820, rang: 1 };
