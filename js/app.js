/* =============================================================
   OIL ROXWOOD — Projet 1
   app.js · icônes, navigation, écrans, routage, recherche.
   Dépend de data.js (les données) et charts.js (les graphiques).
   ============================================================= */

'use strict';

/* ------------------------------------------------------------------
   1. Icônes
   ------------------------------------------------------------------ */
const svgIcon = (paths) =>
  `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS = {
  gauge:   svgIcon('<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M13.4 10.6 17 7"/><path d="M4 19a9 9 0 1 1 16 0"/>'),
  trophy:  svgIcon('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H5v1a3 3 0 0 0 3 3M16 5h3v1a3 3 0 0 1-3 3"/><path d="M10 13v3h4v-3M8 20h8"/>'),
  history: svgIcon('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 4v4h4"/><path d="M12 8v4l3 2"/>'),
  users:   svgIcon('<path d="M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="9.5" cy="8" r="3.2"/><path d="M17 11.5a3 3 0 0 0 0-6"/><path d="M21 20v-1a3.6 3.6 0 0 0-2.5-3.4"/>'),
  truck:   svgIcon('<path d="M2 7h11v9H2z"/><path d="M13 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>'),
  sheet:   svgIcon('<path d="M5 3h9l5 5v13H5z"/><path d="M14 3v5h5"/><path d="M8 12h8M8 16h5"/>'),
  invoice: svgIcon('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>'),
  bank:    svgIcon('<path d="M3 10 12 4l9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 21h18"/>'),
  scale:   svgIcon('<path d="M12 4v16M7 20h10"/><path d="M5 8h14"/><path d="M5 8 2.5 14h5zM19 8l-2.5 6h5z"/>'),
  user:    svgIcon('<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/>'),
  check:   svgIcon('<path d="M4 6h10M4 12h10M4 18h7"/><path d="m16 16 2 2 4-4"/>'),
  calendar:svgIcon('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  log:     svgIcon('<path d="M4 6h16M4 12h16M4 18h10"/>'),
  cog:     svgIcon('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>'),
  tv:      svgIcon('<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/>'),
  bolt:    svgIcon('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
  flame:   svgIcon('<path d="M12 3c1 3.2 3.6 4.4 3.6 7.4A3.6 3.6 0 0 1 8.4 11c0-1 .4-2 1.1-2.8"/><path d="M12 21a5 5 0 0 0 5-5c0-2-1-3-1-3"/>'),
  alert:   svgIcon('<path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>'),
  plus:    svgIcon('<path d="M12 5v14M5 12h14"/>'),
  download:svgIcon('<path d="M12 4v12M7 12l5 5 5-5"/><path d="M4 20h16"/>'),
  clock:   svgIcon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  send:    svgIcon('<path d="m21 3-9 18-2.5-7.5L2 11z"/>'),
  filter:  svgIcon('<path d="M3 5h18l-7 8v6l-4 2v-8z"/>'),
  search:  svgIcon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
  bell:    svgIcon('<path d="M18 8a6 6 0 1 0-12 0c0 7-2 8-2 8h16s-2-1-2-8"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>'),
  upload:  svgIcon('<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2"/>'),
};

/* ------------------------------------------------------------------
   2. Navigation — la seule liste à toucher pour ajouter un écran
   ------------------------------------------------------------------ */
const NAV = [
  { group: 'Pilotage', items: [
    { id: 'overview', label: "Vue d'ensemble", icon: 'gauge' },
    { id: 'primes',   label: 'Semaine & primes', icon: 'trophy' },
    { id: 'history',  label: 'Historique', icon: 'history' },
  ]},
  { group: 'Opérations', items: [
    { id: 'staff',  label: 'Effectif', icon: 'users' },
    { id: 'runs',   label: 'Runs', icon: 'truck', badge: '2' },
    { id: 'sheets', label: 'Feuilles', icon: 'sheet', badge: '4' },
  ]},
  { group: 'Commerce', items: [
    { id: 'billing', label: 'Facturation', icon: 'invoice', badge: '2' },
    { id: 'books',   label: 'Bilan compta', icon: 'bank' },
    { id: 'quotas',  label: 'Quotas commerciaux', icon: 'scale' },
  ]},
  { group: 'Mon espace', items: [
    { id: 'me',      label: 'Ma semaine', icon: 'user' },
    { id: 'todo',    label: 'Ma to-do', icon: 'check' },
    { id: 'agenda',  label: 'Mon agenda', icon: 'calendar' },
  ]},
  { group: 'Système', items: [
    { id: 'tv',       label: 'TV du dépôt', icon: 'tv' },
    { id: 'journal',  label: 'Journal', icon: 'log' },
    { id: 'settings', label: 'Paramètres', icon: 'cog' },
  ]},
];

const SUBTITLES = {
  overview: `Semaine ${WEEK.no} · du ${WEEK.from} au ${WEEK.to} · jour ${WEEK.day}/${WEEK.days}`,
  staff:    `${D.effectif} experts actifs · ${D.quotasOk} au quota`,
  runs:     `${D.runsJour} runs aujourd'hui · 2 en cours`,
  sheets:   `4 feuilles en attente de validation · 1 litige`,
  billing:  `2 factures en retard · 258 800 $ en attente`,
  me:       `${ME.nom} · ${ME.role} · quota ${fmt(ME.quota)} barils`,
};

/* ------------------------------------------------------------------
   3. Petits composants
   ------------------------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);

function kpi({ label, value, unit = '', foot = '', spark = null, hero = false, color }) {
  return `<article class="card col-3 ${hero ? 'card--hero' : ''}">
    <div class="kpi">
      <span class="kpi__label">${label}</span>
      <span class="kpi__value">${value}${unit ? `<em>${unit}</em>` : ''}</span>
      <span class="kpi__foot">${foot}</span>
      ${spark ? sparkline(spark, color || 'var(--line)') : ''}
    </div>
  </article>`;
}

function cardHead(title, hint = '', extra = '') {
  return `<header class="card__head">
    <h2 class="card__title">${title}</h2><span class="spacer"></span>
    ${hint ? `<span class="card__hint">${hint}</span>` : ''}${extra}
  </header>`;
}

const CHIP = {
  ok: 'chip--ok', warn: 'chip--warn', crit: 'chip--crit', info: 'chip--info', neut: '',
};

function emptyState(title, text) {
  return `<div class="empty">
    <span class="empty__icon">${ICONS.bolt}</span>
    <h4>${title}</h4><p>${text}</p>
  </div>`;
}

/* ------------------------------------------------------------------
   4. Écrans
   ------------------------------------------------------------------ */
const SCREENS = {};
const pctObjectif = D.barils / D.objectif * 100;
const pctRythme   = WEEK.day / WEEK.days * 100;

/* ---- Vue d'ensemble ---- */
SCREENS.overview = () => {
  const ca = D.barils * PRIX_BARIL;
  const histoValues = D.histo.slice(0, -1).map(d => d[1]);
  return `
  <div class="grid">
    ${kpi({ label: 'Effectif actif', value: fmt(D.effectif), unit: 'experts',
            foot: `<span class="delta delta--up">▲ ${D.effectifDelta}</span> vs semaine ${WEEK.no - 1}`,
            spark: [28, 29, 29, 30, 31, 31, 32, 34] })}
    ${kpi({ label: `Barils · semaine ${WEEK.no}`, value: fmt(D.barils), hero: true,
            foot: `jour ${WEEK.day}/${WEEK.days} · <span class="delta delta--up">▲ 7,2 %</span> au rythme de S${WEEK.no - 1}`,
            spark: D.jours.slice(0, 4).map(j => j[1]), color: 'var(--magenta-lt)' })}
    ${kpi({ label: "Chiffre d'affaires", value: fmt(ca), unit: '$',
            foot: `à ${PRIX_BARIL} $/baril · 258 800 $ encore à encaisser`,
            spark: histoValues.slice(-8).map(v => v * PRIX_BARIL) })}
    ${kpi({ label: 'Quotas atteints', value: `${D.quotasOk}<em style="font-size:21px">/${D.effectif}</em>`,
            foot: `primes projetées <b style="color:var(--ink);font-family:var(--font-num)">${fmt(D.primes)} $</b>`,
            spark: [12, 14, 13, 16, 15, 18, 17, 19] })}
  </div>

  <div class="grid"><section class="card col-12">
    <div class="goal">
      <div class="goal__title">${ICONS.flame} Objectif collectif de la semaine</div>
      <div class="goal__num"><b>${fmt(D.barils)}</b> / ${fmt(D.objectif)} barils</div>
      <div class="goal__track">
        <i style="width:${Math.min(pctObjectif, 100).toFixed(1)}%"></i>
        ${[25, 50, 75].map(t => `<span class="goal__tick" style="left:${t}%"></span>`).join('')}
        <span class="goal__pace" style="left:${pctRythme.toFixed(1)}%" title="Rythme attendu au jour ${WEEK.day}"></span>
      </div>
      <div class="goal__legend">
        <span>réalisé <b style="color:var(--magenta-lt)">${pctObjectif.toFixed(1)} %</b></span>
        <span>rythme attendu jour ${WEEK.day}/${WEEK.days} · ${pctRythme.toFixed(1)} %</span>
        <span>avance <b style="color:var(--ok-lt)">+${fmt(Math.round(D.barils - D.objectif * pctRythme / 100))} barils</b></span>
        <span>reste <b>${fmt(D.objectif - D.barils)} barils</b> en ${WEEK.days - WEEK.day} jours</span>
      </div>
    </div>
  </section></div>

  <div class="grid">
    <section class="card col-8">
      ${cardHead('Historique des semaines', `barils livrés · S${WEEK.no} en cours (pointillé)`)}
      ${areaChart(D.histo, { height: 250 })}
    </section>
    <section class="card col-4">
      ${cardHead('Répartition par produit')}
      ${donut(D.produits, D.barils)}
    </section>
  </div>

  <div class="grid">
    <section class="card col-5">
      ${cardHead('Production par grade', `semaine ${WEEK.no}`)}
      ${hBars(D.grades, D.barils)}
    </section>
    <section class="card col-4">
      ${cardHead('Rythme quotidien', `objectif ${fmt(Math.round(D.objectif / WEEK.days))} b/jour`)}
      ${vBars(D.jours, { height: 186 })}
    </section>
    <section class="card col-3">
      ${cardHead('Activité')}
      <ul class="feed">${ACTIVITE.map(a => `<li>
        <span class="feed__icon" ${a[1] ? `style="color:var(--${a[1]})"` : ''}>${ICONS[a[0]]}</span>
        <span class="feed__text">${a[2]}</span><time>${a[3]}</time></li>`).join('')}</ul>
    </section>
  </div>`;
};

/* ---- Effectif ---- */
SCREENS.staff = () => `
  <div class="grid"><section class="card col-12" style="display:flex;align-items:center;gap:26px;flex-wrap:wrap">
    <div class="stats" style="flex:1">
      <div><div class="l">Effectif</div><div class="v">${D.effectif}</div></div>
      <div><div class="l">Au quota</div><div class="v" style="color:var(--ok-lt)">${D.quotasOk}</div></div>
      <div><div class="l">Sous quota</div><div class="v" style="color:var(--warn-lt)">${D.effectif - D.quotasOk - 1}</div></div>
      <div><div class="l">En alerte</div><div class="v" style="color:var(--crit-lt)">1</div></div>
      <div><div class="l">Ancienneté moy.</div><div class="v">11 mois</div></div>
      <div><div class="l">Primes projetées</div><div class="v">${fmt(D.primes)} $</div></div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <div class="seg"><button aria-pressed="true">Tous</button><button>Au quota</button><button>En alerte</button></div>
      <button class="btn">${ICONS.filter} Grade</button>
      <button class="btn">${ICONS.download} Exporter</button>
      <button class="btn btn--primary">${ICONS.plus} Ajouter un expert</button>
    </div>
  </section></div>

  <div class="grid"><section class="card col-12">
    ${cardHead(`Classement de la semaine ${WEEK.no}`, `12 des ${D.effectif} experts · trié par production`)}
    <div class="tablewrap"><table class="table" style="min-width:780px">
      <thead><tr><th></th><th>Expert</th><th>Grade</th><th class="num">Produit</th><th class="num">Quota</th>
        <th style="width:180px">Avancement</th><th class="num">Prime</th><th>Ancienneté</th></tr></thead>
      <tbody>${EXPERTS.map((e, i) => {
        const pc = e[4] / e[5] * 100, prime = Math.round(e[4] * 0.35);
        const barClass = { ok: 'bar--ok', warn: 'bar--warn', crit: 'bar--crit' }[e[6]];
        return `<tr>
          <td class="rank">${String(i + 1).padStart(2, '0')}</td>
          <td><div class="person"><span class="who__avatar">${e[1]}</span>
            <span><b>${e[0]}</b><small>Niv. ${e[3]}</small></span></div></td>
          <td style="color:var(--ink-2)">${e[2]}</td>
          <td class="num">${fmt(e[4])}</td>
          <td class="num" style="color:var(--ink-3)">${fmt(e[5])}</td>
          <td><div style="display:flex;align-items:center;gap:9px">
            <div class="bar ${barClass}" style="flex:1"><i style="width:${Math.min(pc, 100).toFixed(0)}%"></i></div>
            <span style="font-family:var(--font-num);font-size:11.5px;width:38px;text-align:right;color:${e[6] === 'crit' ? 'var(--crit-lt)' : 'var(--ink-2)'}">${pc.toFixed(0)}%</span>
          </div></td>
          <td class="num">${fmt(prime)} $</td>
          <td style="color:var(--ink-3);font-family:var(--font-num);font-size:11.5px">${e[7]}</td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>
  </section></div>`;

/* ---- Runs ---- */
SCREENS.runs = () => {
  const ETAT = { done: ['ok', 'Terminé'], live: ['info', 'En cours'], plan: ['neut', 'Planifié'], block: ['crit', 'Bloqué'] };
  const volume = RUNS.filter(r => r[6] === 'done').reduce((a, r) => a + r[5], 0);
  return `
  <div class="grid">
    ${kpi({ label: 'Runs du jour', value: fmt(D.runsJour),
            foot: `<span class="delta delta--up">▲ ${D.runsJour - D.runsPrev}</span> vs lundi dernier`,
            spark: [18, 21, 19, 24, 22, 25, 21, 26] })}
    ${kpi({ label: 'Volume transporté', value: fmt(volume), unit: 'barils', hero: true,
            foot: '3 runs terminés · 2 en cours', spark: [9, 14, 21, 26, 31, 37, 37, 37],
            color: 'var(--magenta-lt)' })}
    ${kpi({ label: 'Durée moyenne', value: '2 h 12',
            foot: `<span class="delta delta--up">▼ 8 min</span> vs moyenne S${WEEK.no - 1}`,
            spark: [148, 151, 146, 142, 139, 140, 134, 132] })}
    ${kpi({ label: 'Incidents', value: '1', foot: 'RUN-4479 bloqué au quai 4',
            spark: [0, 1, 0, 0, 2, 0, 0, 1], color: 'var(--crit)' })}
  </div>

  <div class="grid"><section class="card col-12">
    ${cardHead(`Planning du ${WEEK.from}`, '',
      `<div class="seg"><button aria-pressed="true">Jour</button><button>Semaine</button><button>Carte</button></div>`)}
    <div class="tablewrap"><table class="table" style="min-width:820px">
      <thead><tr><th>Run</th><th>Trajet</th><th>Conducteur</th><th class="num">Départ</th><th class="num">Arrivée</th>
        <th class="num">Barils</th><th>État</th><th></th></tr></thead>
      <tbody>${RUNS.map(r => `<tr>
        <td class="ref">${r[0]}</td><td>${r[1]}</td>
        <td style="color:var(--ink-2)">${r[2]}</td>
        <td class="num">${r[3]}</td><td class="num" style="color:var(--ink-3)">${r[4]}</td>
        <td class="num">${fmt(r[5])}</td>
        <td><span class="chip ${CHIP[ETAT[r[6]][0]]}">${ETAT[r[6]][1]}</span></td>
        <td style="text-align:right"><button class="btn btn--sm">Détail</button></td>
      </tr>`).join('')}</tbody>
    </table></div>
  </section></div>`;
};

/* ---- Feuilles de production ---- */
SCREENS.sheets = () => {
  const ETAT = { ok: ['ok', 'Validée'], wait: ['warn', 'En attente'], dispute: ['crit', 'Litige'] };
  return `
  <div class="grid">
    <section class="card col-8">
      ${cardHead(`Feuilles de la semaine ${WEEK.no}`, 'saisies par les chefs de quart')}
      <div class="tablewrap"><table class="table" style="min-width:720px">
        <thead><tr><th>Référence</th><th>Expert</th><th>Poste</th><th>Créneau</th><th class="num">Barils</th><th>État</th></tr></thead>
        <tbody>${FEUILLES.map(f => `<tr>
          <td class="ref">${f[0]}</td><td>${f[1]}</td>
          <td style="color:var(--ink-2)">${f[2]}</td>
          <td style="font-family:var(--font-num);font-size:11.5px;color:var(--ink-3)">${f[3]}</td>
          <td class="num">${fmt(f[4])}</td>
          <td><span class="chip ${CHIP[ETAT[f[5]][0]]}">${ETAT[f[5]][1]}</span></td>
        </tr>`).join('')}</tbody>
      </table></div>
    </section>

    <div class="col-4 stack">
      <section class="card">
        ${cardHead('À traiter')}
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:11px">
            <span class="feed__icon" style="width:34px;height:34px;background:rgba(229,160,13,.14);color:var(--warn)">${ICONS.clock}</span>
            <div><b style="font-family:var(--font-num);font-size:19px">4</b>
              <div style="font-size:12.5px;color:var(--ink-3)">feuilles en attente de validation</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:11px">
            <span class="feed__icon" style="width:34px;height:34px;background:rgba(224,83,61,.14);color:var(--crit)">${ICONS.alert}</span>
            <div><b style="font-family:var(--font-num);font-size:19px">1</b>
              <div style="font-size:12.5px;color:var(--ink-3)">litige compteur ouvert</div></div>
          </div>
          <button class="btn btn--primary" style="width:100%;justify-content:center">Valider les 4 feuilles</button>
        </div>
      </section>

      <section class="card">
        ${cardHead('Litige FP-2036-122')}
        <p style="margin:0 0 13px;font-size:13px;color:var(--ink-2)">Ivy Novak a déclaré
          <b style="color:var(--ink);font-family:var(--font-num)">5 940</b> barils.
          Le compteur du conditionnement en relève
          <b style="color:var(--ink);font-family:var(--font-num)">5 320</b>.</p>
        <div class="stats" style="margin-bottom:14px">
          <div><div class="l">Écart</div><div class="v" style="color:var(--crit-lt)">620 b</div></div>
          <div><div class="l">Impact prime</div><div class="v">217 $</div></div>
          <div><div class="l">Ouvert depuis</div><div class="v">2 h</div></div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn">Retenir la saisie</button>
          <button class="btn">Retenir le compteur</button>
        </div>
      </section>
    </div>
  </div>`;
};

/* ---- Facturation ---- */
SCREENS.billing = () => {
  const ETAT = { paid: ['ok', 'Payée'], sent: ['info', 'Envoyée'], late: ['crit', 'En retard'], draft: ['neut', 'Brouillon'] };
  const somme = (etat) => FACTURES.filter(f => f[4] === etat).reduce((a, f) => a + f[3], 0);
  const encaisse = somme('paid'), attente = somme('sent'), retard = somme('late');
  const aging = [['0-7 j', '', 108300], ['8-15 j', '', 134500], ['16-30 j', '', 120100]];
  const totalAging = aging.reduce((a, r) => a + r[2], 0);
  return `
  <div class="grid">
    ${kpi({ label: 'Encaissé ce mois', value: fmt(encaisse), unit: '$', foot: '2 factures soldées',
            spark: [41, 52, 49, 63, 78, 96, 132, 149], color: 'var(--serie-2)' })}
    ${kpi({ label: 'En attente', value: fmt(attente), unit: '$', hero: true,
            foot: '2 factures envoyées, non échues', spark: [96, 120, 108, 142, 133, 178, 212, 243],
            color: 'var(--magenta-lt)' })}
    ${kpi({ label: 'En retard', value: fmt(retard), unit: '$',
            foot: '<span class="delta delta--down">▲ 2 factures</span> · relance à envoyer',
            spark: [0, 0, 42, 42, 42, 78, 120, 120], color: 'var(--crit)' })}
    ${kpi({ label: 'Délai moyen', value: '14', unit: 'jours', foot: 'objectif interne : 10 jours',
            spark: [11, 12, 11, 13, 12, 14, 15, 14], color: 'var(--serie-4)' })}
  </div>

  <div class="grid">
    <section class="card col-8">
      ${cardHead('Factures clients', '', `<button class="btn">${ICONS.send} Relancer les retards</button>`)}
      <div class="tablewrap"><table class="table" style="min-width:700px">
        <thead><tr><th>N°</th><th>Client</th><th>Émise</th><th class="num">Montant</th><th class="num">Âge</th><th>État</th></tr></thead>
        <tbody>${FACTURES.map(f => `<tr>
          <td class="ref">${f[0]}</td><td>${f[1]}</td>
          <td style="font-family:var(--font-num);font-size:11.5px;color:var(--ink-3)">${f[2]}</td>
          <td class="num">${fmt(f[3])} $</td>
          <td class="num" style="color:${f[4] === 'late' ? 'var(--crit-lt)' : 'var(--ink-3)'}">${f[5] ? f[5] + ' j' : '—'}</td>
          <td><span class="chip ${CHIP[ETAT[f[4]][0]]}">${ETAT[f[4]][1]}</span></td>
        </tr>`).join('')}</tbody>
      </table></div>
    </section>

    <div class="col-4 stack">
      <section class="card">
        ${cardHead('Encours par ancienneté')}
        ${hBars(aging, totalAging)}
        <p style="margin:13px 0 0;font-size:12.5px;color:var(--ink-3)">Aucune créance de plus de 30 jours —
          la relance automatique part à J+15.</p>
      </section>
      <section class="card">
        ${cardHead('Rapprochement')}
        <div class="stats">
          <div><div class="l">Barils facturés</div><div class="v">102 340</div></div>
          <div><div class="l">Barils produits</div><div class="v">${fmt(D.barils)}</div></div>
          <div><div class="l">Non facturé</div><div class="v" style="color:var(--warn-lt)">66 090</div></div>
        </div>
        <div style="margin-top:14px">
          <div class="bar bar--warn"><i style="width:60.8%"></i></div>
          <p style="margin:9px 0 0;font-size:12.5px;color:var(--ink-3)">60,8 % de la production de la semaine
            est déjà facturée. 330 450 $ restent à émettre.</p>
        </div>
      </section>
    </div>
  </div>`;
};

/* ---- Ma semaine ---- */
SCREENS.me = () => {
  const pc = ME.produit / ME.quota * 100;
  const PRIORITE = { crit: 'Urgent', warn: "Aujourd'hui", info: 'Cette semaine', neut: 'Plus tard' };
  return `
  <div class="grid">
    <section class="card col-4" style="text-align:center">
      ${cardHead('Mon quota')}
      <div style="display:grid;place-items:center">${gauge(pc, { size: 210, label: 'DU QUOTA' })}</div>
      <p style="margin:2px 0 14px;font-family:var(--font-num);font-size:12.5px;color:var(--ink-2)">
        ${fmt(ME.produit)} / ${fmt(ME.quota)} barils —
        <span style="color:var(--ok-lt)">+${fmt(ME.produit - ME.quota)} au-delà du quota</span></p>
      <div class="stats" style="justify-content:center">
        <div><div class="l">Prime acquise</div><div class="v" style="color:var(--magenta-lt)">5 187 $</div></div>
        <div><div class="l">Rang</div><div class="v">${ME.rang}<span style="font-size:12px;color:var(--ink-3)">/${D.effectif}</span></div></div>
      </div>
    </section>

    <section class="card col-4">
      ${cardHead('Ma production quotidienne', `objectif ${fmt(Math.round(ME.quota / WEEK.days))} b/j`)}
      ${vBars([['Lun', 4180], ['Mar', 3960], ['Mer', 3510], ['Jeu', 3170], ['Ven', 0], ['Sam', 0], ['Dim', 0]], { height: 196 })}
    </section>

    <section class="card col-4">
      ${cardHead('Mon agenda', WEEK.from)}
      <ul class="feed">${AGENDA.map(a => `<li class="${a[2] === 'done' ? 'done' : ''}">
        <span class="feed__icon" style="${a[2] === 'now' ? 'background:rgba(139,92,246,.22);color:var(--violet-lt)' : a[2] === 'done' ? 'color:var(--ok)' : ''}">
          ${a[2] === 'done' ? ICONS.check : a[2] === 'now' ? ICONS.bolt : ICONS.clock}</span>
        <span class="feed__text">${a[1]}</span><time>${a[0]}</time></li>`).join('')}</ul>
    </section>
  </div>

  <div class="grid">
    <section class="card col-7">
      ${cardHead('Ma to-do', '2 urgentes')}
      <ul class="feed">${TODO.map(t => `<li>
        <span class="feed__icon" style="color:var(--${t[1] === 'neut' ? 'ink-2' : t[1]})">${t[2] ? ICONS.alert : ICONS.check}</span>
        <span class="feed__text">${t[0]}</span>
        <span class="chip ${CHIP[t[1]]}">${PRIORITE[t[1]]}</span></li>`).join('')}</ul>
    </section>

    <section class="card col-5">
      ${cardHead('Mes 4 dernières semaines', `S${WEEK.no} en cours`)}
      ${vBars([['S33', 13100], ['S34', 13820], ['S35', 15240], ['S36', ME.produit]], { height: 196 })}
      <p style="margin:11px 0 0;font-size:12.5px;color:var(--ink-3)">Moyenne
        <b style="color:var(--ink);font-family:var(--font-num)">14 053</b> barils/semaine sur les 3 semaines closes —
        quota reconduit à ${fmt(ME.quota)} pour la S${WEEK.no + 1}.</p>
    </section>
  </div>`;
};

/* ---- Écrans encore vides ---- */
function stub(label) {
  return `<div class="grid"><section class="card col-12">
    ${emptyState(label, "Écran prévu au périmètre, pas encore construit. Six écrans sont complets : Vue d'ensemble, Effectif, Runs, Feuilles de production, Facturation et Ma semaine.")}
  </section></div>`;
}

/* ------------------------------------------------------------------
   5. Routage
   ------------------------------------------------------------------ */
function labelOf(id) {
  for (const g of NAV) for (const it of g.items) if (it.id === id) return it.label;
  return id;
}

function renderNav(activeId) {
  $('#nav').innerHTML = NAV.map(g => `
    <div class="navgroup">
      <h3 class="navgroup__title">${g.group}</h3>
      <div class="nav">
        ${g.items.map(it => `
          <button class="nav__item" type="button" data-screen="${it.id}" title="${it.label}"
                  ${it.id === activeId ? 'aria-current="page"' : ''}>
            ${ICONS[it.icon] || ICONS.bolt}<span>${it.label}</span>
            ${it.badge ? `<span class="badge">${it.badge}</span>` : ''}
          </button>`).join('')}
      </div>
    </div>`).join('');
}

function goTo(id) {
  const render = SCREENS[id];
  $('#view').innerHTML = render ? render() : stub(labelOf(id));
  $('#pageTitle').textContent = labelOf(id);
  $('#pageSub').textContent = SUBTITLES[id] || '';
  renderNav(id);
  wireCharts($('#view'));
  window.scrollTo({ top: 0 });
  location.hash = id;
}

document.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-screen]');
  if (nav) { goTo(nav.dataset.screen); closePalette(); return; }
  const seg = e.target.closest('.seg button');
  if (seg) {
    seg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', 'false'));
    seg.setAttribute('aria-pressed', 'true');
  }
});

/* ------------------------------------------------------------------
   6. Recherche rapide (⌘K / Ctrl+K)
   ------------------------------------------------------------------ */
const ENTRIES = [
  ...NAV.flatMap(g => g.items.map(it => ({ group: 'Écrans', label: it.label, id: it.id, icon: it.icon }))),
  ...EXPERTS.map(e => ({ group: 'Experts', label: `${e[0]} · ${e[2]}`, id: 'staff', icon: 'user' })),
  ...FACTURES.map(f => ({ group: 'Factures', label: `${f[0]} · ${f[1]}`, id: 'billing', icon: 'invoice' })),
  ...RUNS.map(r => ({ group: 'Runs', label: `${r[0]} · ${r[1]}`, id: 'runs', icon: 'truck' })),
];

function drawPalette(query = '') {
  const q = query.trim().toLowerCase();
  const hits = ENTRIES.filter(e => e.label.toLowerCase().includes(q)).slice(0, 12);
  let lastGroup = '';
  $('#cmdResults').innerHTML = hits.length
    ? hits.map(e => {
        const head = e.group !== lastGroup ? `<div class="cmd__group">${e.group}</div>` : '';
        lastGroup = e.group;
        return head + `<button type="button" data-screen="${e.id}">${ICONS[e.icon] || ICONS.bolt}<span>${e.label}</span></button>`;
      }).join('')
    : `<div class="cmd__group" style="padding:16px">Aucun résultat</div>`;
}
function openPalette() {
  $('#palette').hidden = false;
  $('#cmdInput').value = '';
  drawPalette();
  $('#cmdInput').focus();
}
function closePalette() { $('#palette').hidden = true; }

$('#openSearch').addEventListener('click', openPalette);
$('#cmdInput').addEventListener('input', (e) => drawPalette(e.target.value));
$('#palette').addEventListener('click', (e) => { if (e.target.id === 'palette') closePalette(); });
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#palette').hidden ? openPalette() : closePalette(); }
  if (e.key === 'Escape') closePalette();
});

/* ------------------------------------------------------------------
   7. Démarrage
   ------------------------------------------------------------------ */
$('#weekLabel').textContent = `Semaine ${WEEK.no}`;
$('#pipelineFill').style.width = Math.min(pctObjectif, 100).toFixed(1) + '%';
$('#flowRate').textContent = fmt(D.debitInstantane) + ' b/h';

const startId = location.hash.slice(1);
const known = NAV.some(g => g.items.some(it => it.id === startId));
goTo(known ? startId : 'overview');
