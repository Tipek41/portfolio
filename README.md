# Tolga İpek · Portfolio

[Canlı web sitesi](https://tolgaipek.com.tr)

Kişisel portföy, web araçları ve Excel makroları için ana kaynak deposu

## Proje yapısı

| Konum | İçerik |
| --- | --- |
| `index.html` | Portföy ana sayfası, Araçlar ve Projeler, Makrolar |
| `pdf-atolyesi.html` | PDF Atölyesi |
| `veri-donusturucu/` | Veri Dönüştürücü |
| `gorsel-boyutlandirici/` | Görsel Boyutlandırıcı |
| `kubart/` | KubArt |
| `macros/*.bas` | İndirilebilir Excel VBA modülleri |
| `CNAME` | Mevcut özel alan adı |

Bu depo web sitesinin ana kaynağıdır. Araçlara ana sayfadaki kartlardan aynı alan adı altında erişilir. Önceden oluşturulmuş ayrı araç depoları geçmiş çalışmalar olarak korunur; bu sitenin yayın içeriği burada yönetilir.

## Excel makroları kullanım rehberi

<div align="right">

[English](#english) · [Türkçe](#türkçe)

</div>

# Excel VBA makroları

<a id="english"></a>

## English

A growing collection of practical Excel VBA macros to automate everyday tasks.

### Available macros

#### 1. Merge PDFs in a folder

Select a folder and merge its top-level PDF files into one PDF, sorted by filename. Source PDFs stay unchanged. The macro skips its previous output and reports files it could not read.

- [Download the VBA module](macros/pdf-merge.bas)
- **Requirements:** Excel for Windows and the Adobe Acrobat desktop app. Acrobat Reader alone does not support the document-editing automation used by this macro.
- Files are processed on your computer; PDFs are not uploaded to a web service.

#### 2. Clear formatting outside the data

Clear formatting beyond the last value or formula on the active worksheet. Formulas that currently return blank text are included in the data boundary. Cell values and formulas stay intact; the macro does not delete or shift rows and columns.

- [Download the VBA module](macros/clear-unused-formatting.bas)
- **Important:** Make a copy of the workbook before running it. The macro changes formatting, which Excel may not be able to undo.
- If Excel still reports an inflated used range, save and reopen the workbook.

#### 3. Match text color to the cell fill

Change the font color in selected non-empty cells to match each cell's displayed fill color. The same module includes `RestoreOriginalFontColors`, which restores the saved font colors.

- [Download the VBA module](macros/hide-text-matching-fill.bas)
- This is visual concealment only, not security. Cell contents remain accessible.
- A very-hidden worksheet in the workbook stores the restoration data.

#### 4. Copy folders from cell links

Select hyperlink cells in Excel, then choose a destination folder. Run `LinkliKlasorleriKopyala` to copy the linked folders with all their files and subfolders. Source folders stay unchanged. Existing destination names receive `_2`, `_3` suffixes; duplicate source links are skipped.

- [Download the VBA module](macros/copy-linked-folders.bas)
- **Requirements:** Excel for Windows and access to the source folders (company network or VPN when needed).
- Choose a separate local destination folder. Copy errors are reported; a failed copy may leave an incomplete destination folder.
- Supports folder hyperlinks, simple `HYPERLINK` formulas, and folder paths in cells.

#### 5. Project S-Curve

Allocate budgets monthly and chart project cash flow. Run CreateSCurveTemplate in Excel. Enter budget, periods and curve parameters to calculate monthly and cumulative spend with a chart.

- [Download the VBA module](macros/s-curve-planner.bas)
- **Requirements:** Requires desktop Excel. Template supports up to 120 periods; a and b default to zero.

#### 6. Create Folders from Cells

Create folders in bulk from Excel cell values. Select name cells, choose a destination folder, and confirm. Invalid characters are sanitized, existing folders stay untouched, and a result summary is shown. Run CreateFoldersFromSelectedCells.

- [Download the VBA module](macros/create-folders-from-cells.bas)
- **Requirements:** Requires Excel for Windows and write access to the destination. One folder per cell; no nested folders.

#### 7. Excel Sheet Inventory

List visible and hidden Excel sheets in one table. Run ListWorksheetsByVisibility and select an output cell. Sheets are grouped by Visible, Hidden and Very Hidden, with links to visible sheets. The macro confirms before overwriting output cells.

- [Download the VBA module](macros/worksheet-inventory.bas)
- **Requirements:** Requires desktop Excel. Does not change any sheet visibility.

#### 8. Weighted Amount Distribution

Allocate an amount across cells using selected weights. Select an amount, a row of weights and a destination cell. Shares are rounded to two decimals; any rounding difference goes to the final positive weight. Shares are added as formulas to existing numbers or formulas. Run DistributeValueByWeights.

- [Download the VBA module](macros/weighted-distribution.bas)
- **Requirements:** Requires desktop Excel. Negative weights are not supported. Destination must not overlap the source or weights.

### Install and run

1. In Excel, press **Alt+F11** to open the VBA editor.
2. Choose **File → Import File…** and select the `.bas` module for the macro you want.
3. Press **Alt+F8**, select the macro, and run it. PDF merging asks for a folder; the format and text-color tools work on the active worksheet or selection.

### Website

The portfolio website: [tolgaipek.com.tr](https://tolgaipek.com.tr/).

---

<a id="türkçe"></a>

## Türkçe

Günlük işleri otomatikleştiren kullanışlı Excel VBA makrolarının büyüyen koleksiyonu.

### Kullanılabilir makrolar

#### 1. Klasördeki PDF’leri birleştir

Bir klasör seçin; alt klasörlere girmeden içindeki PDF’ler dosya adına göre sıralanıp tek PDF’te birleştirilsin. Kaynak dosyalar değiştirilmez. Makro önceki çıktı dosyasını tekrar eklemez ve okuyamadığı dosyaları bildirir.

- [VBA modülünü indir](macros/pdf-merge.bas)
- **Gereksinimler:** Windows için Excel ve Adobe Acrobat masaüstü uygulaması. Acrobat Reader, bu makronun kullandığı PDF düzenleme otomasyonunu desteklemez.
- Dosyalar bilgisayarınızda işlenir; PDF’ler bir web servisine yüklenmez.

#### 2. Veri dışındaki biçimleri temizle

Aktif çalışma sayfasındaki son değer veya formül hücresinin dışındaki biçimleri temizler. Şu anda boş metin döndüren formüller de veri sınırına dahil edilir. Hücre değerleri ve formüller korunur; makro satır ya da sütun silmez, hücreleri kaydırmaz.

- [VBA modülünü indir](macros/clear-unused-formatting.bas)
- **Önemli:** Çalıştırmadan önce çalışma kitabının bir kopyasını alın. Biçim değişiklikleri Excel’de geri alınamayabilir.
- Excel kullanılan alanı hâlâ geniş gösteriyorsa dosyayı kaydedip kapatın ve yeniden açın.

#### 3. Yazı rengini hücre dolgusuyla eşleştir

Seçili ve boş olmayan hücrelerde yazı rengini ekranda görünen dolgu rengiyle eşleştirir. Aynı modüldeki `RestoreOriginalFontColors` makrosu kaydedilmiş özgün yazı renklerini geri yükler.

- [VBA modülünü indir](macros/hide-text-matching-fill.bas)
- Bu yalnızca görsel gizlemedir, güvenlik sağlamaz. Hücre içerikleri erişilebilir durumda kalır.
- Geri yükleme bilgileri çalışma kitabındaki çok gizli bir sayfada saklanır.

#### 4. Linklerdeki klasörleri kopyala

Excel’de bağlantı hücrelerini seçin, ardından hedef klasörü belirleyin. `LinkliKlasorleriKopyala` makrosu bağlı klasörleri tüm dosya ve alt klasörleriyle kopyalar. Kaynak klasörler değiştirilmez. Hedefte aynı isim varsa `_2`, `_3` eklenir; aynı kaynağa giden tekrar bağlantılar atlanır.

- [VBA modülünü indir](macros/copy-linked-folders.bas)
- **Gereksinimler:** Windows için Excel ve kaynak klasörlere erişim (gerektiğinde şirket ağı veya VPN).
- Hedef olarak bilgisayarınızda ayrı bir klasör seçin. Kopyalama hataları bildirilir; başarısız kopyalar hedefte eksik kalabilir.
- Klasör hyperlinklerini, basit `HYPERLINK` formüllerini ve hücrelerdeki klasör yollarını destekler.

#### 5. Proje S Eğrisi

Bütçeyi aylara dağıtın; nakit akışı ve S eğrisi oluşturun. Excel'de CreateSCurveTemplate makrosunu çalıştırın. Proje tutarını, dönemleri ve eğri parametrelerini girin; aylık ve kümülatif harcamalar ile grafik otomatik oluşur.

- [VBA modülünü indir](macros/s-curve-planner.bas)
- **Gereksinimler:** Masaüstü Excel gerekir. Şablon en fazla 120 dönemi destekler; a ve b varsayılanı sıfırdır.

#### 6. Hücrelerden Klasör Oluştur

Excel'deki isimlerden tek seferde toplu klasör oluşturun. İsimlerin bulunduğu hücreleri seçin, hedef klasörü pencereden belirleyin ve onaylayın. Geçersiz karakterler temizlenir; mevcut klasörler korunur. İşlem sonunda sonuç özeti gösterilir. Çalıştırılacak makro: CreateFoldersFromSelectedCells.

- [VBA modülünü indir](macros/create-folders-from-cells.bas)
- **Gereksinimler:** Windows masaüstü Excel ve hedef klasöre yazma izni gerekir. Her hücre bir klasör oluşturur; alt klasör açılmaz.

#### 7. Excel Sayfa Envanteri

Görünür ve gizli Excel sayfalarını tek tabloda listeleyin. ListWorksheetsByVisibility makrosunu çalıştırın ve başlangıç hücresini seçin. Sayfalar Visible, Hidden ve Very Hidden olarak gruplanır; görünür sayfalar için tıklanabilir bağlantılar oluşturulur. İşlemden önce hedef alanın üzerine yazılacağı bildirilir.

- [VBA modülünü indir](macros/worksheet-inventory.bas)
- **Gereksinimler:** Masaüstü Excel gerekir. Çalışma kitabındaki sayfaların gizlilik durumunu değiştirmez.

#### 8. Ağırlıklı Tutar Dağıtımı

Bir tutarı seçtiğiniz ağırlıklara göre hücrelere dağıtın. Kaynak tutarı, tek satırlık ağırlıkları ve hedef başlangıç hücresini seçin. Tutar iki ondalıkla oransal dağıtılır; yuvarlama farkı son pozitif ağırlığa eklenir. Mevcut sayılar ve formüller korunarak paylar formül olarak eklenir. Çalıştırılacak makro: DistributeValueByWeights.

- [VBA modülünü indir](macros/weighted-distribution.bas)
- **Gereksinimler:** Masaüstü Excel gerekir. Negatif ağırlıklar desteklenmez. Hedef aralık kaynak veya ağırlık aralığıyla çakışamaz.

### Kurulum ve çalıştırma

1. Excel’de **Alt+F11** tuşlarına basarak VBA düzenleyicisini açın.
2. **File → Import File…** seçeneğinden kullanmak istediğiniz makronun `.bas` dosyasını içe aktarın.
3. **Alt+F8** tuşlarına basıp makroyu seçerek çalıştırın. PDF birleştirme klasör seçtirir; biçim ve yazı rengi araçları aktif sayfa veya seçim üzerinde çalışır.

### Web sitesi

Portföy web sitesi: [tolgaipek.com.tr](https://tolgaipek.com.tr/)

---

[↑ Back to English](#english) · [↑ Türkçeye dön](#türkçe)
