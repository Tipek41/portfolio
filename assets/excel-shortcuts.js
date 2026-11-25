(()=>{
const root=document.getElementById('lesson-shortcuts');if(!root)return;
let lang=document.documentElement.lang==='en'?'en':'tr';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const words={tr:{pause:'Duraklat',play:'Oynat',before:['Şerit açık','General biçimi','Sonuçlar görünür'],after:['Şerit gizlendi','Number · 2 ondalık','Formüller görünür']},en:{pause:'Pause',play:'Play',before:['Ribbon expanded','General format','Results visible'],after:['Ribbon collapsed','Number · 2 decimals','Formulas visible']}};
const cards=Array.from(root.querySelectorAll('.ks-card')).map((el,index)=>({el,index,phase:0,paused:reduced,timer:null}));
function setText(element,value){if(element.textContent!==value)element.textContent=value;}
function draw(card){const after=card.phase===2,pressed=card.phase===1,t=words[lang];card.el.classList.toggle('ks-after',after);card.el.querySelector('.ks-key').classList.toggle('is-pressed',pressed);setText(card.el.querySelector('.ks-state'),(after?t.after:t.before)[card.index]);const button=card.el.querySelector('.ks-toggle');setText(button,card.paused?t.play:t.pause);button.setAttribute('aria-pressed',String(card.paused));if(card.index===1){setText(card.el.querySelector('.ks-number'),after?'12,345.60':'12345.6');const format=card.el.querySelector('.ks-format').firstChild;const label=after?'Number':'General';if(format.nodeValue!==label)format.nodeValue=label;}if(card.index===2){setText(card.el.querySelector('.ks-result'),after?'=A2*B2':'1800');setText(card.el.querySelector('.ks-result-2'),after?'=A3*B3':'2000');}}
function schedule(card){clearTimeout(card.timer);if(card.paused||root.hidden||document.hidden)return;card.timer=setTimeout(()=>{card.phase=(card.phase+1)%3;draw(card);schedule(card)},card.phase===1?550:card.phase===2?3000:2200);}
cards.forEach(card=>{draw(card);card.el.querySelector('.ks-toggle').addEventListener('click',()=>{card.paused=!card.paused;draw(card);schedule(card)});});
new MutationObserver(()=>cards.forEach(schedule)).observe(root,{attributes:true,attributeFilter:['hidden']});
document.addEventListener('visibilitychange',()=>cards.forEach(schedule));
document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{lang=button.dataset.language;cards.forEach(draw)}));
cards.forEach(schedule);
})();