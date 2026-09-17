/* ======= SET YOUR BOT USERNAME HERE ======= */
var BOT_USERNAME = "scan_cv_bot";
/* =========================================== */

var pageLang = document.documentElement.lang || 'en';
var BOT_URL = "https://t.me/" + BOT_USERNAME + "?start=chashma_" + pageLang;

document.querySelectorAll('[data-bot]').forEach(function(a){ a.setAttribute('href', BOT_URL); });
document.getElementById('yr').textContent = new Date().getFullYear();

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* hero screenshot carousel */
(function(){
  var stack = document.querySelector('.ss-stack');
  if(!stack) return;
  var imgs = Array.prototype.slice.call(stack.querySelectorAll('.ss-img'));
  if(!imgs.length) return;
  var carousel = stack.closest('.ss-carousel');
  var prevBtn = carousel ? carousel.querySelector('.ss-prev') : null;
  var nextBtn = carousel ? carousel.querySelector('.ss-next') : null;
  var titleEl = carousel ? carousel.querySelector('.ss-title') : null;
  var descEl = carousel ? carousel.querySelector('.ss-desc') : null;
  var order = imgs.map(function(_, i){ return i; });
  var AUTOPLAY_MS = 4500;
  var timer = null;

  function layout(){
    order.forEach(function(imgIndex, pos){
      var img = imgs[imgIndex];
      img.style.setProperty('--ss-x', (pos * 10) + 'px');
      img.style.setProperty('--ss-scale', 1 - pos * 0.035);
      img.style.setProperty('--ss-z', imgs.length - pos);
      img.style.setProperty('--ss-op', 1);
      img.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
      img.classList.toggle('is-front', pos === 0);
    });
    var front = imgs[order[0]];
    if(titleEl) titleEl.textContent = front.getAttribute('data-title') || '';
    if(descEl) descEl.textContent = front.getAttribute('data-desc') || '';
  }
  layout();

  function next(){ order.push(order.shift()); layout(); }
  function prev(){ order.unshift(order.pop()); layout(); }

  function startAutoplay(){
    if(reduce || timer) return;
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function stopAutoplay(){
    clearInterval(timer);
    timer = null;
  }
  function restartAutoplay(){
    stopAutoplay();
    startAutoplay();
  }

  if(nextBtn) nextBtn.addEventListener('click', function(){ next(); restartAutoplay(); });
  if(prevBtn) prevBtn.addEventListener('click', function(){ prev(); restartAutoplay(); });

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ en.isIntersecting ? startAutoplay() : stopAutoplay(); });
    }, {threshold:.4});
    io.observe(carousel);
  } else {
    startAutoplay();
  }
})();

/* testimonials carousel */
(function(){
  var container = document.querySelector('.testimonials-carousel');
  if(!container) return;
  var slides = Array.prototype.slice.call(container.querySelectorAll('.t-slide'));
  if(slides.length < 2) return;
  var dotsWrap = container.querySelector('.t-dots');
  var dotLabel = dotsWrap ? (dotsWrap.getAttribute('data-label') || 'Testimonial') : 'Testimonial';
  var row = container.closest('.testimonials-row');
  var prevBtn = row ? row.querySelector('.t-prev') : null;
  var nextBtn = row ? row.querySelector('.t-next') : null;
  var current = 0;

  function show(index){
    current = (index + slides.length) % slides.length;
    slides.forEach(function(slide, i){ slide.classList.toggle('is-active', i === current); });
    if(dotsWrap){
      Array.prototype.forEach.call(dotsWrap.children, function(dot, i){
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    }
  }

  if(dotsWrap){
    slides.forEach(function(_, i){
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', dotLabel + ' ' + (i + 1));
      dot.addEventListener('click', function(){ show(i); });
      dotsWrap.appendChild(dot);
    });
  }
  if(prevBtn) prevBtn.addEventListener('click', function(){ show(current - 1); });
  if(nextBtn) nextBtn.addEventListener('click', function(){ show(current + 1); });
  show(0);
})();

/* scroll reveal */
(function(){
  var els=document.querySelectorAll('.reveal');
  if(reduce || !('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in');}); return; }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  },{threshold:.14, rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){ io.observe(e); });
})();

/* funnel bars: fill as it scrolls into view */
(function(){
  var bars=document.querySelectorAll('.fbars');
  if(!bars.length) return;
  if(reduce || !('IntersectionObserver' in window)){ bars.forEach(function(b){ b.classList.add('in'); }); return; }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  },{threshold:.4, rootMargin:'0px 0px -10% 0px'});
  bars.forEach(function(b){ io.observe(b); });
})();
