'use strict';
const $=id=>document.getElementById(id), C=DataCore;
const state={sheets:[],source:[],headers:[],types:[],data:[],result:null,file:null,raw:false,filename:'veri',busy:false,token:0};
const types={text:'Metin / Kod',number:'Sayı / Miktar',amount:'Tutar',price:'Birim fiyat',percent:'Yüzde',date:'Tarih'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const status=(text,error=false)=>{$('status').textContent=text;$('status').classList.toggle('error',error);};
const options=()=>({locale:$('sourceLocale').value,trim:$('trim').checked,removeEmpty:$('removeEmpty').checked,dedupe:$('dedupe').checked,startRow:Number($('headerRow').value)+1});
const digits=()=>Number($('digits').value), locale=()=>$('outputLocale').value;
function enableExport(){const off=state.busy||!state.result||!state.result.rows.length||state.result.issues.length>0;$('xlsx').disabled=off;$('csv').disabled=off;$('toggleRaw').disabled=!state.result;}
function reset(){state.token++;Object.assign(state,{sheets:[],source:[],headers:[],types:[],data:[],result:null,file:null,raw:false,filename:'veri',busy:false});$('file').value='';$('headerRow').value=1;$('sheet').innerHTML='<option>Dosya bekleniyor</option>';$('sheet').disabled=true;$('columns').innerHTML='<div class="empty">Dosyanızdaki sütunlar burada görünecek.</div>';$('table').innerHTML='<div class="empty">Dosya yükleyin veya örnek ERP verisiyle deneyin.</div>';for(const id of ['rowCount','colCount','issueCount'])$(id).textContent='—';$('issuesSection').hidden=true;enableExport();status('Dosya yükleyin veya örnek ERP verisiyle deneyin.');}
function readSheet(ws){
 if(!ws['!ref'])return [];
 const range=XLSX.utils.decode_range(ws['!ref']);
 if(range.e.r>200000||range.e.c>499||(range.e.r+1)*(range.e.c+1)>3000000)throw Error('Sayfa çok büyük. En fazla 200.000 satır, 500 sütun ve 3 milyon hücre içeren rapor yükleyin.');
 // Read displayed codes (e.g. 000123) as text; keep raw numeric/date values.
 const rows=[];for(let r=0;r<=range.e.r;r++){const row=[];for(let c=0;c<=range.e.c;c++){const cell=ws[XLSX.utils.encode_cell({r,c})];let v=cell?.v??'';if(cell?.f&&cell.v==null)v='[Formül sonucu bulunamadı]';else if(cell?.t==='e')v=cell.w||'#EXCEL_ERROR';else if(cell?.t==='n'&&cell.w&&/^0\d+$/.test(cell.w))v=cell.w;row.push(v);}rows.push(row);}return rows;
}
function decode(buffer){const enc=$('encoding').value,bytes=new Uint8Array(buffer);if(enc!=='auto')return new TextDecoder(enc).decode(buffer);if(bytes[0]===255&&bytes[1]===254)return new TextDecoder('utf-16le').decode(buffer);if(bytes[0]===254&&bytes[1]===255)return new TextDecoder('utf-16be').decode(buffer);try{return new TextDecoder('utf-8',{fatal:true}).decode(buffer);}catch{return new TextDecoder('windows-1254').decode(buffer);}}
async function load(file){
 const token=++state.token;state.file=file;state.result=null;state.busy=true;enableExport();$('table').innerHTML='<div class="empty">Dosya okunuyor…</div>';$('columns').innerHTML='';$('issuesSection').hidden=true;for(const id of ['rowCount','colCount','issueCount'])$(id).textContent='—';status(file.name+' okunuyor…');
 try{
 if(file.size>30*1024*1024)throw Error('Dosya sınırı 30 MB. Raporu daha küçük parçalara ayırın.');
 const ext=file.name.split('.').pop().toLowerCase();if(!['xlsx','xls','csv','tsv','txt','dat','json'].includes(ext))throw Error('Bu dosya türü desteklenmiyor. XLSX, XLS, CSV, TSV, TXT, DAT veya JSON seçin.');
 const buffer=await file.arrayBuffer();if(token!==state.token)return;let sheets;
 if(['xlsx','xls'].includes(ext)){
 if(typeof XLSX==='undefined')throw Error('Excel okuma bileşeni yüklenemedi. İnternet / şirket ağı erişimini kontrol edip sayfayı yenileyin.');
 const wb=XLSX.read(buffer,{type:'array',cellDates:true,cellText:true,cellNF:true});
 sheets=wb.SheetNames.map(name=>({name,ws:wb.Sheets[name],rows:null}));
 }else if(ext==='json'){
 const obj=JSON.parse(decode(buffer));if(!Array.isArray(obj)||!obj.length)throw Error('JSON, nesne veya satır dizisi içermeli.');
 let rows;if(obj.every(v=>Array.isArray(v)))rows=obj;else if(obj.every(v=>v&&typeof v==='object'&&!Array.isArray(v))){const keys=[...new Set(obj.flatMap(Object.keys))];rows=[keys,...obj.map(v=>keys.map(k=>v[k]==null?'':typeof v[k]==='object'?JSON.stringify(v[k]):v[k]))];}else throw Error('JSON satır yapısı desteklenmiyor.');sheets=[{name:'JSON',rows}];
 }else{
 if(typeof Papa==='undefined')throw Error('CSV okuma bileşeni yüklenemedi. Sayfayı yenileyin.');
 let text=decode(buffer).replace(/^\uFEFF/,'');if(/^\s*<(?:!doctype|html|table|\?xml)/i.test(text))throw Error('Bu dosya HTML/XML içeriyor. Excel’de açıp XLSX olarak kaydedin.');
 let delimiter=$('delimiter').value;if(delimiter==='tab')delimiter='\t';
 const sep=text.match(/^sep=(.)\r?\n/i);if(sep){delimiter=delimiter||sep[1];text=text.slice(sep[0].length);}
 const parsed=Papa.parse(text,{delimiter:delimiter||(ext==='tsv'?'\t':''),skipEmptyLines:false,dynamicTyping:false});
 const errors=parsed.errors.filter(e=>e.code!=='UndetectableDelimiter');if(errors.length)throw Error('Metin ayrıştırılamadı: '+errors[0].message+' (satır '+((errors[0].row??0)+1)+')');
 sheets=[{name:'Veri',rows:parsed.data}];
 }
 if(token!==state.token)return;state.sheets=sheets;state.filename=file.name.replace(/\.[^.]+$/,'');$('headerRow').value=1;
 $('sheet').innerHTML=sheets.map((s,i)=>`<option value="${i}">${esc(s.name)}</option>`).join('');$('sheet').disabled=sheets.length<2;state.busy=false;selectSheet();
 }catch(e){if(token!==state.token)return;state.busy=false;state.result=null;enableExport();status(e.message||'Dosya okunamadı.',true);}
}
function selectSheet(){try{const sheet=state.sheets[Number($('sheet').value)||0];if(!sheet)return;if(!sheet.rows)sheet.rows=readSheet(sheet.ws);state.source=sheet.rows;build();}catch(e){state.result=null;enableExport();status(e.message,true);}}
function build(){
 const h=Number($('headerRow').value)-1;
 if(!Number.isInteger(h)||h<0||h>=state.source.length){state.result=null;enableExport();status('Geçerli bir başlık satırı seçin.',true);return;}
 const body=state.source.slice(h+1);const count=body.reduce((max,row)=>Math.max(max,row.length),state.source[h]?.length||0);
 if(!count||count>500||body.length>200000||count*state.source.length>3000000){state.result=null;enableExport();status('Veri boş veya işlem sınırını aşıyor (200.000 satır / 500 sütun / 3 milyon hücre).',true);return;}
 state.headers=Array.from({length:count},(_,i)=>String(state.source[h][i]??'').trim()||'Sütun '+(i+1));
 state.data=body.map(r=>Array.from({length:count},(_,i)=>r[i]??''));
 state.types=state.headers.map((head,j)=>C.infer(head,state.data.slice(0,200).map(r=>r[j]),options().locale));
 renderColumns();recalculate();
}
function renderColumns(){ $('columns').innerHTML=state.headers.map((h,j)=>`<div class="column"><b title="${esc(h)}">${j+1}. ${esc(h)}</b><small>${esc(state.data.find(r=>!C.empty(r[j]))?.[j]??'Boş sütun')}</small><select aria-label="${esc(h)} veri türü" data-column="${j}">${Object.entries(types).map(([v,t])=>`<option value="${v}"${state.types[j]===v?' selected':''}>${t}</option>`).join('')}</select></div>`).join('');}
function recalculate(){
 state.result=C.convert(state.data,state.types,options());const r=state.result;
 $('rowCount').textContent=r.rows.length.toLocaleString('tr-TR');$('colCount').textContent=state.headers.length;$('issueCount').textContent=r.issues.length.toLocaleString('tr-TR');
 $('issuesSection').hidden=!r.issues.length;
 $('issues').innerHTML=r.issues.length?'<table><thead><tr><th>Kaynak satır</th><th>Sütun</th><th>Değer</th><th>Kontrol</th></tr></thead><tbody>'+r.issues.slice(0,100).map(i=>`<tr><td>${i.row}</td><td>${esc(state.headers[i.column-1])}</td><td>${esc(i.raw)}</td><td>${esc(i.reason)}</td></tr>`).join('')+'</tbody></table>':'';
 status(`${state.filename} · ${r.rows.length.toLocaleString('tr-TR')} satır hazır. ${r.blanks} boş, ${r.duplicates} aynı satır kaldırıldı.${r.issues.length?' '+r.issues.length+' hücreyi kontrol edin; özgün değerleri korundu.':''}`,!!r.issues.length);
 enableExport();renderTable();
}
function renderTable(){if(!state.result)return;const rows=state.raw?state.data:state.result.rows;
 const fmt=(v,j)=>state.raw?String(v??''):C.format(v,state.types[j],locale(),digits());
 $('toggleRaw').textContent=state.raw?'Düzenlenmiş veriyi göster':'Kaynak veriyi göster';
 $('table').innerHTML='<table><thead><tr><th>#</th>'+state.headers.map(h=>`<th>${esc(h)}</th>`).join('')+'</tr></thead><tbody>'+rows.slice(0,100).map((r,i)=>`<tr><td>${i+1}</td>${r.map((v,j)=>`<td class="${typeof v==='number'?'numeric':''}" title="${esc(fmt(v,j))}">${esc(fmt(v,j))}</td>`).join('')}</tr>`).join('')+'</tbody>'+(!state.raw&&$('totals').checked&&state.types.includes('amount')?'<tfoot><tr><td>Σ</td>'+state.types.map((t,j)=>`<td class="numeric">${t==='amount'?esc(C.format(rows.reduce((s,r)=>s+(typeof r[j]==='number'?r[j]:0),0),t,locale(),digits())):''}</td>`).join('')+'</tr></tfoot>':'')+'</table>';
 $('previewInfo').textContent=`${state.raw?'Kaynak':'Düzenlenmiş'} · ${Math.min(100,rows.length)} / ${rows.length.toLocaleString('tr-TR')} satır · Seçili sayfa aktarılır`;
}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function csvText(){const sep=$('csvSep').value==='tab'?'\t':$('csvSep').value;const rows=[state.headers,...state.result.rows.map(r=>r.map((v,j)=>v instanceof Date?v.toISOString().slice(0,10):typeof v==='number'?new Intl.NumberFormat(locale(),{useGrouping:false,maximumFractionDigits:15}).format(v):v))];return '\uFEFF'+Papa.unparse(rows,{delimiter:sep,newline:'\r\n',escapeFormulae:true});}
async function workbook(){
 const wb=new ExcelJS.Workbook();wb.creator='Tolga İpek · Veri Dönüştürücü';wb.created=new Date();const ws=wb.addWorksheet('Duzenlenmis Veri');
 const palette={navy:['203B5B','F0F4F9','E0E9F4'],green:['285447','F0F6F2','DAEAE0'],gray:['414B58','F3F4F6','E3E7ED']}[$('theme').value];
 const heads=ws.addRow(state.headers);heads.height=28;heads.eachCell(c=>{c.font={name:'Aptos',size:11,bold:true,color:{argb:'FFFFFFFF'}};c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+palette[0]}};c.alignment={vertical:'middle',wrapText:true};});
 state.result.rows.forEach((row,i)=>{const rr=ws.addRow(row);rr.eachCell({includeEmpty:true},(cell,j)=>{cell.font={name:'Aptos',size:11,color:{argb:'FF263348'}};cell.alignment={vertical:'middle',horizontal:['number','amount','price','percent'].includes(state.types[j-1])?'right':'left'};if(i%2===1)cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+palette[1]}};if(state.types[j-1]==='text')cell.numFmt='@';else cell.numFmt=C.excelFormat(state.types[j-1],digits(),locale());});});
 if($('totals').checked&&state.types.includes('amount')){const row=ws.addRow(state.types.map((t,j)=>t==='amount'?{formula:`SUBTOTAL(109,${ws.getColumn(j+1).letter}2:${ws.getColumn(j+1).letter}${state.result.rows.length+1})`,result:state.result.rows.reduce((s,r)=>s+(typeof r[j]==='number'?r[j]:0),0)}:null));const label=state.types.findIndex(t=>t!=='amount');if(label>=0)row.getCell(label+1).value='TOPLAM';row.eachCell({includeEmpty:true},(c,j)=>{c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+palette[2]}};c.font={name:'Aptos',size:11,bold:true};if(state.types[j-1]==='amount')c.numFmt=C.excelFormat('amount',digits(),locale());});}
 ws.views=[{state:'frozen',ySplit:1}];ws.autoFilter={from:{row:1,column:1},to:{row:state.result.rows.length+1,column:state.headers.length}};
 state.headers.forEach((h,j)=>{const sample=state.result.rows.slice(0,300).map(r=>C.format(r[j],state.types[j],locale(),digits()));ws.getColumn(j+1).width=Math.min(55,Math.max(14,h.length+3,...sample.map(v=>v.length+3)));});
 ws.pageSetup={orientation:'landscape',fitToPage:true,fitToWidth:1,fitToHeight:0};return wb;
}
$('file').addEventListener('change',e=>{if(e.target.files[0])load(e.target.files[0]);});$('drop').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('file').click();}});
for(const event of ['dragover','dragleave','drop'])$('drop').addEventListener(event,e=>{e.preventDefault();$('drop').classList.toggle('drag',event==='dragover');if(event==='drop'&&e.dataTransfer.files[0])load(e.dataTransfer.files[0]);});
$('sheet').addEventListener('change',()=>{$('headerRow').value=1;selectSheet();});$('headerRow').addEventListener('change',()=>{if(state.source.length)build();});
for(const id of ['encoding','delimiter'])$(id).addEventListener('change',()=>{if(state.file)load(state.file);});
$('sourceLocale').addEventListener('change',()=>{if(state.source.length)build();});
$('columns').addEventListener('change',e=>{if(e.target.dataset.column!==undefined){state.types[Number(e.target.dataset.column)]=e.target.value;recalculate();}});
for(const id of ['trim','removeEmpty','dedupe'])$(id).addEventListener('change',()=>{if(state.result)recalculate();});
for(const id of ['outputLocale','digits','totals'])$(id).addEventListener('change',renderTable);
$('toggleRaw').addEventListener('click',()=>{state.raw=!state.raw;renderTable();});$('reset').addEventListener('click',reset);
$('csv').addEventListener('click',()=>{try{if(state.busy||!state.result||state.result.issues.length)return;const tsv=$('csvSep').value==='tab';download(new Blob([csvText()],{type:(tsv?'text/tab-separated-values':'text/csv')+';charset=utf-8'}),state.filename+'_duzenlenmis.'+(tsv?'tsv':'csv'));}catch(e){status(e.message,true);}});
$('xlsx').addEventListener('click',async()=>{if(state.busy||!state.result||state.result.issues.length)return;state.busy=true;enableExport();try{if(typeof ExcelJS==='undefined')throw Error('Excel çıktı bileşeni yüklenemedi. İnternet / şirket ağı erişimini kontrol edin.');status('Excel dosyası hazırlanıyor…');await new Promise(r=>setTimeout(r,30));const wb=await workbook(),buf=await wb.xlsx.writeBuffer();download(new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),state.filename+'_duzenlenmis.xlsx');status('Excel hazır. Seçili sayfa, belirlediğiniz tür ve biçimlerle aktarıldı.');}catch(e){status(e.message,true);}finally{state.busy=false;enableExport();}});
$('demo').addEventListener('click',()=>{reset();$('sourceLocale').value='en';state.filename='ERP_Ornek';state.sheets=[{name:'PO Raporu',rows:[['PO No','Tedarikçi','Miktar','Birim Fiyat','Tutar SAR','Tarih','KDV %'],['0040301282','  Örnek Nakliye A.Ş.  ','1200','35.50','42,600.00','31.10.2026','15%'],['0040301287','Örnek Kablo Ltd.','2450.75','12.40','30,389.30','2026-10-30','15%'],['0040301290','Örnek Malzeme','40000','1.25','50,000.00','29.10.2026','15%'],['0040301291','İade / düzeltme','-100','35.50','(3,550.00)','2026-10-31','15%'],['','','','','','','']]}];$('sheet').innerHTML='<option value="0">PO Raporu (örnek)</option>';selectSheet();});
// Exposed for integration checks; conversion remains local to the browser.
window.DataStudio={state,load,workbook,csvText,build,recalculate};
