(function(){
 var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
 var reduz=matchMedia('(prefers-reduced-motion:reduce)').matches;
 var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};

 // revelação das seções (entra e sai da tela)
 function observa(sel,limiar){var el=$(sel);if(!el)return;
  if(!('IntersectionObserver' in window)||reduz){el.classList.add('is-visible');return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('is-visible',e.isIntersecting)})},{threshold:limiar});io.observe(el)}
 var mob=matchMedia('(max-width:700px)');
 observa('.about',mob.matches?.05:.2);
 observa('.contact',.2);
 observa('.depo',.2);

 // depoimentos: o carrossel só aparece quando houver depoimentos autorizados (OAB, Provimento 205/2021)
 var DEPOIMENTOS=[{t:'Excelente atendimento e ótimos profissionais',a:'Carlos M. · Avaliação no Google'},{t:'Excelente profissional. Recomendo a todos.',a:'Ricardo R. · Avaliação no Google'},{t:'Bom atendimento ótima qualidade e profissionalismo...',a:'Valdeci F. · Avaliação no Google'}];/* só avaliações reais e públicas, texto sem alteração */
 (function(){var box=$('#depoSlider');if(!box||!DEPOIMENTOS.length)return;box.hidden=false;var i=0,q=$('#depoQ'),by=$('#depoBy'),dots=$('#depoDots');
  dots.innerHTML=DEPOIMENTOS.map(function(){return'<i></i>'}).join('');
  function show(n){i=(n+DEPOIMENTOS.length)%DEPOIMENTOS.length;q.style.opacity=0;setTimeout(function(){q.textContent=DEPOIMENTOS[i].t;by.textContent=DEPOIMENTOS[i].a;q.style.opacity=1;$$('i',dots).forEach(function(d,k){d.className=k===i?'on':''})},reduz?0:200)}
  $('#depoPrev').addEventListener('click',function(){show(i-1)});$('#depoNext').addEventListener('click',function(){show(i+1)});show(0)})();
 // cartões empilhados em 3D, guiados pelo scroll (seção Áreas de atuação)
 var cards=$$('.ar-card'),tk=false;
 function fis(){return innerWidth<=767?{top:60,rot:55,ty:35,sc:.05}:innerWidth<=991?{top:80,rot:80,ty:60,sc:.08}:{top:100,rot:80,ty:60,sc:.08}}
 function efeito(){
  tk=false;var g=fis(),vh=innerHeight;
  cards.forEach(function(c){
   if(reduz){c.style.transform='none';c.style.opacity='1';return}
   var r=c.parentNode.getBoundingClientRect(),raw=clamp((vh-r.top)/(vh-g.top),0,1),e=1-Math.pow(1-raw,2.5);
   if(raw>=1){c.style.transform='translate3d(0,0,0) rotateX(0deg) scale(1)';c.style.opacity='1';return}
   c.style.transform='translate3d(0,'+((1-e)*g.ty).toFixed(1)+'px,0) rotateX('+((1-e)*g.rot).toFixed(2)+'deg) scale('+(1+(1-e)*g.sc).toFixed(4)+')';
   c.style.opacity=(.4+e*.6).toFixed(3);
  });
  var h=$('.hero');$('#bar').classList.toggle('on',scrollY>(h?h.offsetHeight*.7:400));
 }
 // rolagem suave (Lenis)
 var lenis=null;
 if(window.Lenis&&!reduz){lenis=new Lenis({duration:1.1,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},orientation:'vertical',gestureOrientation:'vertical',smoothWheel:true,syncTouch:true,touchMultiplier:1.2,infinite:false});
  (function raf(t){lenis.raf(t);requestAnimationFrame(raf)})(0);
  lenis.on('scroll',function(){req()});
  $$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length<2){e.preventDefault();lenis.scrollTo(0);return}var t=$(id);if(!t)return;e.preventDefault();lenis.scrollTo(t)})})}
 function req(){if(!tk){tk=true;requestAnimationFrame(efeito)}}
 addEventListener('scroll',req,{passive:true});addEventListener('resize',req);addEventListener('load',req);efeito();
})();

(function(){var t=document.getElementById('topbar');if(!t)return;function f(){t.classList.toggle('solid',scrollY>40)}addEventListener('scroll',f,{passive:true});f()})();

;(function(){var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var tabs=[].slice.call(document.querySelectorAll('.dv-tab')),fe=document.querySelector('.dv-feature'),fq=document.getElementById('dvQuote'),fa=document.getElementById('dvAuth'),tb=document.querySelector('.dv-tabs');if(!tabs.length)return;var cur=0,tm=null;
 function set(i){cur=i;fe.classList.add('swap');setTimeout(function(){fq.textContent=tabs[i].dataset.q;fa.textContent=tabs[i].dataset.a;fe.classList.remove('swap')},320);tabs.forEach(function(t,k){t.classList.remove('on');void t.offsetWidth;if(k===i)t.classList.add('on');t.setAttribute('aria-pressed',k===i)})}
 function auto(){clearTimeout(tm);if(reduce)return;tm=setTimeout(function(){set((cur+1)%tabs.length);auto()},7000)}
 tabs.forEach(function(t,i){t.addEventListener('click',function(){if(i!==cur)set(i);auto()})});
 [tb,fe].forEach(function(el){el.addEventListener('mouseenter',function(){clearTimeout(tm);tb.classList.add('paused')});el.addEventListener('mouseleave',function(){tb.classList.remove('paused');auto()})});auto();})();

;(function(){var m=document.getElementById('gvMetric'),done=false,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 if(m&&'IntersectionObserver' in window&&!rm){new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&!done){done=true;var t0=null,tg=+m.dataset.target||50;
  (function f(t){if(t0===null)t0=t;var p=Math.min((t-t0)/1600,1),e=p*(2-p),v=Math.floor(tg*e);m.textContent=(v/10).toFixed(1).replace('.',',');if(p<1)requestAnimationFrame(f);else m.textContent='5,0'})(performance.now())}})},{threshold:.3}).observe(m)}
})();
