document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initIntroSparkles();
  initIntro();
  initNavigation();
  initFlipCards();
  initEnvelope();
  initCarousel();
  initLightbox();
  initWishes();
});

/* ===== PARTICLES ===== */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const colors = ['#fd79a8','#fab1a0','#ffeaa7','#55efc4','#a29bfe','#ff6b6b'];
  for (let i = 0; i < 50; i++) {
    particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: 2+Math.random()*3, dx: (Math.random()-.5)*.5, dy: (Math.random()-.5)*.5,
      color: colors[Math.floor(Math.random()*colors.length)], alpha: .2+Math.random()*.4 });
  }
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if(p.x<0||p.x>canvas.width) p.dx*=-1;
      if(p.y<0||p.y>canvas.height) p.dy*=-1;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ===== INTRO SPARKLES ===== */
function initIntroSparkles() {
  const c = document.getElementById('introSparkles');
  const cols = ['#f9ca24','#fd79a8','#fff','#ffeaa7','#fab1a0'];
  for (let i = 0; i < 25; i++) {
    const s = document.createElement('div'); s.classList.add('intro-sparkle');
    s.style.left = Math.random()*100+'%'; s.style.top = Math.random()*100+'%';
    s.style.width = s.style.height = (3+Math.random()*6)+'px';
    s.style.background = cols[Math.floor(Math.random()*cols.length)];
    s.style.animationDelay = Math.random()*3+'s'; s.style.animationDuration=(1.5+Math.random()*2)+'s';
    c.appendChild(s);
  }
}

/* ===== INTRO ===== */
function initIntro() {
  const btn = document.getElementById('introBtn');
  const box = document.getElementById('giftBox');
  const screen = document.getElementById('introScreen');
  const app = document.getElementById('app');
  function open() {
    box.classList.add('opened');
    setTimeout(() => { screen.classList.add('hidden'); }, 800);
    setTimeout(() => { screen.style.display='none'; app.classList.add('visible'); }, 1600);
  }
  btn.addEventListener('click', open);
  box.addEventListener('click', open);
}

/* ===== NAVIGATION ===== */
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const pages = document.querySelectorAll('.page');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.page;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      pages.forEach(p => { p.classList.remove('active'); });
      const pg = document.querySelector(`.page[data-page="${target}"]`);
      if (pg) { pg.classList.add('active'); pg.style.animation='none'; pg.offsetHeight; pg.style.animation=''; }
      // Trigger page-specific animations
      if (target === 'wishes') triggerWishesAnimations();
      if (target === 'memories') resetCarousel();
    });
  });
}

/* ===== FLIP CARDS ===== */
function initFlipCards() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

/* ===== ENVELOPE & LETTER ===== */
function initEnvelope() {
  const env = document.getElementById('envelope');
  const btn = document.getElementById('envelopeBtn');
  const paper = document.getElementById('letterPaper');
  const rest = document.getElementById('letterRest');
  let opened = false;
  function openEnvelope() {
    if (opened) return; opened = true;
    env.classList.add('opened');
    setTimeout(() => { paper.classList.add('visible'); startTypewriter(); }, 700);
  }
  btn.addEventListener('click', (e) => { e.stopPropagation(); openEnvelope(); });
  env.addEventListener('click', openEnvelope);

  function startTypewriter() {
    const text = "On this special day, we want you to know how deeply grateful we are for everything you've done for us. You are the heartbeat of our home, the warmth in our mornings, and the peace in our nights.";
    const el = document.getElementById('typewriterText');
    const cursor = document.getElementById('typewriterCursor');
    let i = 0;
    function type() {
      if (i < text.length) { el.textContent += text[i]; i++; setTimeout(type, 22); }
      else { cursor.style.display='none'; setTimeout(() => { rest.classList.add('visible'); }, 300); }
    }
    type();
  }
}

/* ===== 3D CAROUSEL ===== */
let carouselIndex = 0;
const totalCells = 5;
function initCarousel() {
  const ring = document.getElementById('carouselRing');
  const cells = document.querySelectorAll('.carousel-cell');
  const scene = document.getElementById('carouselScene');
  const theta = 360 / totalCells;
  const sceneW = scene.offsetWidth || 320;
  const radius = Math.round((sceneW/2) / Math.tan(Math.PI/totalCells));
  cells.forEach((cell, i) => {
    cell.style.transform = `rotateY(${theta*i}deg) translateZ(${radius}px)`;
  });
  ring.style.transform = `translateZ(-${radius}px) rotateY(0deg)`;
  updateCarousel();
  document.getElementById('carouselPrev').addEventListener('click', () => { carouselIndex--; updateCarousel(); });
  document.getElementById('carouselNext').addEventListener('click', () => { carouselIndex++; updateCarousel(); });
  document.querySelectorAll('.dot').forEach(d => {
    d.addEventListener('click', () => { carouselIndex = parseInt(d.dataset.idx); updateCarousel(); });
  });
}
function resetCarousel() {
  const ring = document.getElementById('carouselRing');
  const scene = document.getElementById('carouselScene');
  const sceneW = scene.offsetWidth || 320;
  const radius = Math.round((sceneW/2) / Math.tan(Math.PI/totalCells));
  const cells = document.querySelectorAll('.carousel-cell');
  const theta = 360 / totalCells;
  cells.forEach((cell, i) => {
    cell.style.transform = `rotateY(${theta*i}deg) translateZ(${radius}px)`;
  });
  updateCarousel();
}
function updateCarousel() {
  const ring = document.getElementById('carouselRing');
  const scene = document.getElementById('carouselScene');
  const sceneW = scene.offsetWidth || 320;
  const radius = Math.round((sceneW/2) / Math.tan(Math.PI/totalCells));
  const theta = 360 / totalCells;
  const angle = -theta * carouselIndex;
  ring.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
  const dots = document.querySelectorAll('.dot');
  const idx = ((carouselIndex % totalCells) + totalCells) % totalCells;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

/* ===== LIGHTBOX ===== */
function initLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  const cells = document.querySelectorAll('.carousel-cell');
  const photos = [], captions = [];
  cells.forEach(c => { photos.push(c.querySelector('img').src); captions.push(c.querySelector('.cell-caption').textContent); });
  let cur = 0;
  function open(i) { cur=i; img.src=photos[cur]; cap.textContent=captions[cur]; lb.classList.add('active'); }
  function close() { lb.classList.remove('active'); }
  function prev() { cur=(cur-1+photos.length)%photos.length; img.src=photos[cur]; cap.textContent=captions[cur]; }
  function next() { cur=(cur+1)%photos.length; img.src=photos[cur]; cap.textContent=captions[cur]; }
  cells.forEach((c,i) => c.addEventListener('click', () => open(i)));
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbBackdrop').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  document.getElementById('lbNext').addEventListener('click', (e) => { e.stopPropagation(); next(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key==='Escape') close(); if (e.key==='ArrowLeft') prev(); if (e.key==='ArrowRight') next();
  });
}

/* ===== WISHES ===== */
function initWishes() {
  const btn = document.getElementById('surpriseBtn');
  btn.addEventListener('click', launchConfetti);
}
function triggerWishesAnimations() {
  const fill = document.getElementById('meterFill');
  fill.classList.remove('animated');
  void fill.offsetWidth;
  setTimeout(() => fill.classList.add('animated'), 300);
  launchFireworks();
}
function launchFireworks() {
  const container = document.getElementById('wishesFireworks');
  container.innerHTML = '';
  const colors = ['#e84393','#fd79a8','#f9ca24','#ff6b6b','#55efc4','#74b9ff','#a29bfe'];
  for (let b = 0; b < 3; b++) {
    setTimeout(() => {
      const cx = 30+Math.random()*40, cy = 20+Math.random()*40;
      for (let i = 0; i < 20; i++) {
        const f = document.createElement('div'); f.classList.add('firework');
        f.style.left = cx+'%'; f.style.top = cy+'%';
        const angle = (Math.PI*2/20)*i, dist = 40+Math.random()*60;
        f.style.setProperty('--tx', Math.cos(angle)*dist+'px');
        f.style.setProperty('--ty', Math.sin(angle)*dist+'px');
        f.style.background = colors[Math.floor(Math.random()*colors.length)];
        f.style.animationDelay = Math.random()*.2+'s';
        container.appendChild(f);
        setTimeout(() => f.remove(), 1500);
      }
    }, b*400);
  }
}
function launchConfetti() {
  const colors = ['#e84393','#fd79a8','#f9ca24','#ff6b6b','#55efc4','#74b9ff','#a29bfe','#fab1a0','#ffeaa7'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div'); c.classList.add('confetti');
    c.style.left = Math.random()*100+'vw'; c.style.top = -10+'px';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.width = (6+Math.random()*10)+'px'; c.style.height = (6+Math.random()*10)+'px';
    c.style.borderRadius = Math.random()>.5?'50%':'2px';
    c.style.animationDuration = (2+Math.random()*2)+'s';
    c.style.animationDelay = Math.random()*.8+'s';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
  launchFireworks();
}
