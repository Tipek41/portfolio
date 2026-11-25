(()=>{
const root=document.getElementById('lesson-shortcuts');if(!root)return;
const q=s=>root.querySelector(s);
let lang=document.documentElement.lang==='en'?'en':'tr',selected=0,phase=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,timer;
const lessons=[
{keys:['Ctrl','F1'],title:['Şeridi gizle, alan kazan','Collapse the ribbon, gain space'],description:['Komut şeridi gizlenir; File, Home gibi sekmeler görünür kalır.','The command ribbon collapses; tabs such as File and Home stay visible.'],tip:['Tekrar Ctrl + F1 ile şeridi geri getir.','Press Ctrl + F1 again to restore the ribbon.'],address:'B2',formula:'12345.6',rows:[['Item','Amount','Currency'],['Material','12345.6','USD'],['Service','2400','USD']]},
{keys:['Ctrl','Shift','1'],title:['Sayıları tek hamlede biçimlendir','Format numbers in one step'],description:['B2 seçilir; binlik ayraç ve iki ondalık basamak uygulanır.','Select B2; apply thousands separators and two decimal places.'],tip:['12345.6 → 12,345.60. Değer aynı; yalnızca görünüm değişti.','12345.6 → 12,345.60. Same value; only its appearance changes.'],address:'B2',formula:'12345.6',rows:[['Item','Amount','Currency'],['Material','12345.6','USD'],['Service','2400','USD']]},
{keys:['Ctrl','`'],title:['Sayfadaki formülleri topluca gör','Show all worksheet formulas'],description:['Hücrelerin hesaplanan sonuçları yerine formülleri görünür.','Show formulas in cells instead of their calculated results.'],tip:['Ctrl + ` gösterimi değiştirir; formül kopyalamaz. Tekrar basınca sonuçlar geri gelir.','Ctrl + ` changes the display; it does not copy formulas. Press it again to restore results.'],address:'C2',formula:'=A2*B2',rows:[['Quantity','Rate','Total'],['12','150','1800'],['8','250','2000']]},
{keys:['Ctrl',"'"],title:['Üst hücrenin formülünü aynen al','Copy the exact formula from above'],description:['C2’de =A2*B2 var. Boş C3 seçilir; Ctrl + apostrof formülü düzenleme alanına getirir.','C2 contains =A2*B2. Select empty C3; Ctrl + apostrophe inserts that formula for editing.'],tip:['C3’e =A2*B2 aynen gelir. Ctrl + D gibi =A3*B3 olmaz. Düzenle veya Enter ile onayla.','C3 receives =A2*B2 unchanged, not =A3*B3 as with Ctrl + D. Edit it or press Enter to confirm.'],address:'C3',formula:'',rows:[['Quantity','Rate','Total'],['12','150','1800'],['8','250','']]},
{keys:['F2'],title:['Seçili hücreyi düzenle','Edit the active cell'],description:['C2 seçiliyken F2’ye basılır; imleç mevcut formülün sonuna gelir.','With C2 selected, press F2 to place the insertion point at the end of its formula.'],tip:['F2 mevcut hücreyi düzenler; üstteki hücreden hiçbir şey kopyalamaz.','F2 edits the current cell; it does not copy anything from above.'],address:'C2',formula:'=A2*B2',rows:[['Quantity','Rate','Total'],['12','150','1800'],['8','250','2000']]}
];
const copy={tr:{steps:['Önce · Hücreyi seç','Kısayol · Tuşlara bas','Sonra · Sonucu incele'],pause:'Duraklat',play:'Oynat',replay:'Tekrar izle'},en:{steps:['Before · Select the cell','Shortcut · Press the keys','After · Inspect the result'],pause:'Pause',play:'Play',replay:'Replay'}};
const text=(selector,value)=>{const el=q(selector);if(el.textContent!==value)el.textContent=value};
function menu(){q('.ks-menu').replaceChildren(...lessons.map((lesson,i)=>{const b=document.createElement('button');b.type='button';b.className='ks-menu-item';b.setAttribute('aria-pressed',String(selected===i));const key=document.createElement('strong');key.textContent=lesson.keys.join(' + ');const label=document.createElement('span');label.textContent=lesson.title[lang==='tr'?0:1];b.append(key,label);b.onclick=()=>{selected=i;phase=0;menu();draw();schedule()};return b}));}
function draw(){
const lesson=lessons[selected],locale=lang==='tr'?0:1,after=phase===2,pressed=phase===1;
root.dataset.demo=String(selected);root.dataset.phase=String(phase);
text('#ks-title',lesson.title[locale]);text('#ks-description',lesson.description[locale]);text('#ks-address',lesson.address);text('#ks-format',selected===1&&after?'Number':'General');
text('#ks-formula-text',selected===3&&after?'=A2*B2':lesson.formula);text('#ks-excel-status',(selected===3||selected===4)&&after?'Edit':'Ready');
text('.ks-phase',copy[lang].steps[phase]);text('.ks-takeaway',after?lesson.tip[locale]:lesson.description[locale]);text('#ks-pause',paused?copy[lang].play:copy[lang].pause);text('#ks-replay',copy[lang].replay);q('#ks-pause').setAttribute('aria-pressed',String(paused));
const keyContainer=q('.ks-keys');if(keyContainer.dataset.lesson!==String(selected)){keyContainer.dataset.lesson=String(selected);keyContainer.replaceChildren(...lesson.keys.map(key=>{const k=document.createElement('kbd');k.textContent=key;return k}));}
keyContainer.classList.toggle('is-pressed',pressed);
const rows=lesson.rows.map(row=>row.slice());
if(selected===1&&after)rows[1][1]='12,345.60';
if(selected===2&&after){rows[1][2]='=A2*B2';rows[2][2]='=A3*B3';}
if(selected===3&&after)rows[2][2]='=A2*B2';
if(selected===4&&after)rows[1][2]='=A2*B2';
const currentSignature=JSON.stringify([selected,rows,phase===0]);const body=q('#ks-rows');if(body.dataset.signature!==currentSignature){body.dataset.signature=currentSignature;body.replaceChildren(...rows.map((row,r)=>{const tr=document.createElement('tr');const num=document.createElement('th');num.textContent=r+1;tr.append(num);row.forEach((value,c)=>{const td=document.createElement('td');td.textContent=value;const isActive=(r+1===Number(lesson.address[1])&&c===lesson.address.charCodeAt(0)-65);if(isActive&&phase>0)td.className='ks-active';if((selected===3||selected===4)&&after&&isActive){td.classList.add('ks-edit');const caret=document.createElement('span');caret.className='ks-caret';caret.textContent='│';td.append(caret)}tr.append(td)});return tr}));}
}
function schedule(){clearTimeout(timer);if(paused||root.hidden||document.hidden)return;timer=setTimeout(()=>{phase=(phase+1)%3;draw();schedule()},phase===0?2400:phase===1?900:5600)}
q('#ks-pause').onclick=()=>{paused=!paused;draw();schedule()};
q('#ks-replay').onclick=()=>{phase=0;paused=false;draw();schedule()};
new MutationObserver(()=>schedule()).observe(root,{attributes:true,attributeFilter:['hidden']});
document.addEventListener('visibilitychange',schedule);
document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{lang=button.dataset.language;menu();draw()}));
menu();draw();schedule();
})();