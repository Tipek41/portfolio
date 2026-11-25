(()=>{
const root=document.getElementById('lesson-shortcuts');if(!root)return;
const q=s=>root.querySelector(s);
let lang=document.documentElement.lang==='en'?'en':'tr',selected=0,phase=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,timer;
const lessons=[
{keys:['Ctrl','F1'],title:['Şeridi gizle, alan kazan','Collapse the ribbon, gain space'],description:['Komut şeridi gizlenir; File, Home gibi sekmeler görünür kalır.','The command ribbon collapses; tabs such as File and Home stay visible.'],tip:['Tekrar Ctrl + F1 ile şeridi geri getir.','Press Ctrl + F1 again to restore the ribbon.'],address:'B2',formula:'12345.6',rows:[['Item','Amount','Currency'],['Material','12345.6','USD'],['Service','2400','USD']]},
{keys:['Ctrl','Shift','1'],title:['Sayıları tek hamlede biçimlendir','Format numbers in one step'],description:['B2 seçilir; binlik ayraç ve iki ondalık basamak uygulanır.','Select B2; apply thousands separators and two decimal places.'],tip:['12345.6 → 12,345.60. Değer aynı; yalnızca görünüm değişti.','12345.6 → 12,345.60. Same value; only its appearance changes.'],address:'B2',formula:'12345.6',rows:[['Item','Amount','Currency'],['Material','12345.6','USD'],['Service','2400','USD']]},
];
const copy={tr:{steps:['Önce · Hücreyi seç','Kısayol · Tuşlara bas','Sonra · Sonucu incele'],pause:'Duraklat',play:'Oynat',replay:'Tekrar izle'},en:{steps:['Before · Select the cell','Shortcut · Press the keys','After · Inspect the result'],pause:'Pause',play:'Play',replay:'Replay'}};
const text=(selector,value)=>{const el=q(selector);if(el.textContent!==value)el.textContent=value};
function menu(){q('.ks-menu').replaceChildren(...lessons.map((lesson,i)=>{const b=document.createElement('button');b.type='button';b.className='ks-menu-item';b.setAttribute('aria-pressed',String(selected===i));const key=document.createElement('strong');key.textContent=lesson.keys.join(' + ');const label=document.createElement('span');label.textContent=lesson.title[lang==='tr'?0:1];b.append(key,label);b.onclick=()=>{selected=i;phase=0;menu();draw();schedule()};return b}));}
function draw(){
const lesson=lessons[selected],locale=lang==='tr'?0:1,after=phase===2,pressed=phase===1;
root.dataset.demo=String(selected);root.dataset.phase=String(phase);
text('#ks-title',lesson.title[locale]);text('#ks-description',lesson.description[locale]);text('#ks-address',lesson.address);text('#ks-format',selected===1&&after?'Number':'General');
text('#ks-formula-text',lesson.formula);text('#ks-excel-status','Ready');
text('.ks-phase',copy[lang].steps[phase]);text('.ks-takeaway',after?lesson.tip[locale]:lesson.description[locale]);text('#ks-pause',paused?copy[lang].play:copy[lang].pause);text('#ks-replay',copy[lang].replay);q('#ks-pause').setAttribute('aria-pressed',String(paused));
const keyContainer=q('.ks-keys');if(keyContainer.dataset.lesson!==String(selected)){keyContainer.dataset.lesson=String(selected);keyContainer.replaceChildren(...lesson.keys.map(key=>{const k=document.createElement('kbd');k.textContent=key;return k}));}
keyContainer.classList.toggle('is-pressed',pressed);
const rows=lesson.rows.map(row=>row.slice());
if(selected===1&&after)rows[1][1]='12,345.60';
const currentSignature=JSON.stringify([selected,rows,phase===0]);const body=q('#ks-rows');if(body.dataset.signature!==currentSignature){body.dataset.signature=currentSignature;body.replaceChildren(...rows.map((row,r)=>{const tr=document.createElement('tr');const num=document.createElement('th');num.textContent=r+1;tr.append(num);row.forEach((value,c)=>{const td=document.createElement('td');td.textContent=value;const isActive=(r+1===Number(lesson.address[1])&&c===lesson.address.charCodeAt(0)-65);if(isActive&&phase>0)td.className='ks-active';tr.append(td)});return tr}));}
}
function schedule(){clearTimeout(timer);if(paused||root.hidden||document.hidden)return;timer=setTimeout(()=>{phase=(phase+1)%3;draw();schedule()},phase===0?2400:phase===1?900:5600)}
q('#ks-pause').onclick=()=>{paused=!paused;draw();schedule()};
q('#ks-replay').onclick=()=>{phase=0;paused=false;draw();schedule()};
new MutationObserver(()=>schedule()).observe(root,{attributes:true,attributeFilter:['hidden']});
document.addEventListener('visibilitychange',schedule);
document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{lang=button.dataset.language;menu();draw()}));
menu();draw();schedule();
})();