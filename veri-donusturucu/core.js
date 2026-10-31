/* Data conversion core. No network or DOM access. */
(function(root){
'use strict';
const empty=v=>v==null||String(v).trim()==='';
function number(value,locale='auto',percent=false){
 if(empty(value))return {value:null};
 if(typeof value==='number')return Number.isFinite(value)?{value}:{error:'Geçersiz sayı'};
 let s=String(value).trim().replace(/[\u00a0\u202f]/g,' '), neg=false, hasPercent=s.includes('%');
 if(hasPercent&&!percent)return {error:'Yüzde işareti var; Yüzde türünü seçin'};
 s=s.replace(/\s*(SAR|USD|EUR|TRY|TL|GBP)\s*/gi,'').replace(/[$€₺£%]/g,'').trim();
 if(/^\(.*\)$/.test(s)){neg=true;s=s.slice(1,-1).trim();}
 if(/^[+-]/.test(s)){if(neg)return {error:'İşaret belirsiz'};neg=s[0]==='-';s=s.slice(1);}
 if(/-$/.test(s)){if(neg)return {error:'İşaret belirsiz'};neg=true;s=s.slice(0,-1);}
 if(s.includes(' ')){if(!/^\d{1,3}( \d{3})+([.,]\d+)?$/.test(s))return {error:'Geçersiz boşluklu sayı'};s=s.replace(/ /g,'');}
 if(!/^\d+(?:[.,]\d+)*$/.test(s))return {error:'Sayıya dönüştürülemedi'};
 if(/^0\d/.test(s))return {error:'Baştaki sıfırlar korunmalı; Metin seçin'};
 let decimal;
 if(locale==='tr')decimal=',';
 else if(locale==='en')decimal='.';
 else if(s.includes('.')&&s.includes(','))decimal=s.lastIndexOf('.')>s.lastIndexOf(',')?'.':',';
 else {const m=s.match(/[.,]/g)||[];if(m.length===1&&s.split(/[.,]/)[1].length===3)return {error:'Binlik / ondalık ayırıcı belirsiz; kaynak biçimini seçin'};decimal=m.length>1?(s.includes('.')?',':'.'):(s.includes(',')?',':'.');}
 const group=decimal==='.'?',':'.',parts=s.split(decimal);
 if(parts.length>2)return {error:'Birden fazla ondalık ayırıcı'};
 const int=parts[0];
 if(int.includes(group)&&!new RegExp('^\\d{1,3}(\\'+group+'\\d{3})+$').test(int))return {error:'Binlik gruplama hatalı'};
 if(parts[1]!==undefined&&!/^\d+$/.test(parts[1]))return {error:'Ondalık bölüm hatalı'};
 const normalized=int.split(group).join('')+(parts[1]===undefined?'':'.'+parts[1]);
 if(normalized.replace('.','').replace(/^0+/,'').length>15)return {error:'15 haneden uzun değer; Metin olarak koruyun'};
 let n=Number(normalized)*(neg?-1:1);if(percent&&hasPercent)n/=100;
 return Number.isFinite(n)?{value:n}:{error:'Geçersiz sayı'};
}
function date(value){
 if(value instanceof Date)return Number.isNaN(value.getTime())?{error:'Geçersiz tarih'}:{value};
 if(empty(value))return {value:null};
 const s=String(value).trim();
 const m=s.match(/^(?:(\d{4})-(\d{1,2})-(\d{1,2})|(\d{1,2})[./-](\d{1,2})[./-](\d{4}))(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
 if(!m)return {error:'Tarih biçimi tanınmadı'};
 const y=+(m[1]||m[6]),mo=+(m[2]||m[5]),d=+(m[3]||m[4]),h=+(m[7]||0),mi=+(m[8]||0),sec=+(m[9]||0),dt=new Date(Date.UTC(y,mo-1,d,h,mi,sec));
 if(dt.getUTCFullYear()!==y||dt.getUTCMonth()!==mo-1||dt.getUTCDate()!==d||h>23||mi>59||sec>59)return {error:'Geçersiz takvim tarihi'};
 return {value:dt};
}
function infer(header,values,locale){
 const h=String(header).toLocaleLowerCase('tr');
 if(/(^|[\s_])(id|no|numarası|number|code|kod|po|mr|cbs|iban|telefon|phone)([\s_]|$)/i.test(h)||/kodu|numara|hesap/.test(h))return 'text';
 const vs=values.filter(v=>!empty(v));if(!vs.length)return 'text';
 if(/birim.?fiyat|unit.?price|unit.?rate/.test(h))return 'price';
 if(/tutar|bedel|bütçe|maliyet|amount|cost|budget|total|balance|bakiye/.test(h))return 'amount';
 if(/%|oran|yüzde|percent/.test(h))return 'percent';
 if(/tarih|date/.test(h))return 'date';
 if(vs.every(v=>date(v).value instanceof Date))return 'date';
 if(vs.every(v=>!number(v,locale,true).error)){
 if(/%|oran|yüzde|percent|rate\s*%/.test(h)||vs.some(v=>String(v).includes('%')))return 'percent';
 if(/tutar|fiyat|bedel|bütçe|maliyet|amount|price|cost|budget|total|balance|bakiye/.test(h))return 'amount';
 return 'number';}return 'text';
}
function convert(rows,types,options={}){
 const out=[],issues=[];let blanks=0,duplicates=0;const seen=new Set();
 rows.forEach((row,index)=>{
 if(options.removeEmpty&&row.every(empty)){blanks++;return;}
 const converted=types.map((type,j)=>{
 const raw=row[j]??'';if(type==='text')return raw instanceof Date?raw.toISOString().slice(0,10):(options.trim?String(raw).trim():String(raw));
 const result=type==='date'?date(raw):number(raw,options.locale,type==='percent');
 if(result.error){issues.push({row:index+(options.startRow||2),column:j+1,raw:String(raw),reason:result.error});return raw;}
 return result.value;
 });
 const key=JSON.stringify(converted.map(v=>[typeof v,v]));
 if(options.dedupe&&seen.has(key)){duplicates++;return;}seen.add(key);out.push(converted);
 });return {rows:out,issues,blanks,duplicates};
}
function format(v,type,locale='tr-TR',digits=2){if(v==null)return '';if(v instanceof Date)return v.toLocaleDateString('tr-TR',{timeZone:'UTC'});if(typeof v==='number')return new Intl.NumberFormat(locale,{useGrouping:true,minimumFractionDigits:type==='number'?0:digits,maximumFractionDigits:digits,style:type==='percent'?'percent':'decimal'}).format(v);return String(v);}
function excelFormat(type,digits=2,locale='tr-TR'){const tag=locale==='en-US'?'[$-409]':'[$-41F]';return type==='date'?'dd.mm.yyyy':type==='percent'?tag+'0'+(digits?'.'+'0'.repeat(digits):'')+'%':tag+'#,##0'+(digits?'.'+'0'.repeat(digits):'')+';[Red]-#,##0'+(digits?'.'+'0'.repeat(digits):'');}
const api={number,date,infer,convert,format,excelFormat,empty};if(typeof module!=='undefined')module.exports=api;root.DataCore=api;
})(typeof window!=='undefined'?window:globalThis);
