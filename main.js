const W = [
  {
    name: 'Taj Mahal',
    loc: 'Agra, India',
    bg: '#B8705A',
    ghost: 'TAJ MAHAL',
    panel: 'rgba(160,75,50,.6)',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg',
    desc: 'Built by Shah Jahan for his beloved wife Mumtaz Mahal. This white marble mausoleum in Agra is an eternal symbol of love, with intricate carvings, paradise gardens, and a reflecting pool.'
  },
  {
    name: 'Great Wall',
    loc: 'China',
    bg: '#4E7050',
    ghost: 'GREAT WALL',
    panel: 'rgba(40,85,45,.6)',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1280px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
    desc: 'Stretching 13,000+ miles across mountains and deserts, built over centuries to defend against invasions. One of the greatest feats of human engineering ever attempted.'
  },
  {
    name: 'Petra',
    loc: 'Jordan',
    bg: '#9A5838',
    ghost: 'PETRA',
    panel: 'rgba(150,70,40,.6)',
    src: 'petra.jpg',
    desc: 'The "Rose City" carved into red sandstone cliffs. Once a thriving Nabataean trade hub, Petra features the iconic Al-Khazneh Treasury, grand tombs and ancient temples.'
  },
  {
    name: 'Machu Picchu',
    loc: 'Peru',
    bg: '#3D7055',
    ghost: 'MACHU PICCHU',
    panel: 'rgba(35,90,55,.6)',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/1280px-Machu_Picchu%2C_Peru.jpg',
    desc: 'A mysterious Inca citadel perched high in the Andes, abandoned centuries ago. Its stone temples, terraces and plazas showcase engineering mastery amid breathtaking mountain scenery.'
  },
  {
    name: 'Christ the Redeemer',
    loc: 'Rio de Janeiro',
    bg: '#2E5F82',
    ghost: 'REDEEMER',
    panel: 'rgba(25,70,115,.6)',
    src: 'Christ_the_redeemer.jpg',
    desc: 'Standing 98 feet tall atop Corcovado Mountain, this Art Deco masterpiece of reinforced concrete and soapstone overlooks Rio de Janeiro with open arms — a global icon of peace.'
  },
  {
    name: 'Colosseum',
    loc: 'Rome, Italy',
    bg: '#6E5E32',
    ghost: 'COLOSSEUM',
    panel: 'rgba(110,85,30,.6)',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg',
    desc: 'Completed in AD 80, this grand amphitheater seated 50,000 spectators for gladiatorial combat and public spectacles. It remains the most iconic symbol of the Roman Empire.'
  },
  {
    name: 'Chichén Itzá',
    loc: 'Mexico',
    bg: '#5A4880',
    ghost: 'CHICHÉN ITZÁ',
    panel: 'rgba(80,55,125,.6)',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/1280px-Chichen_Itza_3.jpg',
    desc: 'A sacred Mayan pyramid with perfect astronomical precision. At each equinox, sunlight creates a serpent shadow down the steps — a testament to the Mayans\' extraordinary knowledge of the cosmos.'
  }
];

const N = W.length;
let idx = 0, anim = false, open = false;

const root   = document.getElementById('sw');
const car    = document.getElementById('carousel');
const ghost  = document.getElementById('ghost');
const wnEl   = document.getElementById('wn');
const panel  = document.getElementById('panel');
const ptitle = document.getElementById('ptitle');
const pdesc  = document.getElementById('pdesc');
const dotsEl = document.getElementById('dots');
const hint   = document.getElementById('hint');

/* Compute which index fills each role */
function roles(a) {
  return { c: a, l: (a + N - 1) % N, r: (a + 1) % N, b: (a + 2) % N };
}

/* Return CSS style object for a given card index */
function styleFor(i) {
  const r = roles(idx);
  const mob = window.innerWidth < 600;

  // Card sizes
  const CENTER_W = mob ? 230 : 340;
  const CENTER_H = mob ? 345 : 510;

  const SIDE_W = mob ? 130 : 200;
  const SIDE_H = mob ? 195 : 300;

  const BACK_W = mob ? 90 : 140;
  const BACK_H = mob ? 135 : 210;

  if (r.c === i) {
    return {
      left: "50%",
      bottom: mob ? "6%" : "2%",
      width: CENTER_W + "px",
      height: CENTER_H + "px",
      transform: "translateX(-50%) scale(1)",
      opacity: "1",
      filter: "none",
      zIndex: "20"
    };
  }

  if (r.l === i) {
    return {
      left: mob ? "20%" : "24%",
      bottom: mob ? "18%" : "12%",
      width: SIDE_W + "px",
      height: SIDE_H + "px",
      transform: "translateX(-50%) scale(.95)",
      opacity: ".8",
      filter: "blur(1px)",
      zIndex: "10"
    };
  }

  if (r.r === i) {
    return {
      left: mob ? "80%" : "76%",
      bottom: mob ? "18%" : "12%",
      width: SIDE_W + "px",
      height: SIDE_H + "px",
      transform: "translateX(-50%) scale(.95)",
      opacity: ".8",
      filter: "blur(1px)",
      zIndex: "10"
    };
  }

  if (r.b === i) {
    return {
      left: "50%",
      bottom: mob ? "26%" : "18%",
      width: BACK_W + "px",
      height: BACK_H + "px",
      transform: "translateX(-50%) scale(.8)",
      opacity: ".45",
      filter: "blur(3px)",
      zIndex: "5"
    };
  }

  return {
    left: "50%",
    bottom: "18%",
    width: BACK_W + "px",
    height: BACK_H + "px",
    transform: "translateX(-50%) scale(.6)",
    opacity: "0",
    filter: "blur(5px)",
    zIndex: "1"
  };
}

function applyStyle(el, i) {
  Object.assign(el.style, styleFor(i));
}

/* Lazy-load a single image */
function lazyLoad(img, src) {
  const t = new Image();
  t.onload = () => { img.src = src; img.classList.add('loaded'); };
  t.src = src;
}

/* Build all carousel card elements */
function build() {
  car.innerHTML = '';
  W.forEach((w, i) => {
    const el  = document.createElement('div');
    el.className = 'ci';

    const img = document.createElement('img');
    img.className = 'lazy';
    img.alt = w.name;
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"%3E%3C/svg%3E';

    const lbl = document.createElement('div');
    lbl.className = 'lbl';
    lbl.textContent = w.name;

    el.appendChild(img);
    el.appendChild(lbl);
    car.appendChild(el);
    el.addEventListener('click', () => handleClick(i));
    applyStyle(el, i);

    /* Load visible cards immediately; others stagger in background */
    const r = roles(idx);
    if (i === r.c || i === r.l || i === r.r) {
      lazyLoad(img, w.src);
    } else {
      setTimeout(() => lazyLoad(img, w.src), (i + 1) * 400);
    }
  });
  updateClasses();
}

/* Sync role class names */
function updateClasses() {
  const r = roles(idx);
  Array.from(car.children).forEach((el, i) => {
    el.classList.remove('center', 'left', 'right', 'back');
    if      (r.c === i) el.classList.add('center');
    else if (r.l === i) el.classList.add('left');
    else if (r.r === i) el.classList.add('right');
    else if (r.b === i) el.classList.add('back');
  });
}

/* Refresh everything after index change */
function updateUI() {
  const w = W[idx];
  root.style.backgroundColor = w.bg;
  ghost.textContent = w.ghost;
  wnEl.textContent  = w.name.toUpperCase() + ' · ' + w.loc;
  Array.from(car.children).forEach((el, i) => applyStyle(el, i));
  updateClasses();
  Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle('on', i === idx));
}

/* Navigate prev / next */
function go(dir) {
  if (anim) return;
  anim = true;
  idx  = dir === 'n' ? (idx + 1) % N : (idx + N - 1) % N;
  if (open) closePanel();
  updateUI();
  setTimeout(() => { anim = false; }, 520);
}

/* Handle click on any card */
function handleClick(i) {
  const r = roles(idx);
  if      (r.c === i)   { openPanel(i); }
  else if (r.r === i)   { go('n'); }
  else if (r.l === i)   { go('p'); }
  else if (!anim) {
    anim = true;
    idx  = i;
    if (open) closePanel();
    updateUI();
    setTimeout(() => { anim = false; }, 520);
  }
}

/* Open info panel */
function openPanel(i) {
  const w = W[i];
  ptitle.textContent    = w.name;
  pdesc.textContent     = w.desc;
  panel.style.background = w.panel;
  panel.classList.add('on');
  open = true;
}

/* Close info panel */
function closePanel() {
  panel.classList.remove('on');
  open = false;
}

/* Event listeners */
document.getElementById('xbtn').addEventListener('click', closePanel);
document.getElementById('bp').addEventListener('click', () => go('p'));
document.getElementById('bn').addEventListener('click', () => go('n'));
document.getElementById('disc').addEventListener('click', () => openPanel(idx));

/* Build dot indicators */
W.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' on' : '');
  d.setAttribute('aria-label', 'Go to ' + W[i].name);
  d.addEventListener('click', () => {
    if (!anim && i !== idx) {
      anim = true;
      idx  = i;
      if (open) closePanel();
      updateUI();
      setTimeout(() => { anim = false; }, 520);
    }
  });
  dotsEl.appendChild(d);
});

/* Keyboard navigation */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight')          go('n');
  if (e.key === 'ArrowLeft')           go('p');
  if (e.key === 'Escape' && open)      closePanel();
});

/* Touch / swipe support */
let tx = 0;
root.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
root.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 45) go(dx < 0 ? 'n' : 'p');
}, { passive: true });

/* Recalculate on resize */
window.addEventListener('resize', () => {
  Array.from(car.children).forEach((el, i) => applyStyle(el, i));
});

/* Init */
build();
updateUI();
hint.classList.add('on');
setTimeout(() => hint.classList.remove('on'), 2800);
