gsap.registerPlugin(ScrollTrigger);

const hasLoader = !!document.getElementById('loader');
const hasHero = !!document.getElementById('hero');

/* ══════════════════════════════════
   LOADER SEQUENCE
══════════════════════════════════ */
if (hasLoader) {
  const loaderTL = gsap.timeline({
    onComplete: () => {
      document.getElementById('loader').style.pointerEvents = 'none';
      if (hasHero) startHero();
    }
  });

  loaderTL
    .from('#loaderIcon', { opacity: 0, scale: 0.4, duration: 0.7, ease: 'back.out(1.6)' })
    .to('#loaderLine', { width: 140, duration: 0.8, ease: 'power2.inOut' }, '-=0.1')
    .to('#loaderSub', { opacity: 1, y: 0, duration: 0.5 })
    .to({}, { duration: 0.6 })
    .to('#loaderLogo', { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' })
    .to('#loaderPanelTop', {
      scaleY: 0,
      duration: 1.0,
      ease: 'power4.inOut',
      transformOrigin: 'top'
    }, '-=0.1');
}

/* ══════════════════════════════════
   HERO ENTRANCE
══════════════════════════════════ */
function startHero() {
  const htl = gsap.timeline();

  htl.to('#heroBg', { scale: 1, duration: 2.2, ease: 'power3.out' })

  .to(['#hcTL','#hcTR','#hcBL','#hcBR'], {
    opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power2.out'
  }, 0.2)

  .to('#hrTop', { width: '55vw', opacity: 0.45, duration: 1.1, ease: 'power2.inOut' }, 0.3)
  .to('#hrBot', { width: '55vw', opacity: 0.45, duration: 1.1, ease: 'power2.inOut' }, 0.4)

  .to('.hero-eyebrow-inner', { y: 0, duration: 1.0, ease: 'power4.out' }, 0.5)

  .to('.hero-h1 .line-inner', { y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.15 }, 0.65)

  .to('.hero-sub', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 1.25)
  .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.5)

  .to('#heroBadge', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 1.65)
  .to('#scrollHint', { opacity: 1, duration: 0.6 }, 1.9);
}

/* HERO PARALLAX */
if (hasHero) {
  gsap.to('#heroBg', {
    yPercent: 20, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });
}

/* SERVICE PAGE HERO REVEAL (if on service page) */
if (!hasHero && document.querySelector('.srv-page-hero')) {
  gsap.from('.srv-hero-crumb', { opacity: 0, y: 16, duration: 0.8, delay: 0.2, ease: 'power2.out' });
  gsap.from('.srv-hero-h1', { opacity: 0, y: 32, duration: 1.1, delay: 0.35, ease: 'power3.out' });
  gsap.from('.srv-hero-sub', { opacity: 0, y: 20, duration: 0.9, delay: 0.6, ease: 'power2.out' });
  gsap.from('.srv-hero-rule', { width: 0, duration: 0.9, delay: 0.8, ease: 'power2.inOut' });
}

/* ══════════════════════════════════
   SCROLL REVEALS
══════════════════════════════════ */
gsap.utils.toArray('.fade-up').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
    delay: (i % 3) * 0.07,
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

/* GALLERY GRID — clip-path wipe */
gsap.utils.toArray('.g-item').forEach((item, i) => {
  gsap.fromTo(item,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut',
      scrollTrigger: { trigger: item, start: 'top 90%' },
      delay: i * 0.09
    }
  );
});

/* PHOTO STRIP — slide in from right */
gsap.utils.toArray('.pg-thumb').forEach((th, i) => {
  gsap.fromTo(th,
    { opacity: 0, x: 70 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#projects', start: 'top 78%' },
      delay: i * 0.07
    }
  );
});

/* SERVICE CARDS (preview) */
gsap.utils.toArray('.sp-card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 92%' },
      delay: (i % 3) * 0.12
    }
  );
});

/* SERVICE GALLERY ITEMS */
gsap.utils.toArray('.sg-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 92%' },
      delay: (i % 3) * 0.1
    }
  );
});

/* ABOUT STATS — count up */
gsap.utils.toArray('.stat-n').forEach(el => {
  const full = el.textContent;
  const num = parseInt(full);
  const suffix = full.replace(/\d+/, '');
  gsap.fromTo({ v: 0 }, { v: num,
    duration: 1.8, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    onUpdate: function () {
      el.innerHTML = Math.round(this.targets()[0].v) + suffix;
    }
  }, { from: 0 });
});

/* ══════════════════════════════════
   NAV SCROLL
══════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ══════════════════════════════════
   MOBILE MENU
══════════════════════════════════ */
function toggleMobile() { document.getElementById('mobileOverlay').classList.toggle('open'); }
function closeMobile() {
  document.getElementById('mobileOverlay').classList.remove('open');
  const drop = document.getElementById('mDropdown');
  if (drop) drop.classList.remove('open');
}
function toggleMDrop(btn) {
  const parent = btn.parentElement;
  parent.classList.toggle('open');
}

/* ══════════════════════════════════
   PHOTO STRIP — DRAG SCROLL (only if exists)
══════════════════════════════════ */
const wrap = document.getElementById('pgStripWrap');
if (wrap) {
  let isDown = false, startX = 0, scrollLeft = 0;

  wrap.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
    wrap.style.userSelect = 'none';
  });
  wrap.addEventListener('mouseleave', () => { isDown = false; });
  wrap.addEventListener('mouseup', () => { isDown = false; wrap.style.userSelect = ''; });
  wrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    wrap.scrollLeft = scrollLeft - (x - startX) * 1.4;
    updateCounter();
  });

  wrap.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    scrollLeft = wrap.scrollLeft;
  }, { passive: true });
  wrap.addEventListener('touchmove', e => {
    wrap.scrollLeft = scrollLeft - (e.touches[0].pageX - startX) * 1.2;
    updateCounter();
  }, { passive: true });

  wrap.style.overflowX = 'auto';
  wrap.style.scrollBehavior = 'smooth';
  wrap.style.msOverflowStyle = 'none';
  wrap.style.scrollbarWidth = 'none';
}

function pgScroll(dir) {
  if (!wrap) return;
  wrap.scrollLeft += dir * 420;
  setTimeout(updateCounter, 400);
}

function updateCounter() {
  if (!wrap) return;
  const thumbs = wrap.querySelectorAll('.pg-thumb');
  if (!thumbs.length) return;
  const thumbWidth = thumbs[0].offsetWidth + 16;
  const idx = Math.min(Math.round(wrap.scrollLeft / thumbWidth), thumbs.length - 1);
  const cur = document.getElementById('pgCurrent');
  if (cur) cur.textContent = String(idx + 1).padStart(2, '0');
}

/* Set total */
window.addEventListener('DOMContentLoaded', () => {
  const total = document.querySelectorAll('.pg-thumb').length;
  const el = document.getElementById('pgTotal');
  if (el) el.textContent = String(total).padStart(2, '0');
});

/* ══════════════════════════════════
   LIGHTBOX — works on .pg-thumb AND .sg-item
══════════════════════════════════ */
let lbImages = [];
let lbCurrent = 0;

function buildLightbox() {
  lbImages = [];
  const triggers = document.querySelectorAll('.pg-thumb, .sg-item');
  triggers.forEach((th, i) => {
    th.dataset.lbIdx = i;
    lbImages.push({ src: th.dataset.src, caption: th.dataset.caption || '' });
    th.addEventListener('click', () => openLightbox(i));
  });
}
buildLightbox();

function openLightbox(idx) {
  const lb = document.getElementById('lightbox');
  if (!lb || !lbImages[idx]) return;
  lbCurrent = idx;
  const img = document.getElementById('lbImg');
  img.src = lbImages[idx].src;
  img.style.opacity = '1';
  img.style.transform = 'scale(1) translateX(0)';
  const info = document.getElementById('lbInfo');
  if (info) info.textContent = (lbImages[idx].caption || '') + ' (' + (idx + 1) + '/' + lbImages.length + ')';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e.target === document.getElementById('lightbox')) {
    closeLightboxBtn();
  }
}
function closeLightboxBtn() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNav(dir) {
  if (!lbImages.length) return;
  lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
  const img = document.getElementById('lbImg');
  img.style.opacity = '0';
  img.style.transform = 'scale(0.94) translateX(' + (dir * 30) + 'px)';
  setTimeout(() => {
    img.src = lbImages[lbCurrent].src;
    const info = document.getElementById('lbInfo');
    if (info) info.textContent = (lbImages[lbCurrent].caption || '') + ' (' + (lbCurrent + 1) + '/' + lbImages.length + ')';
    img.style.opacity = '1';
    img.style.transform = 'scale(1) translateX(0)';
  }, 220);
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'Escape') closeLightboxBtn();
});

/* Swipe support for lightbox on mobile */
(function(){
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  let touchStartX = 0;
  let touchEndX = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) { lbNav(diff > 0 ? -1 : 1); }
  }, { passive: true });
})();

/* ══════════════════════════════════
   SMOOTH ANCHOR SCROLL (only same-page)
══════════════════════════════════ */
document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    const hashIdx = href.indexOf('#');
    if (hashIdx < 0) return;
    const pagePart = href.slice(0, hashIdx);
    const hashPart = href.slice(hashIdx);
    const onSamePage = pagePart === '' || pagePart === window.location.pathname.split('/').pop() || pagePart === 'index.html' && (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html'));
    if (!onSamePage) return;
    const target = document.querySelector(hashPart);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
