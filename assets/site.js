/* Shared language toggle and year. Load with defer so page scripts bind first.
   The chosen language is remembered in this browser only (no cookie, no tracking). */
(function(){
  var root=document.documentElement;
  root.classList.add('js');
  var KEY='site-lang', lang='tr';
  function read(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function save(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function localize(){
    root.lang=lang;
    document.querySelectorAll('[data-tr]').forEach(function(e){var t=e.getAttribute('data-'+lang);if(t!==null)e.textContent=t});
    ['aria-label','alt','title'].forEach(function(a){document.querySelectorAll('[data-'+a+'-tr]').forEach(function(e){e.setAttribute(a,e.getAttribute('data-'+a+'-'+lang))})});
    document.querySelectorAll('[data-lang]').forEach(function(b){var on=b.getAttribute('data-lang')===lang;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
  }
  function set(v,silent){
    if(v!=='tr'&&v!=='en')return;
    lang=v;save(v);localize();
    if(!silent)document.dispatchEvent(new CustomEvent('site:lang',{detail:{lang:v}}));
  }
  window.siteLang=function(){return lang};
  /* page transition: only the clicked colour plane morphs into the next page's band */
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a.vt-pdf,a.vt-veri,a.vt-gorsel,a.vt-kubart,a.vt-notes');if(a)a.classList.add('vt-on')});
  window.addEventListener('pageshow',function(){document.querySelectorAll('.vt-on').forEach(function(a){a.classList.remove('vt-on')})});
  document.querySelectorAll('[data-lang]').forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-lang'))})});
  document.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});
  var stored=read();
  if(stored==='en'){
    /* replay a click so page scripts that listen on the buttons switch too */
    var en=document.querySelector('[data-lang="en"]');
    if(en)en.click();else set('en');
  }else localize();
})();
