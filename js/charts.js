/* =============================================================
   OIL ROXWOOD — Projet 1
   charts.js · graphiques en SVG, sans librairie.

   Règles tenues ici :
   — une seule échelle par graphique, jamais deux axes ;
   — les séries prennent --serie-1..4 dans l'ordre, sans boucler ;
   — les valeurs restent en var(--font-num) avec tabular-nums ;
   — grille et axes en retrait, la donnée devant.
   ============================================================= */

'use strict';

const fmt = (n) => n.toLocaleString('fr-FR');
const SERIES = ['var(--serie-1)', 'var(--serie-2)', 'var(--serie-3)', 'var(--serie-4)'];

/* ------------------------------------------------------------------
   Infobulle partagée
   ------------------------------------------------------------------ */
let tipEl = null;
function tipShow(html, x, y) {
  if (!tipEl) tipEl = document.getElementById('tooltip');
  tipEl.innerHTML = html;
  tipEl.style.left = x + 'px';
  tipEl.style.top = y + 'px';
  tipEl.classList.add('is-on');
}
function tipHide() { if (tipEl) tipEl.classList.remove('is-on'); }

/* ------------------------------------------------------------------
   Sparkline — aire + trait + point final accentué
   ------------------------------------------------------------------ */
let sparkId = 0;
function sparkline(values, color = 'var(--line)') {
  const w = 100, h = 30, id = 'sp' + (++sparkId);
  const min = Math.min(...values), max = Math.max(...values), span = (max - min) || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - 2 - ((v - min) / span) * (h - 6)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const last = pts[pts.length - 1];
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}" stop-opacity=".34"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
    <path d="${line} L ${w} ${h} L 0 ${h} Z" fill="url(#${id})"/>
    <path d="${line}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linejoin="round"
          vector-effect="non-scaling-stroke"/>
    <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="2.4" fill="${color}"
            vector-effect="non-scaling-stroke"/>
  </svg>`;
}

/* ------------------------------------------------------------------
   Aire chronologique — dernier point en pointillé (période en cours)
   Survol : curseur vertical + infobulle.
   ------------------------------------------------------------------ */
function areaChart(data, { height = 250, unit = 'barils', dashLast = true, label = 'Semaine' } = {}) {
  const w = 760, h = height, pad = { t: 14, r: 16, b: 26, l: 52 };
  const max = Math.max(...data.map(d => d[1])) * 1.08;
  const X = i => pad.l + (i / (data.length - 1)) * (w - pad.l - pad.r);
  const Y = v => h - pad.b - (v / max) * (h - pad.t - pad.b);
  const gy = [0, .25, .5, .75, 1].map(k => max * k);
  const solid = dashLast ? data.slice(0, -1) : data;
  const line = solid.map((d, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(d[1]).toFixed(1)).join(' ');
  const area = `${line} L ${X(solid.length - 1).toFixed(1)} ${h - pad.b} L ${X(0)} ${h - pad.b} Z`;
  const tail = dashLast
    ? `M ${X(data.length - 2).toFixed(1)} ${Y(data[data.length - 2][1]).toFixed(1)}
       L ${X(data.length - 1).toFixed(1)} ${Y(data[data.length - 1][1]).toFixed(1)}` : '';

  return `<svg class="chart-area" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"
       style="display:block;width:100%;height:${h}px;overflow:visible">
    <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--fill-top)"/><stop offset="100%" stop-color="var(--fill-bottom)"/>
    </linearGradient></defs>
    ${gy.map(v => `
      <line x1="${pad.l}" x2="${w - pad.r}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"
            stroke="var(--stroke)" stroke-width="1" vector-effect="non-scaling-stroke"/>
      <text x="${pad.l - 8}" y="${(Y(v) + 3.5).toFixed(1)}" text-anchor="end" fill="var(--ink-3)"
            font-size="10" font-family="JetBrains Mono">${v >= 1000 ? Math.round(v / 1000) + 'k' : Math.round(v)}</text>`).join('')}
    <path d="${area}" fill="url(#areaFill)"/>
    <path d="${line}" fill="none" stroke="var(--line)" stroke-width="7" opacity=".2"
          vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
    <path d="${line}" fill="none" stroke="var(--line)" stroke-width="2" stroke-linejoin="round"
          stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    ${tail ? `<path d="${tail}" fill="none" stroke="var(--line)" stroke-width="2" stroke-dasharray="4 4"
          opacity=".65" vector-effect="non-scaling-stroke"/>` : ''}
    ${data.map((d, i) => {
      const last = i === data.length - 1;
      return `<circle cx="${X(i).toFixed(1)}" cy="${Y(d[1]).toFixed(1)}" r="${last ? 4 : 2.6}"
        fill="${last ? 'var(--magenta-lt)' : 'var(--line)'}" stroke="#0E0B1D"
        stroke-width="${last ? 2 : 1.5}" vector-effect="non-scaling-stroke"/>`;
    }).join('')}
    ${data.map((d, i) => (i % 2 === 0 || i >= data.length - 2)
      ? `<text x="${X(i).toFixed(1)}" y="${h - 8}" text-anchor="middle" fill="var(--ink-3)"
              font-size="10" font-family="JetBrains Mono">${d[0]}</text>` : '').join('')}
    <line class="crosshair" x1="0" x2="0" y1="${pad.t - 6}" y2="${h - pad.b}" stroke="var(--stroke-2)"
          stroke-width="1" vector-effect="non-scaling-stroke" opacity="0"/>
    ${data.map((d, i) => `<rect class="hit" x="${(X(i) - 14).toFixed(1)}" y="${pad.t - 6}" width="28"
        height="${h - pad.b - pad.t + 6}" fill="transparent"
        data-cx="${X(i).toFixed(1)}" data-label="${label} ${d[0]}" data-value="${d[1]}" data-unit="${unit}"></rect>`).join('')}
  </svg>`;
}

/** À rappeler après chaque rendu : active le survol des aires. */
function wireCharts(root = document) {
  root.querySelectorAll('svg.chart-area').forEach(svg => {
    const cross = svg.querySelector('.crosshair');
    svg.querySelectorAll('.hit').forEach(hit => {
      hit.addEventListener('mouseenter', () => {
        const cx = hit.dataset.cx;
        cross.setAttribute('x1', cx); cross.setAttribute('x2', cx); cross.setAttribute('opacity', '1');
        const box = hit.getBoundingClientRect();
        tipShow(`<div class="h">${hit.dataset.label}</div>
          <div class="v"><i style="background:var(--line)"></i>${fmt(+hit.dataset.value)} ${hit.dataset.unit}</div>`,
          box.left + box.width / 2, box.top + box.height * 0.35);
      });
      hit.addEventListener('mouseleave', () => { cross.setAttribute('opacity', '0'); tipHide(); });
    });
  });
}

/* ------------------------------------------------------------------
   Barres horizontales — magnitude, teinte unique
   rows : [libellé, effectif|'', valeur]
   ------------------------------------------------------------------ */
function hBars(rows, total) {
  const max = Math.max(...rows.map(r => r[2]));
  return `<div class="hbars">${rows.map(r => `
    <div>
      <div class="hbars__head">
        <span>${r[0]}</span>
        ${r[1] ? `<span class="exp">${r[1]} exp.</span>` : ''}
        <span style="flex:1"></span>
        <span class="val">${fmt(r[2])}</span>
        <span class="pct">${(r[2] / total * 100).toFixed(1)}%</span>
      </div>
      <div class="bar" title="${r[0]} · ${fmt(r[2])}">
        <i style="width:${(r[2] / max * 100).toFixed(1)}%;opacity:${(0.6 + 0.4 * r[2] / max).toFixed(2)}"></i>
      </div>
    </div>`).join('')}</div>`;
}

/* ------------------------------------------------------------------
   Anneau catégoriel — 4 séries maximum, écart de 3 unités entre parts
   rows : [libellé, valeur]
   ------------------------------------------------------------------ */
function donut(rows, total, { size = 168, sub = 'BARILS' } = {}) {
  const R = 72, C = 2 * Math.PI * R, gap = 4;
  let offset = 0;
  const segments = rows.map((r, i) => {
    const len = r[1] / total * C;
    const seg = `<circle r="${R}" cx="0" cy="0" fill="none" stroke="${SERIES[i]}" stroke-width="17"
      stroke-dasharray="${Math.max(len - gap, 1).toFixed(2)} ${(C - Math.max(len - gap, 1)).toFixed(2)}"
      stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90)">
      <title>${r[0]} · ${fmt(r[1])}</title></circle>`;
    offset += len;
    return seg;
  }).join('');

  return `<div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
    <svg viewBox="-95 -95 190 190" style="width:${size}px;height:${size}px;flex:0 0 auto">
      <circle r="${R}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="17"/>
      ${segments}
      <text y="-4" text-anchor="middle" fill="var(--ink)" font-family="JetBrains Mono" font-size="21">${fmt(total)}</text>
      <text y="14" text-anchor="middle" fill="var(--ink-3)" font-family="Chakra Petch" font-size="12" letter-spacing="2">${sub}</text>
    </svg>
    <div class="legend" style="flex:1;min-width:180px;margin-top:0">
      ${rows.map((r, i) => `<div>
        <i style="background:${SERIES[i]}"></i>
        <span style="flex:1">${r[0]}</span>
        <b>${fmt(r[1])}</b>
        <span class="pct">${(r[1] / total * 100).toFixed(0)}%</span>
      </div>`).join('')}
    </div>
  </div>`;
}

/* ------------------------------------------------------------------
   Jauge instrument — arc gradué, plafonnée à 100 %
   ------------------------------------------------------------------ */
function gauge(pct, { size = 200, label = '' } = {}) {
  const R = 58, start = -215, end = 35, span = end - start;
  const pol = (a, r) => [Math.cos(a * Math.PI / 180) * r, Math.sin(a * Math.PI / 180) * r];
  const arc = (a0, a1, r, color, width) => {
    const [x0, y0] = pol(a0, r), [x1, y1] = pol(a1, r);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}"
      fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
  };
  const p = Math.max(0, Math.min(pct, 100));
  const ticks = [...Array(11)].map((_, k) => {
    const a = start + span * k / 10;
    const [x0, y0] = pol(a, R + 11), [x1, y1] = pol(a, R + (k % 5 === 0 ? 18 : 15));
    return `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}"
      stroke="${k % 5 === 0 ? 'var(--ink-3)' : 'var(--stroke-2)'}" stroke-width="${k % 5 === 0 ? 1.6 : 1}"/>`;
  }).join('');

  return `<svg viewBox="-92 -88 184 132" style="width:${size}px;height:${size * 132 / 184}px">
    ${ticks}
    ${arc(start, end, R, 'rgba(255,255,255,.09)', 13)}
    ${arc(start, start + span * p / 100, R, 'var(--line)', 13)}
    <text y="-2" text-anchor="middle" fill="var(--ink)" font-family="JetBrains Mono" font-size="30">${pct.toFixed(0)}<tspan font-size="15" fill="var(--ink-2)">%</tspan></text>
    <text y="20" text-anchor="middle" fill="var(--ink-3)" font-family="Chakra Petch" font-size="12" letter-spacing="2.4">${label}</text>
  </svg>`;
}

/* ------------------------------------------------------------------
   Barres verticales — base à zéro, jours non courus en creux
   rows : [libellé, valeur]
   ------------------------------------------------------------------ */
function vBars(rows, { height = 180 } = {}) {
  const max = Math.max(...rows.map(r => r[1])) || 1;
  return `<div class="vbars" style="height:${height}px">${rows.map(r => {
    const px = r[1] ? Math.max(r[1] / max * (height - 28), 4) : 3;
    return `<div>
      <span class="val ${r[1] ? '' : 'val--none'}">${r[1] ? fmt(r[1]) : '—'}</span>
      <div class="stem ${r[1] ? '' : 'stem--none'}" style="height:${px.toFixed(0)}px"
           title="${r[0]} · ${fmt(r[1])}"></div>
      <span class="day">${r[0]}</span>
    </div>`;
  }).join('')}</div>`;
}
