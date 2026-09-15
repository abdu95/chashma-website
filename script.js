/* ======= SET YOUR BOT USERNAME HERE ======= */
var BOT_USERNAME = "scan_cv_bot";
/* =========================================== */

var pageLang = document.documentElement.lang || 'en';
var BOT_URL = "https://t.me/" + BOT_USERNAME + "?start=chashma_" + pageLang;

document.querySelectorAll('[data-bot]').forEach(function(a){ a.setAttribute('href', BOT_URL); });
document.getElementById('yr').textContent = new Date().getFullYear();

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* hero score count-up */
(function(){
  var target = 87, num = document.getElementById('scoreNum'),
      fill = document.getElementById('fill'), tag = document.getElementById('statusTag');
  var completeText = tag ? tag.getAttribute('data-complete-text') : '';
  function done(){ if(tag) tag.textContent = completeText; }
  if(reduce){ num.textContent = target; fill.style.width = target+'%'; done(); return; }
  setTimeout(function(){ fill.style.width = target+'%'; }, 250);
  var start=null, dur=1100;
  function step(t){
    if(!start) start=t;
    var p=Math.min((t-start)/dur,1);
    var e=1-Math.pow(1-p,3);
    num.textContent=Math.round(e*target);
    if(p<1){requestAnimationFrame(step);} else {done();}
  }
  setTimeout(function(){ requestAnimationFrame(step); }, 250);
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
