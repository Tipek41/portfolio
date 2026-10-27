(()=>{
const root=document.getElementById('excel-notes');
const q=s=>root.querySelector(s),qa=s=>root.querySelectorAll(s);
const sample=[[5,"EX-001","Örnek Firma A","Kırtasiye",12450,"Bekliyor"],[6,"EX-002","Örnek Firma B","Ekipman",18750,"Ödendi"],[7,"EX-003","Örnek Firma A","Teknik destek",5120,"Ödendi"],[8,"EX-004","Örnek Firma C","Nakliye",8300,"Bekliyor"],[9,"EX-005","Örnek Firma B","Bakım",9700,"Bekliyor"],[10,"EX-006","Örnek Firma A","Sarf malzeme",6400,"Bekliyor"],[11,"EX-007","Örnek Firma C","Baskı",3250,"Ödendi"],[12,"EX-008","Örnek Firma B","Kurulum",11400,"Ödendi"]];
let language='tr',selectedRow=5,filteredCompany=null,selectedByUser=false,setupStep=0;
const copy={tr:{company:'Örnek Firma ',pending:'Bekliyor',paid:'Ödendi',records:'kayıt',selected:'Seçili firma',ready:'Bir firma hücresini seç, ardından AutoFilter’a bas.',match:'Eşleşen kayıt',all:'Tüm kayıtlar görünür.',guides:['New Tab ile sekme oluştur. Sekmeyi “Pratik Araçlar”, içindeki New Group’u “Filtreler” olarak yeniden adlandır.','Solda All Commands listesinden AutoFilter’ı seç. Sağdaki Filtreler (Custom) grubunu seçip Add >> düğmesine bas.','OK ile kaydet. Excel’e dönünce Pratik Araçlar sekmesindeki AutoFilter düğmesi kullanıma hazır.']},en:{company:'Sample Company ',pending:'Pending',paid:'Paid',records:'records',selected:'Selected company',ready:'Select a company cell, then click AutoFilter.',match:'Matching records',all:'All records are visible.',guides:['Create a tab with New Tab. Rename the tab “My Tools” and its New Group “Filters”.','Choose AutoFilter from All Commands. Select the Filters (Custom) group on the right, then click Add >>.','Click OK to save. Back in Excel, AutoFilter is ready on the My Tools tab.']}};
const descriptions={Kırtasiye:'Stationery',Ekipman:'Equipment','Teknik destek':'Technical support',Nakliye:'Transport',Bakım:'Maintenance','Sarf malzeme':'Consumables',Baskı:'Printing',Kurulum:'Setup'};
const companyName=name=>language==='tr'?name:name.replace('Örnek Firma ','Sample Company ');
const format=n=>n.toLocaleString(language==='tr'?'tr-TR':'en-US');
function draw(){
const selected=sample.find(r=>r[0]===selectedRow),shown=sample.filter(r=>filteredCompany===null||r[2]===filteredCompany),t=copy[language];
q('#af-rows').innerHTML=shown.map(r=>`<tr><td class="af-rownum">${r[0]}</td><td>${r[1]}</td><td class="${r[0]===selectedRow?'af-selected':''}"><button type="button" class="af-company-button" data-af-row="${r[0]}" aria-pressed="${r[0]===selectedRow}" aria-label="${language==='tr'?'Seç':'Select'} B${r[0]}: ${companyName(r[2])}">${companyName(r[2])}</button></td><td>${language==='tr'?r[3]:descriptions[r[3]]}</td><td class="af-right">${format(r[4])}</td><td>${r[5]==='Bekliyor'?t.pending:t.paid}</td></tr>`).join('');
q('#af-cell').textContent='B'+selectedRow;
q('#af-value').textContent=companyName(selected[2]);
q('#af-row-count').textContent=filteredCompany?`${shown.length} / ${sample.length} ${t.records}`:`${sample.length} ${t.records}`;
q('#af-result').innerHTML=filteredCompany?`<b>${shown.length} / ${sample.length}</b>${companyName(filteredCompany)}<br>${t.match}`:selectedByUser?`${t.selected}<b>${companyName(selected[2])}</b>`:t.ready;
q('#af-step-select').classList.toggle('is-active',!selectedByUser&&!filteredCompany);
q('#af-step-command').classList.toggle('is-active',selectedByUser&&!filteredCompany);
q('#af-step-result').classList.toggle('is-active',filteredCompany!==null);
}
q('#af-rows').addEventListener('click',event=>{const cell=event.target.closest('[data-af-row]');if(!cell)return;selectedRow=Number(cell.dataset.afRow);selectedByUser=true;draw()});
q('#af-apply').addEventListener('click',()=>{filteredCompany=sample.find(r=>r[0]===selectedRow)[2];selectedByUser=true;draw()});
q('#af-clear').addEventListener('click',()=>{filteredCompany=null;selectedByUser=false;draw()});
function drawSetup(){
qa('[data-setup-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.setupStep)===setupStep)));
q('#af-setup-destination').hidden=setupStep===0;
for(const id of ['#af-setup-source','#af-setup-add','#af-setup-tab','#af-setup-new','#af-setup-ok','#af-setup-destination'])q(id).classList.remove('af-setup-highlight');
(setupStep===0?['#af-setup-tab','#af-setup-new']:setupStep===1?['#af-setup-source','#af-setup-add','#af-setup-destination']:['#af-setup-ok']).forEach(id=>q(id).classList.add('af-setup-highlight'));
q('#af-setup-caption').textContent=copy[language].guides[setupStep];
}
qa('[data-setup-step]').forEach(b=>b.addEventListener('click',()=>{setupStep=Number(b.dataset.setupStep);drawSetup()}));
function setLesson(id,changeUrl=false){const isFilter=id==='autofilter';q('#lesson-autofilter').hidden=!isFilter;q('#excel-article').hidden=isFilter;qa('[data-lesson]').forEach(b=>{const on=b.dataset.lesson===id;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1});if(changeUrl)history.replaceState(null,'','#'+(isFilter?'autofilter':'formul-aktarma'));}
qa('[data-lesson]').forEach(b=>{b.addEventListener('click',()=>setLesson(b.dataset.lesson,true));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=Array.from(qa('[data-lesson]'));const next=e.key==='Home'?tabs[0]:e.key==='End'?tabs[tabs.length-1]:tabs.find(x=>x!==b);setLesson(next.dataset.lesson,true);next.focus()})});
qa('[data-language]').forEach(b=>b.addEventListener('click',()=>{language=b.dataset.language;document.documentElement.lang=language;q('.lesson-tabs').setAttribute('aria-label',language==='tr'?'Excel konuları':'Excel topics');q('.af-options').setAttribute('aria-label',language==='tr'?'Excel Options şematik kurulum rehberi':'Excel Options schematic setup guide');draw();drawSetup()}));
window.addEventListener('hashchange',()=>setLesson(['#formul-aktarma','#excel-article'].includes(location.hash)?'formul':'autofilter'));
draw();drawSetup();setLesson(['#formul-aktarma','#excel-article'].includes(location.hash)?'formul':'autofilter');
})();
