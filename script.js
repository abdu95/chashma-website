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
  var nextBtn = carousel ? carousel.querySelector('.ss-next') : null;
  var dotsWrap = carousel ? carousel.querySelector('.ss-dots') : null;
  var order = imgs.map(function(_, i){ return i; });

  if(dotsWrap){
    imgs.forEach(function(){ dotsWrap.appendChild(document.createElement('span')); });
  }

  function layout(){
    order.forEach(function(imgIndex, pos){
      var img = imgs[imgIndex];
      img.style.setProperty('--ss-y', (pos * 10) + 'px');
      img.style.setProperty('--ss-scale', 1 - pos * 0.045);
      img.style.setProperty('--ss-rot', (pos === 0 ? 0 : (pos % 2 === 0 ? -1 : 1) * (2 + pos)) + 'deg');
      img.style.setProperty('--ss-z', imgs.length - pos);
      img.style.setProperty('--ss-op', 1);
      img.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
      img.classList.toggle('is-front', pos === 0);
    });
    if(dotsWrap){
      Array.prototype.forEach.call(dotsWrap.children, function(dot, i){
        dot.classList.toggle('is-active', i === order[0]);
      });
    }
  }
  layout();

  if(nextBtn){
    nextBtn.addEventListener('click', function(){
      order.push(order.shift());
      layout();
    });
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

  function show(index){
    slides.forEach(function(slide, i){ slide.classList.toggle('is-active', i === index); });
    if(dotsWrap){
      Array.prototype.forEach.call(dotsWrap.children, function(dot, i){
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
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
