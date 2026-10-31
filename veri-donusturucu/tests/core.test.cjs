const {test}=require('node:test');const assert=require('node:assert/strict');const C=require('../core.js');
test('TR / EN separators and accounting negatives',()=>{
 for(const [input,locale,value] of [['1.234.567,89','tr',1234567.89],['1,234,567.89','en',1234567.89],['(3,550.00)','en',-3550],['1 234,56 SAR','tr',1234.56],['350,25-','tr',-350.25],['-0.15','en',-.15],['0,00','tr',0],['1234567.89','auto',1234567.89],['1.234.567','auto',1234567],['15%','en',.15]])assert.equal(C.number(input,locale,input.includes('%')).value,value,input);
});
test('ambiguous, malformed, long and code numbers are never guessed',()=>{
 for(const [v,l] of [['1.234','auto'],['1,234','auto'],['00123','en'],['1234567890123456','en'],['12,34.56','en'],['12.34,56','tr'],['1 2','en'],['15%','en']])assert.ok(C.number(v,l).error,v);
 assert.equal(C.number('1.234','tr').value,1234);assert.equal(C.number('1.234','en').value,1.234);
});
test('calendar dates validated, leap year and time',()=>{
 assert.equal(C.date('29.02.2024').value.toISOString(),'2024-02-29T00:00:00.000Z');assert.equal(C.date('2026-10-31 12:23:45').value.toISOString(),'2026-10-31T12:23:45.000Z');for(const v of ['31.02.2026','2026-13-01','2026-10-31 24:00'])assert.ok(C.date(v).error);
});
test('ERP codes, unit prices, amounts and percentages',()=>{
 for(const [h,v,t]of [['PO No',['0040301282'],'text'],['MR Number',['123'],'text'],['Malzeme Kodu',['001'],'text'],['Birim Fiyat',['12.40'],'price'],['Tutar SAR',['hatalı'],'amount'],['KDV %',['15%'],'percent'],['Miktar',['1000'],'number']])assert.equal(C.infer(h,v,'en'),t,h);
});
test('cleaning preserves codes, removes only whole duplicate rows, retains bad original',()=>{
 const r=C.convert([['001','1,200.00'],['001','1,200.00'],['002','hata'],['','']],['text','amount'],{locale:'en',trim:true,removeEmpty:true,dedupe:true,startRow:4});assert.deepEqual(r.rows,[['001',1200],['002','hata']]);assert.equal(r.blanks,1);assert.equal(r.duplicates,1);assert.deepEqual(r.issues[0],{row:6,column:2,raw:'hata',reason:'Sayıya dönüştürülemedi'});
});
test('preview grouping and Excel number formats',()=>{
 assert.equal(C.format(1234567.89,'amount','tr-TR',2),'1.234.567,89');assert.equal(C.format(1234567.89,'amount','en-US',2),'1,234,567.89');assert.match(C.excelFormat('amount'),/#,##0\.00/);
});
