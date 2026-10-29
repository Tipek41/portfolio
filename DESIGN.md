---
name: Tolga İpek
description: Free browser tools and Excel macros, kept in one Turkish graph-paper notebook.
colors:
  cover: "#0e5a43"
  cover-deep: "#0a4634"
  cover-ink: "#f3f6f1"
  cover-soft: "#d5e9de"
  cover-mint: "#9fe0bf"
  pen: "#1e3fb8"
  margin: "#e0574a"
  highlighter: "#fde68a"
  paper: "#fcfcfa"
  grid: "#d9e2ec"
  label-rule: "#c7d3dd"
  ink: "#191d22"
  ink-soft: "#3a414a"
  pencil: "#59616c"
  tab-pdf: "#c63d31"
  tab-tablo: "#2e57c9"
  tab-gorsel: "#e7b52a"
  tab-gorsel-ink: "#7f5c00"
  tab-poster: "#7e57b8"
  tab-makro: "#2a2f36"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(40px, 4.6vw, 68px)"
    fontWeight: 850
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(26px, 2.6vw, 36px)"
    fontWeight: 800
    lineHeight: "42px"
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: "36px"
  lead:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: "28px"
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.06em"
  hand:
    fontFamily: "Kalam, Comic Sans MS, cursive"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: "24px"
  hand-value:
    fontFamily: "Kalam, Comic Sans MS, cursive"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: "32px"
rounded:
  hairline: "2px"
  box: "3px"
  button: "4px"
  tab: "8px"
  label: "14px"
spacing:
  sq: "24px"
  sq-mobile: "20px"
  half: "12px"
  double: "48px"
  band: "72px"
components:
  button-cover:
    backgroundColor: "{colors.cover-ink}"
    textColor: "{colors.cover-deep}"
    typography: "{typography.body}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "48px"
  button-cover-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.cover-deep}"
  button-pen:
    backgroundColor: "transparent"
    textColor: "{colors.pen}"
    rounded: "{rounded.button}"
    padding: "0 20px"
    height: "48px"
  button-pen-hover:
    backgroundColor: "{colors.pen}"
    textColor: "#ffffff"
  index-tab:
    backgroundColor: "{colors.tab-pdf}"
    textColor: "#ffffff"
    rounded: "{rounded.tab}"
    width: "84px"
    height: "44px"
  lang-toggle-active:
    backgroundColor: "{colors.cover-ink}"
    textColor: "{colors.cover}"
    rounded: "{rounded.box}"
    padding: "4px 9px"
  name-label:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.label}"
    padding: "18px 24px 24px"
  note-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "24px 30px 30px"
---

# Design System: Tolga İpek

## Overview

**Creative North Star: "The Kareli Defter"**

The site is one Turkish school graph-paper notebook, seen once. A saturated green plastic jacket with a white name label is the front cover. Graph-paper pages follow, where each tool is written up as a solved exercise: the question as a heavy grotesk headline, the answer in ballpoint, and a pencil sketch of before → after. The back cover closes the book with the label again, a barcode and a price of zero. Every decision is a physical notebook decision: what is printed, what is handwritten, what is stuck on, what sticks out.

Density is medium and rhythmic. The 24px grid square is the unit for spacing, line-height and section bands, so text sits on the ruling. Color is restrained on the pages: graphite and ink on near-white paper, one red margin rule, one ballpoint blue. Saturation lives only on the covers and on the colored index tabs. Depth comes from objects lying on a surface (the label, the taped photo, the tabs), never from floating UI panels.

This homepage is the first and so far only surface in this world. The tool pages and content pages still use the earlier dark design (see Do's and Don'ts).

**Key Characteristics:**
- Front and back covers in deep notebook green with a diagonal plastic sheen; pages are white graph paper with a red margin rule.
- Heavy grotesk (Schibsted Grotesk, 800–850) for printed text; Kalam ballpoint handwriting for annotations only.
- Vertical rhythm locked to the grid square (24px; 20px at ≤760px).
- One solid button, on the cover. Calls to action on the pages are ballpoint-blue outline buttons.
- Colored index tabs stick out of the right edge, stay fixed while you scroll, and mark the current section.
- Before → after pencil sketches that draw themselves in with a pen stroke as they scroll into view.

## Colors

The covers are saturated, the pages stay quiet, and a set of index-tab hues identifies each tool.

### Primary
- **Notebook Cover Green** (`cover`): the front cover field, the back cover, the theme-color meta, and the text of the active language toggle. Painted as a radial gradient from a lighter #136a50 at the top left into Cover Deep, with a 112° white sheen band at 5–13% opacity to read as plastic.
- **Cover Deep Green** (`cover-deep`): the far edge of the cover gradient and the text color of the cover button.
- **Ballpoint Blue** (`pen`): everything "written by hand" on paper. Kalam annotations, values on the name label, the "Çözüm:" lines, the pen arrows in the sketches, outline-button strokes, the focus ring, and the ticks in the multiple-choice boxes.

### Secondary
- **Margin Red** (`margin`): the one vertical margin rule on every page (1.5px, 85% opacity, five squares in from the left). Use it for nothing else.
- **Highlighter Yellow** (`highlighter`): text selection, and the hover wash on the macro formula-sheet rows (at 55%).

### Tertiary: index tabs
One hue per tool section, set through the section's `--c` variable: **PDF Red** (`tab-pdf`), **Table Blue** (`tab-tablo`), **Image Yellow** (`tab-gorsel`), **Poster Violet** (`tab-poster`), **Macro Graphite** (`tab-makro`). Each fills its tab, colors its margin label and draws its sketch's highlight stroke. **Image Ink** (`tab-gorsel-ink`) is the legible stand-in wherever the yellow would have to carry text on paper. The Image tab itself uses dark #2a2104 text.

### Neutral
- **Paper** (`paper`): page background and the fill of sketch shapes.
- **Grid Line** (`grid`): the 1px graph-paper ruling, every 24px both ways.
- **Label Rule** (`label-rule`): the ruled writing lines on the name label.
- **Ink** (`ink`): printed text, checkbox borders, the formula sheet's top and bottom rules.
- **Soft Ink** (`ink-soft`): secondary paragraph text on paper (macro descriptions, note and about copy).
- **Pencil Grey** (`pencil`): sketch strokes, field captions, "a)–e)" option letters, metadata, column heads, the note-card border.
- **Cover Ink** (`cover-ink`) and **Cover Soft** (`cover-soft`): headline and secondary text on green. **Cover Mint** (`cover-mint`): small icons on green (lock, check).

### Named Rules
**The Cover/Page Rule.** Green belongs to the covers. Pages are paper, grid and ink. A green panel inside the pages breaks the book.

**The Tab Color Rule.** A tool's color appears only as its tab, its margin label and its sketch highlight. It never fills a panel or a background on paper.

## Typography

**Display Font:** Schibsted Grotesk (variable 400–900, self-hosted; fallback system-ui, sans-serif)
**Body Font:** Schibsted Grotesk
**Handwriting Font:** Kalam 400/700 (self-hosted; fallback Comic Sans MS, cursive)

**Character:** The printed voice is a dense, confident grotesk set heavy and tight, like a notebook's printed cover and headings. The ballpoint voice is a loose, legible hand that fills in the blanks and marks up the pages.

### Hierarchy
- **Display** (850, clamp(40px, 4.6vw, 68px), 1.02, −0.03em): the cover headline only. Max 13ch, balanced wrap.
- **Headline** (800, clamp(26px, 2.6vw, 36px), 42px = 1.75 squares, −0.02em): each exercise's question ("Soru"). Max 24ch.
- **Title** (800, 24px, 36px): note and about headings.
- **Lead** (400, 19px, 28px; 17px/26px on mobile): the cover's supporting line in Cover Soft. Max 44ch.
- **Body** (400, 17px, 24px; 16px/24px on mobile): solution paragraphs (line-height 30px = 1.25 squares, max 52ch) and general copy.
- **Label** (700, 11–12px, 0.06–0.08em, uppercase): the printed field captions on the name label ("Adı Soyadı", "Mesleği") and the mini label on the back cover. Nowhere else.
- **Hand** (Kalam 400, 22px, 24px): margin labels (rotated −4°), "Çözüm:" lines, sketch annotations (17px), formula-sheet column heads (18px).
- **Hand Value** (Kalam 400, 24px, 32px; 20px for long values): what is written on the label's ruled lines.

### Named Rules
**The Ballpoint Sparingly Rule.** Kalam is for annotations, filled-in values and margin notes. Headings, body copy, buttons and navigation are always printed grotesk.

**The Printed Field Rule.** Small uppercase tracked captions exist only as the printed field names on the notebook label. They never sit above a headline as a section label.

## Layout

Everything is measured in grid squares (`--sq`: 24px, dropping to 20px at ≤760px). Section padding, gaps, button height (2 squares), formula rows (2.5 squares) and headline line-height (1.75 squares) are all multiples, so text and controls land on the ruling.

- **Cover:** min-height min(78vh, 760px). A top bar (brand, in-page nav, TR/EN toggle, external links) sits above a two-column body: the name label (max 500px) on the left and the pitch on the right, with a 4-square gap. Below 1180px it collapses to one column (label max 520px).
- **Seam:** a 2-square band carrying an SVG spiral/stitch pattern joins the cover to the first page.
- **Pages:** the sheet is padded 6 squares on the left and 8 on the right (room for the tabs), max-width 1440px. The red margin rule sits 5 squares in. Margin labels hang in the gutter to its left.
- **Exercises:** each section is a band with 3 squares of vertical padding (2.5 on mobile), separated by a 1.5px dashed rule (#b9c6d3). Every exercise uses the same order: question → two columns (solution text 1.05fr, sketch 1fr, gap 3 squares) → outline button. Single column below 1180px.
- **Mobile (≤760px):** the margin rule moves to 28px, the sheet pads 16px/44px, margin labels hide, and the index tabs move to a bottom bar.
- Smooth in-page scrolling with a 2-square scroll-padding. It switches off under reduced motion.

### Named Rules
**The Whole Square Rule.** Section spacing, control heights and line-heights are whole or half multiples of the grid square. Only small padding inside a control (icon gaps, chip padding) may break the grid.

## Elevation & Depth

Hybrid. The pages are flat, with depth only from the grid and rules. The covers carry physical objects that cast real, soft shadows, as if lying on the jacket.

### Shadow Vocabulary
- **Label lift** (`box-shadow: 0 1px 0 rgba(0,0,0,.08), 0 14px 30px -12px rgba(0,0,0,.45)`): the name label on the cover.
- **Mini label lift** (`box-shadow: 0 10px 20px -10px rgba(0,0,0,.5)`): the back-cover name label.
- **Photo print** (`box-shadow: 0 2px 6px rgba(0,0,0,.18)`): the vesikalık photo with its white border, held by a translucent tape strip (rgba(245,236,190,.75)).
- **Cover button** (`box-shadow: 0 2px 0 rgba(0,0,0,.25), 0 10px 20px -10px rgba(0,0,0,.5)`): the one solid button.
- **Tab rest / raised** (`box-shadow: -2px 2px 4px rgba(0,0,0,.12)` → `-4px 4px 10px rgba(0,0,0,.2)`): index tabs at rest, and when hovered or active.

### Named Rules
**The Object-on-Paper Rule.** Only things that are physically stuck on or tucked into the notebook (label, photo, tape, tabs, the cover button) get a shadow. Content on the pages stays flat.

## Shapes

Mostly straight paper edges. Small radii on controls, softer radii on stuck-on labels, and hand-drawn irregularity where pencil is involved.

- Name label: 14px corners with an inner 1.5px #9fb3c6 keyline at 10px, rotated −1.2° (−0.8° on mobile). Back-cover mini label: 10px, rotated −1°. Photo rotated +2.5°.
- Buttons 4px. Checkbox and language toggle 3px. Index tabs 8px on the protruding side only (top side on the mobile bottom bar).
- Note card: a deliberately uneven hand-drawn border radius (`2px 14px 4px 10px / 12px 3px 14px 4px`) with a 2px pencil stroke.
- Sketches: 2px round-capped, round-joined strokes. Highlights 2.5px in the section color. Hand-tilted rectangles (±4–9°).
- Icons: inline SVG line icons, 2px stroke, round caps, sized 1em.

## Components

### Buttons
Two inks, one of each per context.
- **Shape:** gently squared (4px), 2 squares tall, 20px side padding, 700 weight at 16px, icon gap 12px.
- **Cover (solid):** Cover Ink fill with Cover Deep text and the cover-button shadow. On hover it lifts 2px and turns pure white. On press it returns to rest. Only one per screen, on the cover ("Ne yapmak istiyorsun?").
- **Pen (outline):** transparent, with a 2px Ballpoint Blue border and blue text. On hover it fills blue with white text. This is the "open the tool" commit at the end of every exercise and the macro sheet.
- **Motion:** 0.2s cubic-bezier(.2,.8,.2,1) on transform, background and shadow.
- **Focus:** a 2px Ballpoint Blue outline at 3px offset everywhere.

### Multiple-choice list (Soru 1)
The opening question is a working multiple choice. Each row has a Kalam letter ("a)") in pencil, a 22px ink-bordered checkbox (3px corners) and the option text at 18px/500. On hover or focus a blue tick scales in (0.2s), the text gets a 2px blue underline, and a pencil arrow fades in on the right. Rows are 2 squares tall in an auto-fill grid with a minimum width of 14 squares.

### Worked exercise
A question headline, a Kalam "Çözüm: <tool>" line in blue, a solution paragraph, a facts row (14px pencil text with blue check icons), and a pen button, next to a before → after pencil sketch. Sketch strokes draw in over 1.1s once 35% of the sketch is visible. Annotations fade in after 0.7s. Under reduced motion they appear complete.

### Formula sheet (macros)
A ruled table between 2px ink top and bottom rules. Rows are 2.5 squares tall with a 4-column grid (name 700 / description 16px soft ink / requirements 13px pencil / arrow), divided by 1px #aab8c6 lines, with a highlighter wash on hover. Column heads are in Kalam pencil. On mobile it stacks to name/description/requirements with the arrow on the right.

### Cards / Containers
- **Note card:** the only card on paper. Transparent over the grid, with a 2px pencil irregular border, 1 square top padding and 1.25 squares on the sides and bottom, and a title-size heading. Its border and link turn Ballpoint Blue on hover.
- No filled panels on the pages.

### Navigation
- **Cover bar:** the brand in 800 weight at 19px, and in-page links at 15px in #eef6f1. They underline on hover (1px, 5px offset). External links carry a 1em arrow icon. Each item is separated by 1 square. On mobile the nav wraps to a full-width, horizontally scrolling row.
- **Language toggle:** TR/EN text buttons at 14px in Cover Soft. The active one is a Cover Ink chip with Cover Green bold text.

### Index tabs (signature)
Fixed to the right edge at mid-height: 84×44px colored tabs, 8px rounded on the left, white 700 text at 14px. They are pushed 18px off-screen at rest and slide fully in on hover or when their section is active (0.25s cubic-bezier(.2,.8,.2,1)). The active tab also gets an inset 2px ink outline. An IntersectionObserver marks the active section. At ≤760px they become a bottom bar of tabs up to 96px wide and 40px tall, rounded on top.

### Name label (signature)
The fixed home, repeated on the back cover. A white rounded label carrying a "Defter" header, ruled lines of printed uppercase field captions with Kalam blue values, and the vesikalık photo (94×125, 68×90 on mobile, slightly desaturated) taped at the top right.

## Do's and Don'ts

### Do:
- **Do** size section spacing, control heights and line-heights in whole or half grid squares (24px; 20px at ≤760px).
- **Do** keep green on the front and back covers, and keep pages as paper with a 24px #d9e2ec grid and one red margin rule.
- **Do** end each tool exercise with a Ballpoint Blue outline button, and keep the single solid button on the cover.
- **Do** show each tool as a pencil before → after sketch, with blue pen arrows and Kalam annotations.
- **Do** give each new tool section a tab color through `--c`, and use it only for its tab, margin label and sketch highlight.
- **Do** honor reduced motion: no smooth scrolling, no transitions, and sketches shown complete.
- **Do** self-host fonts from `assets/fonts/`.

### Don't:
- **Don't** set headings, body copy, buttons or navigation in Kalam.
- **Don't** put small uppercase tracked labels above headlines. Uppercase captions exist only as printed fields on the name label.
- **Don't** fill panels or backgrounds on paper with tab colors or cover green.
- **Don't** add shadows to content on the pages. Shadows belong to the label, photo, tape, tabs and cover button.
- **Don't** add a second solid button to a screen.
- **Don't** port the older dark-gradient look of the unmigrated pages into this world. They are migration debt, not a reference.
