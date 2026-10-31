# Veri Dönüştürücü

ERP çıktıları ve genel tablo verileri için tarayıcıda çalışan dönüştürücü. Kurulum veya sunucuya dosya gönderimi gerekmez. Ana site GitHub Pages üzerinden yayınlanır.

## Kullanım

1. XLSX / XLS / CSV / TSV / TXT / DAT / JSON dosyası seçin.
2. Excel için çalışma sayfasını ve gerçek başlık satırını seçin. Metinlerde kodlama ve ayırıcı otomatik algılanır; elle değiştirilebilir.
3. Kaynak sayı biçimini seçin. Otomatik mod `1,234` / `1.234` gibi belirsiz değerleri dönüştürmez.
4. Sütun türlerini kontrol edin: Metin/Kod, Sayı/Miktar, Tutar, Birim fiyat, Yüzde, Tarih.
5. Çıktı biçimini, ondalık sayısını ve Excel temasını seçip indirin.

Binlik ayraç ve iki ondalık basamak tutarlarda varsayılandır. Kaynak sayı dili ve çıktı görünümü bağımsızdır. Kimlik/kod alanları metin tutulur. Tutar sütunlarına filtreye duyarlı SUBTOTAL eklenir; birim fiyatlar toplanmaz. Farklı para birimleri aynı tutar sütunundaysa dışa aktarmadan önce ayrı raporlara ayırın.

Hatalı tarih/sayı değerleri korunur; düzeltilene veya sütun Metin seçilene kadar dışa aktarım kapalıdır. Boş/mükerrer satır temizliği isteğe bağlıdır. Önizleme 100 satır; çıktı seçili sayfanın tamamıdır. Dosya sınırı 30 MB; işlem sınırı 200.000 veri satırı, 500 sütun, 3 milyon hücredir. Büyük dosyalar tarayıcı belleğiyle sınırlıdır.

Yüzde: `15%` veya kaynak diline göre `0.15` / `0,15`; yüzde işareti olmayan `15` değeri oran olarak 15 (= %1500) anlamına gelir. Tarihler dd.mm.yyyy, dd/mm/yyyy veya yyyy-mm-dd biçiminde okunur. Formüllerin dosyada saklı sonuçları alınır; formüller yeniden hesaplanmaz, makro/grafik/özgün çalışma kitabı düzeni aktarılmaz. Excel formülü sonucu dosyada yoksa yer tutucu metin gösterilir. CSV/TSV stil ve toplam satırı içermez; sayılar gruplamasız, seçili ondalık diliyle yazılır ve formül benzeri metinler PapaParse ile kaçışlanır.

JSON: nesne dizisi veya ilk satırı başlık olan iki boyutlu dizi. DAT yalnızca ayraçlı metin içeriyorsa desteklenir. Sabit sütun genişlikli metinler ve PDF için ayrı ayrıştırıcı gerekir.

## Bileşenler

Yerel vendor dosyaları sayesinde çalışma anında üçüncü taraf CDN bağlantısı kurulmaz.

| Bileşen | Sürüm | Amaç | Lisans |
|---|---|---|---|
| SheetJS CE | 0.20.3 | XLS/XLSX içe aktarma | Apache-2.0 |
| PapaParse | 5.5.3 | Metin/CSV ayrıştırma ve dışa aktarma | MIT |
| ExcelJS | 4.4.0 | Biçimlendirilmiş XLSX çıktı | MIT |

Kaynaklar: https://git.sheetjs.com/SheetJS/sheetjs · https://github.com/mholt/PapaParse · https://github.com/exceljs/exceljs
Lisans metinleri `vendor/LICENSE-*.txt` dosyalarında yer alır.

## Doğrulama

Depo kökünde Node.js 20+ ile `node --test veri-donusturucu/tests/*.test.cjs` çalıştırın. Testler TR/EN sayılar, belirsiz ayraçlar, tarih geçerliliği, kodların korunması, temizleme, CSV güvenli metin yazımı, gerçek XLS/XLSX yükleme ve biçimlendirilmiş XLSX geri okuma kontrollerini kapsar. Test örnekleri işletim sisteminin geçici klasörüne yazılır.
