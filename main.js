const WONDERS = [
  {
    name: 'Taj Mahal',
    location: 'Agra, India',
    bg: '#C9856A',
    panel: 'rgba(180,90,60,0.55)',
    ghost: 'TAJ MAHAL',
    src: 'https://th-thumbnailer.cdn-si-edu.com/CbddkFFO3OB80rRz83Iiuf-Z0FY=/1000x750/filters:no_upscale():focal(1471x1061:1472x1062)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/b6/30/b630b48b-7344-4661-9264-186b70531bdc/istock-478831658.jpg',
    desc: 'Built by Shah Jahan in memory of his wife Mumtaz Mahal. A breathtaking white marble mausoleum symbolizing eternal love, featuring intricate carvings, paradise gardens, and a reflective pool.'
  },
  {
    name: 'Great Wall',
    location: 'China',
    bg: '#5A7A5E',
    panel: 'rgba(50,100,55,0.55)',
    ghost: 'GREAT WALL',
    src: 'https://cdn.britannica.com/89/179589-138-3EE27C94/Overview-Great-Wall-of-China.jpg?w=800&h=450&c=crop',
    desc: 'Stretching over 13,000 miles across mountains and deserts, the Great Wall was built over centuries to protect against invasions. A remarkable feat of human engineering and willpower.'
  },
  {
    name: 'Petra',
    location: 'Jordan',
    bg: '#A06045',
    panel: 'rgba(160,80,40,0.55)',
    ghost: 'PETRA',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Treasury_petra_crop.jpeg',
    desc: 'The "Rose City" — an ancient city carved into red sandstone cliffs. Once a thriving trade center, Petra features magnificent tombs, temples, and the iconic Al-Khazneh Treasury.'
  },
  {
    name: 'Machu Picchu',
    location: 'Peru',
    bg: '#4A7A62',
    panel: 'rgba(40,100,65,0.55)',
    ghost: 'MACHU PICCHU',
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Machu_Picchu%2C_2023_%28012%29.jpg',
    desc: 'Perched high in the Andes, this mysterious Incan city was abandoned centuries ago. Stone-built temples and terraces showcase advanced engineering, surrounded by lush green peaks.'
  },
  {
    name: 'Christ the Redeemer',
    location: 'Rio de Janeiro',
    bg: '#3A6A8A',
    panel: 'rgba(30,80,120,0.55)',
    ghost: 'REDEEMER',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg',
    desc: 'Standing 98 feet tall atop Mount Corcovado. Made of reinforced concrete and soapstone, this iconic statue offers breathtaking panoramic views of Rio and the coastline.'
  },
  {
    name: 'Colosseum',
    location: 'Rome, Italy',
    bg: '#7A6A40',
    panel: 'rgba(120,95,40,0.55)',
    ghost: 'COLOSSEUM',
    src: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg',
    desc: 'Built in AD 80, this ancient amphitheater once hosted gladiator fights for 50,000 spectators. Despite centuries of wear, it remains the most powerful symbol of Roman civilization.'
  },
  {
    name: 'Chichén Itzá',
    location: 'Mexico',
    bg: '#6A5A8A',
    panel: 'rgba(90,65,130,0.55)',
    ghost: 'CHICHÉN ITZÁ',
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Chichen_Itza_3.jpg',
    desc: 'A sacred Mayan pyramid renowned for its precise astronomical alignment. During equinox, sunlight creates a serpent-like shadow on the steps — a testament to the Mayans\' advanced knowledge.'
  }
];

const N = WONDERS.length;
let activeIndex = 0;
let isAnimating = false;
let panelOpen = false;
let hintShown = false;

// DOM references
const root        = document.getElementById('root');
const carousel    = document.getElementById('carousel');
const ghostText   = document.getElementById('ghost-text');
const wonderName  = document.getElementById('wonder-name');
const wonderDesc  = document.getElementById('wonder-desc');
const infoPanel   = document.getElementById('info-panel');
const panelTitle  = document.getElementById('panel-title');
const panelDesc   = document.getElementById('panel-desc');
const closeBtn    = document.getElementById('close-btn');
const tapHint     = document.getElementById('tap-hint');
const dotsEl      = document.getElementById('dots');
const discoverLink = document.getElementById('discover-link');

// Preload all images
WONDERS.forEach(w => {
  const img = new Image();
  img.src = w.src;
});

// Compute which index fills which role
function getRoles(active) {
  return {
    center:    active,
    left:      (active + N - 1) % N,
    right:     (active + 1) % N,
    back:      (active + 2) % N
  };
}

// Return style object for each role
function getStyleForIndex(idx) {
  const roles = getRoles(activeIndex);
  const isMobile = window.innerWidth < 640;

  if (roles.center === idx) {
    return {
      transform: `translateX(-50%) scale(${isMobile ? 1.3 : 1.55})`,
      filter: 'blur(0px)',
      opacity: '1',
      zIndex: '20',
      left: '50%',
      height: isMobile ? '62%' : '80%',
      bottom: '0'
    };
  } else if (roles.left === idx) {
    return {
      transform: 'translateX(-50%) scale(0.9)',
      filter: 'blur(1.5px)',
      opacity: '0.78',
      zIndex: '10',
      left: isMobile ? '20%' : '28%',
      height: isMobile ? '26%' : '38%',
      bottom: isMobile ? '22%' : '10%'
    };
  } else if (roles.right === idx) {
    return {
      transform: 'translateX(-50%) scale(0.9)',
      filter: 'blur(1.5px)',
      opacity: '0.78',
      zIndex: '10',
      left: isMobile ? '80%' : '72%',
      height: isMobile ? '26%' : '38%',
      bottom: isMobile ? '22%' : '10%'
    };
  } else if (roles.back === idx) {
    return {
      transform: 'translateX(-50%) scale(0.7)',
      filter: 'blur(3px)',
      opacity: '0.5',
      zIndex: '5',
      left: '50%',
      height: isMobile ? '18%' : '24%',
      bottom: isMobile ? '26%' : '14%'
    };
  } else {
    return {
      transform: 'translateX(-50%) scale(0.6)',
      filter: 'blur(5px)',
      opacity: '0',
      zIndex: '1',
      left: '50%',
      height: '20%',
      bottom: '10%'
    };
  }
}

// Apply computed styles to a carousel item element
function applyStyle(el, idx) {
  const s = getStyleForIndex(idx);
  el.style.left      = s.left;
  el.style.bottom    = s.bottom;
  el.style.height    = s.height;
  el.style.transform = s.transform;
  el.style.filter    = s.filter;
  el.style.opacity   = s.opacity;
  el.style.zIndex    = s.zIndex;
}

// Refresh role class names (center/left/right/back)
function updateClassNames() {
  const roles = getRoles(activeIndex);
  Array.from(carousel.children).forEach((el, i) => {
    el.classList.remove('center', 'left', 'right', 'back');
    if      (roles.center === i) el.classList.add('center');
    else if (roles.left   === i) el.classList.add('left');
    else if (roles.right  === i) el.classList.add('right');
    else if (roles.back   === i) el.classList.add('back');
  });
}

// Build all carousel item elements
function buildCarousel() {
  carousel.innerHTML = '';
  WONDERS.forEach((w, i) => {
    const el = document.createElement('div');
    el.className = 'carousel-item';
    el.dataset.idx = i;

    const imgEl = document.createElement('img');
    imgEl.src = w.src;
    imgEl.alt = w.name;
    imgEl.draggable = false;

    const label = document.createElement('div');
    label.className = 'wonder-label';
    label.textContent = w.name;

    const pulse = document.createElement('div');
    pulse.className = 'pulse-ring';
    pulse.style.display = 'none';

    el.appendChild(imgEl);
    el.appendChild(label);
    el.appendChild(pulse);
    carousel.appendChild(el);

    el.addEventListener('click', () => handleItemClick(i));
    applyStyle(el, i);
  });
  updateClassNames();
  updatePulse();
}

// Show pulse ring only on center card
function updatePulse() {
  Array.from(carousel.children).forEach((el, i) => {
    const ring = el.querySelector('.pulse-ring');
    if (ring) ring.style.display = (i === activeIndex) ? 'block' : 'none';
  });
}

// Update all dynamic UI after index change
function updateUI() {
  const w = WONDERS[activeIndex];
  root.style.backgroundColor = w.bg;
  ghostText.textContent = w.ghost;
  wonderName.textContent = w.name.toUpperCase() + ' · ' + w.location;

  Array.from(carousel.children).forEach((el, i) => applyStyle(el, i));
  updateClassNames();
  updatePulse();

  Array.from(dotsEl.children).forEach((d, i) => {
    d.classList.toggle('active', i === activeIndex);
  });
}

// Navigate prev / next
function navigate(dir) {
  if (isAnimating) return;
  isAnimating = true;
  activeIndex = dir === 'next'
    ? (activeIndex + 1) % N
    : (activeIndex + N - 1) % N;
  if (panelOpen) closePanel();
  updateUI();
  setTimeout(() => { isAnimating = false; }, 700);
}

// Handle click on any carousel item
function handleItemClick(idx) {
  const roles = getRoles(activeIndex);
  if (roles.center === idx) {
    openPanel(idx);
  } else if (roles.right === idx) {
    navigate('next');
  } else if (roles.left === idx) {
    navigate('prev');
  } else {
    if (!isAnimating) {
      isAnimating = true;
      activeIndex = idx;
      if (panelOpen) closePanel();
      updateUI();
      setTimeout(() => { isAnimating = false; }, 700);
    }
  }
}

// Open info panel for a wonder
function openPanel(idx) {
  const w = WONDERS[idx];
  panelTitle.textContent = w.name;
  panelDesc.textContent  = w.desc;
  infoPanel.style.background = w.panel;
  infoPanel.classList.add('visible');
  panelOpen = true;
}

// Close info panel
function closePanel() {
  infoPanel.classList.remove('visible');
  panelOpen = false;
}

// Event listeners
closeBtn.addEventListener('click', closePanel);
document.getElementById('btn-prev').addEventListener('click', () => navigate('prev'));
document.getElementById('btn-next').addEventListener('click', () => navigate('next'));
discoverLink.addEventListener('click', () => openPanel(activeIndex));

// Build dot indicators
WONDERS.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', 'Go to ' + WONDERS[i].name);
  d.addEventListener('click', () => {
    if (!isAnimating && i !== activeIndex) {
      isAnimating = true;
      activeIndex = i;
      if (panelOpen) closePanel();
      updateUI();
      setTimeout(() => { isAnimating = false; }, 700);
    }
  });
  dotsEl.appendChild(d);
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') navigate('next');
  if (e.key === 'ArrowLeft')  navigate('prev');
  if (e.key === 'Escape' && panelOpen) closePanel();
});

// Touch / swipe support
let touchStartX = 0;
root.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
root.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) navigate(dx < 0 ? 'next' : 'prev');
}, { passive: true });

// Recalculate styles on resize
window.addEventListener('resize', () => {
  Array.from(carousel.children).forEach((el, i) => applyStyle(el, i));
});

// Init
buildCarousel();
updateUI();

// Show tap hint briefly
tapHint.classList.add('show');
setTimeout(() => { tapHint.classList.remove('show'); }, 3000);
