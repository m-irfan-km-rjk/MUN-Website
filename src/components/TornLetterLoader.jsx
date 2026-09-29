'use client';

import { useEffect, useRef, useState } from 'react';

// "The Torn Dispatch" intro. The backdrop and the envelope landing are CSS keyframes (globals.css)
// that start at first paint, before hydration. Once fonts and the page are ready, JS adds
// .is-tearing, which runs the tear, letter and reveal keyframes, then unmounts the overlay.
// Shown once per tab session: the inline script in app/layout.js adds html.tl-seen on repeat loads.
const SEEN_KEY = 'tkm-dispatch-seen'; // keep in sync with the script in app/layout.js
const TEAR_MS = 2500; // .is-tearing timeline length at --p: 1

// Envelope artwork space.
const W = 400;
const H = 260;
const TEAR_Y = 152;

// Seeded PRNG so the tear is identical on every load (and on server and client).
const mulberry32 = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Jagged tear from the right edge to the left: a slow drift plus small teeth and the odd spike.
const TEAR = (() => {
  const rand = mulberry32(1207);
  const pts = [];
  let drift = 0;
  for (let x = W; x > 0; x -= 4 + rand() * 7) {
    drift = Math.max(-6, Math.min(6, drift + (rand() - 0.5) * 3));
    const tooth = rand() < 0.22 ? (rand() - 0.5) * 8 : (rand() - 0.5) * 2.6;
    pts.push([x, TEAR_Y + drift + tooth]);
  }
  pts.push([0, TEAR_Y + drift]);
  return pts.map(([x, y]) => [+x.toFixed(1), +y.toFixed(1)]);
})();
const RIGHT_Y = TEAR[0][1];
const LEFT_Y = TEAR[TEAR.length - 1][1];
const TEAR_D = 'M' + TEAR.map((p) => p.join(' ')).join('L');
// The strip and the body share the exact same tear path, so the two pieces fit together.
const STRIP_CLIP = `M${W + 10} -10L${W + 10} ${RIGHT_Y}L${TEAR_D.slice(1)}L-10 ${LEFT_Y}L-10 -10Z`;
const BODY_CLIP = `M${W + 10} ${RIGHT_Y}L${TEAR_D.slice(1)}L-10 ${LEFT_Y}L-10 ${H + 10}L${W + 10} ${H + 10}Z`;

// Paper flecks shed from the tear point as it travels right to left.
const FLECKS = (() => {
  const rand = mulberry32(42);
  return Array.from({ length: 9 }, (_, i) => {
    const [x, y] = TEAR[Math.round(((i + 0.5) / 9) * (TEAR.length - 1))];
    return {
      left: `${(x / W) * 100}%`,
      top: `${(y / H) * 100}%`,
      '--d': (((W - x) / W) * 0.5).toFixed(2),
      '--dx': `${Math.round((rand() - 0.3) * 30)}px`,
      '--r': `${Math.round((rand() - 0.5) * 360)}deg`,
      width: rand() < 0.5 ? '6px' : '3px',
    };
  });
})();

// Wax seal: irregular edge and a five-point star medallion, like the hero badge.
const polygon = (points, radius) =>
  Array.from({ length: points }, (_, i) => {
    const t = (i / points) * Math.PI * 2 - Math.PI / 2;
    const r = radius(i, t);
    return `${i ? 'L' : 'M'}${(r * Math.cos(t)).toFixed(1)} ${(r * Math.sin(t)).toFixed(1)}`;
  }).join('') + 'Z';
const WAX = polygon(72, (_, t) => 55 + 2.4 * Math.sin(t * 7 + 0.4) + 1.6 * Math.sin(t * 11 + 1.3) + 1.1 * Math.sin(t * 17));
const STAR = polygon(10, (i) => (i % 2 ? 8.5 : 21));
const DOTS = Array.from({ length: 8 }, (_, i) => {
  const t = (i / 8) * Math.PI * 2 + Math.PI / 8;
  return [(30 * Math.cos(t)).toFixed(1), (30 * Math.sin(t)).toFixed(1)];
});
const SEAL = { x: 172, y: 92, size: 56 };

const Defs = () => (
  <svg className="tl-defs" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="tl-paper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fef8e2" />
        <stop offset="0.55" stopColor="#e9e5dc" />
        <stop offset="1" stopColor="#d3c4b0" />
      </linearGradient>
      <linearGradient id="tl-flap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e9e5dc" />
        <stop offset="1" stopColor="#dcd0bd" />
      </linearGradient>
      <radialGradient id="tl-edges" cx="0.5" cy="0.5" r="0.72">
        <stop offset="0.6" stopColor="#4a1c14" stopOpacity="0" />
        <stop offset="1" stopColor="#4a1c14" stopOpacity="0.3" />
      </radialGradient>
      <linearGradient id="tl-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffdf9a" />
        <stop offset="0.45" stopColor="#c9a44c" />
        <stop offset="1" stopColor="#6b5128" />
      </linearGradient>
      <radialGradient id="tl-disc" cx="0.4" cy="0.35" r="0.75">
        <stop offset="0" stopColor="#ffdf9a" />
        <stop offset="0.55" stopColor="#c9a44c" />
        <stop offset="1" stopColor="#8a6a32" />
      </radialGradient>
      {/* Paper grain: brown fractal noise with sparse alpha. */}
      <filter id="tl-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.29  0 0 0 0 0.11  0 0 0 0 0.08  0.9 0 0 0 -0.36" />
      </filter>
      {/* Roughens the torn-edge stroke so it reads as fibres, not a line. */}
      <filter id="tl-fuzz" x="-2%" y="-60%" width="104%" height="220%">
        <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="1" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
      </filter>
      <clipPath id="tl-clip-strip" clipPathUnits="userSpaceOnUse"><path d={STRIP_CLIP} /></clipPath>
      <clipPath id="tl-clip-body" clipPathUnits="userSpaceOnUse"><path d={BODY_CLIP} /></clipPath>

      <symbol id="tl-seal" viewBox="-60 -60 120 120">
        <path d={WAX} fill="url(#tl-gold)" />
        <circle r="41" fill="url(#tl-disc)" stroke="#6b5128" strokeWidth="1.5" />
        <circle r="42" fill="none" stroke="#ffdf9a" strokeOpacity="0.6" strokeWidth="0.8" />
        <circle r="36" fill="none" stroke="#6b5128" strokeWidth="0.8" strokeDasharray="1.5 3" />
        {DOTS.map(([x, y]) => <circle key={x + y} cx={x} cy={y} r="1.4" fill="#6b5128" />)}
        <path d={STAR} fill="#6b5128" opacity="0.55" transform="translate(1 1.6)" />
        <path d={STAR} fill="url(#tl-gold)" stroke="#ffdf9a" strokeWidth="0.6" />
      </symbol>

      <symbol id="tl-art" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="url(#tl-paper)" />
        <path d={`M0 ${H}L168 ${H - 112}M${W} ${H}L${W - 168} ${H - 112}`} stroke="#4a1c14" strokeOpacity="0.12" fill="none" />
        <path d={`M0 0L200 128L${W} 0`} fill="none" stroke="#4a1c14" strokeOpacity="0.08" strokeWidth="4" transform="translate(0 2)" />
        <path d={`M0 0L200 128L${W} 0Z`} fill="url(#tl-flap)" stroke="#4a1c14" strokeOpacity="0.22" />
        <rect width={W} height={H} fill="url(#tl-edges)" />
        <rect width={W} height={H} filter="url(#tl-grain)" />
        <text className="tl-hand" x="200" y="214" textAnchor="middle">TKM MUN · By Hand of the Secretariat</text>
        <use href="#tl-seal" x={SEAL.x} y={SEAL.y} width={SEAL.size} height={SEAL.size} />
      </symbol>
    </defs>
  </svg>
);

const Piece = ({ clip, edge }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
    <g clipPath={clip && `url(#${clip})`}><use href="#tl-art" /></g>
    {edge && <path className="tl-edge" d={TEAR_D} pathLength="1" />}
  </svg>
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function TornLetterLoader() {
  const [phase, setPhase] = useState('intro'); // intro → tearing | leaving → done
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (document.documentElement.classList.contains('tl-seen')) {
      setPhase('done');
      return;
    }
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {}

    const pace = parseFloat(getComputedStyle(root).getPropertyValue('--p')) || 1;
    const timers = [];
    let stage = 'intro';
    const removeListeners = () => {
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
    const finish = () => {
      stage = 'done';
      removeListeners();
      setPhase('done');
    };
    // Fade straight to the page (skip, or the end of the reduced-motion hold).
    const leave = (ms) => {
      if (stage === 'leaving' || stage === 'done') return;
      stage = 'leaving';
      timers.forEach(clearTimeout);
      setPhase('leaving');
      timers.push(setTimeout(finish, ms));
    };
    const skip = () => leave(300);
    const tear = () => {
      if (stage !== 'intro') return;
      stage = 'tearing';
      prepareReveal(root);
      setPhase('tearing');
      timers.push(setTimeout(finish, TEAR_MS * pace));
    };

    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timers.push(setTimeout(() => leave(400), 400));
    } else {
      // Hold on the landed envelope until fonts and the page are ready, capped at ~4s from navigation.
      const landAnim = root.querySelector('.tl-land')?.getAnimations?.()[0];
      const landed = landAnim ? landAnim.finished : wait(Math.max(0, 900 * pace - performance.now()));
      const loaded = document.readyState === 'complete'
        ? null
        : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
      const ready = Promise.all([landed, document.fonts?.ready, loaded].map((p) => Promise.resolve(p).catch(() => {})));
      Promise.race([ready, wait(Math.max(0, 4000 - performance.now()))]).then(tear);
    }

    return () => {
      stage = 'done';
      removeListeners();
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div id="tl-loader" ref={rootRef} className={`is-${phase}`} role="status" aria-label="Loading TKM MUN">
      <Defs />
      <div className="tl-vignette" aria-hidden="true" />
      <div className="tl-stage" aria-hidden="true">
        <div className="tl-land">
          <div className="tl-env">
            <div className="tl-fly">
              <div className="tl-rise">
                <div className="tl-letter">
                  <div className="tl-page">
                    <span className="tl-c tl-c-tl" />
                    <span className="tl-c tl-c-tr" />
                    <p className="tl-title">TKM MUN</p>
                    <p className="tl-sub">Collegium Diplomaticum</p>
                  </div>
                  <div className="tl-fold">
                    <span className="tl-c tl-c-bl" />
                    <span className="tl-c tl-c-br" />
                    <p className="tl-motto">Unire · Discere · Progredere</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tl-body"><Piece clip="tl-clip-body" edge /></div>
            <div className="tl-flecks">
              {FLECKS.map((style, i) => <span key={i} className="tl-fleck" style={style} />)}
            </div>
            <div className="tl-strip" style={{ transformOrigin: `0 ${(LEFT_Y / H) * 100}%` }}>
              <div className="tl-strip-lift" style={{ transformOrigin: `0 ${(LEFT_Y / H) * 100}%` }}>
                <Piece clip="tl-clip-strip" edge />
              </div>
            </div>

            {/* The untorn envelope, shown until the tear starts so no seam is visible. */}
            <div className="tl-whole">
              <Piece />
              <svg className="tl-nick" viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
                <path d={`M${W + 1} ${RIGHT_Y - 3}L${W - 7} ${RIGHT_Y + 0.5}L${W + 1} ${RIGHT_Y + 2.5}Z`} fill="#4b1c14" />
              </svg>
              <div
                className="tl-shimmer"
                style={{
                  left: `${((SEAL.x + SEAL.size * 0.14) / W) * 100}%`,
                  top: `${((SEAL.y + SEAL.size * 0.14) / H) * 100}%`,
                  width: `${((SEAL.size * 0.72) / W) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="tl-hero" aria-hidden="true" />
    </div>
  );
}

// Works out where the unfolded letter will sit so it can scale up to fill the viewport from its centre.
function prepareReveal(root) {
  const fly = root.querySelector('.tl-fly');
  const land = root.querySelector('.tl-land');
  if (!fly || !land) return;
  // Use layout boxes, not getBoundingClientRect, so an unfinished landing or tilt doesn't skew it.
  // .tl-land is centred in the viewport; .tl-fly is positioned inside it.
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = fly.offsetWidth;
  const h = fly.offsetHeight;
  const left = (vw - land.offsetWidth) / 2 + fly.offsetLeft;
  const top = (vh - land.offsetHeight) / 2 + fly.offsetTop;
  // After rising 80% and unfolding its lower third, the letter spans top - 0.8h to top + 0.7h.
  const cx = left + w / 2;
  const cy = top - 0.05 * h;
  const s = Math.max(vw / w, vh / (1.5 * h)) * 1.15;
  root.style.setProperty('--tl-ox', `${w / 2}px`);
  root.style.setProperty('--tl-oy', `${-0.05 * h}px`);
  root.style.setProperty('--tl-dx', `${vw / 2 - cx}px`);
  root.style.setProperty('--tl-dy', `${vh / 2 - cy}px`);
  root.style.setProperty('--tl-s', s.toFixed(2));
}
