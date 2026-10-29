# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Anyone looking for a free, practical utility: people who need to merge or fix PDFs, convert a text/CSV export into a clean Excel table, shrink or crop an image to a target size, print an image as a multi-page poster, or automate a repetitive Excel task. Turkish-speaking visitors first, English second. Many arrive with one concrete job in mind and leave once it is done.

## Product Purpose
tolgaipek.com.tr is Tolga İpek's personal site: a collection of free browser tools and downloadable Excel VBA macros he built for his own engineering and project-controls work. Success is a visitor opening a tool and using it, or downloading a macro.

## Positioning
Every browser tool runs entirely on the visitor's device; files are never uploaded to a server. The tools and macros come from a working mechanical engineer's real project-controls and cost-management needs (S-curves, weighted cost distribution, folder creation from cell lists), not from a generic utility farm. Free, no account, no tracking.

## Operating Context
- Browser tools: PDF Atölyesi (`pdf-atolyesi.html`), Veri Dönüştürücü (`/veri-donusturucu/`), Görsel Boyutlandırıcı (`/gorsel-boyutlandirici/`), KubArt (`/kubart/`).
- Excel macros (8, `.bas` files in `macros/`), explained step by step on `makrolar.html`: PDF Birleştir, Excel Temizle, Renk Eşleştir, Klasör Kopyala, Proje S Eğrisi, Hücrelerden Klasör Oluştur, Excel Sayfa Envanteri, Ağırlıklı Tutar Dağıtımı.
- Excel Pratikleri (`excel-pratikleri.html`): written notes on Excel problems with downloadable sample workbooks (`downloads/`).
- Macros run in desktop Excel; several need Windows (and PDF Birleştir needs Adobe Acrobat).

## Capabilities and Constraints
- Hosted on GitHub Pages as static HTML/CSS/JS (no build step today). Custom domain via Cloudflare DNS.
- Every page carries a Content-Security-Policy meta tag: scripts only from self, cdn.jsdelivr.net and cdnjs.cloudflare.com; fonts self-hosted from `assets/fonts/` (Google Fonts still allowed by older pages' CSP); images self/data/blob.
- Bilingual TR/EN via `data-tr` / `data-en` attributes and a small `localize()` script; must be kept.
- No analytics, cookies, ads or third-party trackers; must stay that way.

## Brand Commitments
- Name: Tolga İpek. Profile photo must appear on the homepage (`assets/vesikalik.jpg`, a 3:4 crop of `assets/portrait.jpg`).
- TR/EN language toggle.
- No tracking.

## Evidence on Hand
- Real tools and macros listed above, with real descriptions and requirements.
- Bio: "Makine mühendisiyim. Proje kontrol, maliyet yönetimi ve Excel otomasyonuyla verileri pratik çözümlere dönüştürüyorum."
- Links: GitHub (Tipek41), LinkedIn.
- No testimonials, usage numbers, download counts or press exist; do not invent them.

## Product Principles
1. The job comes first: a visitor should reach the right tool in one click from the homepage.
2. Privacy is a feature, stated plainly: files stay on the device.
3. Built by a practitioner: specificity from real engineering work beats generic utility language.
4. Free and honest: no fabricated numbers, no dark patterns, no tracking.
