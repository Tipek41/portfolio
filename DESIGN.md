---
name: Tolga İpek
description: Free browser tools and Excel macros on one modernist grid poster: flat colour planes, heavy grotesk, one off-centre vermilion circle.
colors:
  paper: "#f1f1ee"
  ink: "#141414"
  vermilion: "#c4351f"
  indigo: "#1f3c88"
  ochre: "#e0a526"
  teal: "#2a7f7a"
  stone: "#9fb0b8"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(56px, 8.6vw, 132px)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(34px, 4vw, 56px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.3vw, 34px)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(17px, 1.5vw, 21px)"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.5
  small:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
  ui:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  circle: "50%"
spacing:
  gutter: "40px"
  gutter-mobile: "18px"
  plane-pad: "28px"
  tile-pad: "20px"
components:
  plane-vermilion:
    backgroundColor: "{colors.vermilion}"
    textColor: "#ffffff"
    padding: "28px"
  plane-indigo:
    backgroundColor: "{colors.indigo}"
    textColor: "#ffffff"
    padding: "28px"
  plane-ochre:
    backgroundColor: "{colors.ochre}"
    textColor: "{colors.ink}"
    padding: "28px"
  plane-teal:
    backgroundColor: "{colors.teal}"
    textColor: "#ffffff"
    padding: "28px"
  plane-stone:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    padding: "28px"
  macro-tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "20px"
  macro-tile-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  lang-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "4px 10px"
---

# Design System: Tolga İpek

## Overview

**Creative North Star: "The Grid Poster"**

The homepage is one modernist grid poster in the Ikko Tanaka lineage. Flat colour planes sit on a twelve-column grid, the name is set in Archivo at weight 900 and cut to the grid, and a single off-centre vermilion circle is the only curve on the page. Each tool is one plane. The visitor reads the name, scans the coloured blocks, and takes the one that matches the job. Nothing floats, nothing is shaded, and nothing is decorated for its own sake.

The density is bold and sparse. The hero gives the name the full left seven columns and a photo plane the right five. The four tool planes run in one ordered strip beneath. The macro list is a ruled four-column grid of narrow tiles, and the about section pairs a stone plane with a text block. The photo is a plane, printed in the same grammar as the others: a grayscale duotone on ochre, not a framed portrait.

The direction contract sketched the first viewport with the tool planes as a 2x2 grid in the right five columns. The shipped build differs: the photo plane holds that position and the four planes run as a strip below the hero. The build is canonical here. The world refuses the dark glass-card tool hub, the notebook and graph-paper metaphor (the user rejected it), gradients, shadows, glass, and rounded corners. This is the first and so far only surface in this system. The tool pages, macro pages and the Excel tips page still use an older dark design; that is migration debt, not part of this system.

**Key Characteristics:**
- Flat colour planes, one per tool, with no gradients, shadows or glass.
- Twelve-column grid (`grid12`), gap 0, max width 1440px, every block spans whole columns.
- Archivo 900 for display and headings, Archivo 500 for running text.
- 2px ink rules are the only lines.
- One vermilion circle, 220px, off-centre on the seven-column boundary, the sole curve.
- Photo as a grayscale duotone plane on ochre.
- Hover is a state change: brightness shift, arrow nudge, or ink inversion. Never a lift or a shadow.

## Colors

A small, flat palette of seven hues on a paper ground. Colour lives in planes; ink carries the type and every rule.

### Primary
- **Vermilion** (#c4351f): the one accent. It fills plane 01 (PDF Workshop), the hero circle, and the second line of the name ("İPEK"). It also draws the underline on nav hover.

### Secondary
- **Indigo** (#1f3c88): fills plane 02 (Data Converter).
- **Ochre** (#e0a526): fills plane 03 (Image Resizer), the photo plane's ground, and the text-selection colour.
- **Teal** (#2a7f7a): fills plane 04 (KubArt).
- **Stone** (#9fb0b8): fills the "Excel tips" plane in the about section.

### Neutral
- **Paper** (#f1f1ee): the page ground and the theme colour. The direction contract listed #f2efe8; the shipped CSS uses #f1f1ee, and that is the recorded value.
- **Ink** (#141414): all type, every 2px rule, the active language chip, and the fill of an inverted macro tile.

### Named Rules
**The Plane Rule.** Colour exists only as flat planes, and each plane is one tool. Planes never carry gradients or texture.

**The Ink Line Rule.** Every line on the page is a 2px solid ink rule. No other line colour is used.

## Typography

**Display Font:** Archivo (variable 400–900, self-hosted from `assets/fonts/Archivo-400-900-latin.woff2` with a latin-ext companion; `font-display: swap`; fallback system-ui, sans-serif)
**Body Font:** Archivo
**Label/Mono Font:** none; there is no second family.

**Character:** One heavy grotesk does all the work. Weight 900 with tight tracking makes the name and section heads read as printed poster type. Weight 500 keeps running text plain and legible, and 700 is reserved for small UI links.

### Hierarchy
- **Display** (900, clamp(56px, 8.6vw, 132px), line-height 0.86, −0.045em, uppercase): the surname stack "TOLGA / İPEK" in the hero.
- **Headline** (900, clamp(34px, 4vw, 56px), line-height 1, −0.03em, uppercase): the section heads "Excel makroları" and "Hakkımda".
- **Title** (900, clamp(24px, 2.3vw, 34px), line-height 1.02, −0.02em): plane titles and the about-section stone plane title.
- **Lede** (500, clamp(17px, 1.5vw, 21px), line-height 1.4, max 34ch): the hero line under the name.
- **Body** (500, 17px, line-height 1.5; the bio paragraph at 18px, max 58ch): running copy.
- **Small** (500, 15px, line-height 1.4): plane descriptions; 14px for macro-tile descriptions.
- **UI** (700, 15px): plane action words ("Aç", "Oku") and small text links.
- **Brand** (900, 20px, letter-spacing 0.02em): the header wordmark "TOLGA İPEK".

### Named Rules
**The Heavy Grotesk Rule.** Weight 900 is for the name, section heads and plane titles. Running text stays at 500. Weight 700 is only for small UI actions.

## Layout

The page is a twelve-column grid (`grid12`): `grid-template-columns: repeat(12, minmax(0, 1fr))`, `gap: 0`, `max-width: 1440px`, centred. Every block starts and ends on a column line.

- **Header:** flex row, padding 20px 40px, 28px gap. Brand left, nav centre-left, language toggle and external links pushed right by an auto margin. Bordered below by a 2px ink rule.
- **Hero:** `min-height: min(56vh, 520px)`, two blocks. The wordmark block spans columns 1–7 with a 2px ink rule on its right edge and padding 36px 40px 32px. The photo plane spans columns 8–12, full hero height, ochre ground, image aligned to the bottom. The circle is 220px, positioned at `left: calc(58.333% − 110px)` and `top: calc(50% − 110px)`, so its centre sits on the seven-column boundary, vertically centred.
- **Tools strip:** four planes, each three columns wide (`span 3`), equal height (min 320px), separated by 2px ink rules.
- **Macros:** a full-width section with padding 56px 40px 48px. The heading and note are followed by a four-column ruled grid of eight tiles (3 columns each on the 12-col grid), with 2px ink rules on top, left, and between tiles.
- **About:** a stone plane spanning four columns (min-height 300px) and a bio block spanning eight columns with padding 40px.
- **Footer:** flex row, padding 20px 40px, centred to the same 1440px max width.
- **Breakpoint, 1100px:** the in-page nav is hidden; the hero stacks (wordmark full width, photo full width at 360px tall, below it); the circle is hidden; the tool planes become a 2x2 grid (`span 6`); macro tiles go to two columns; the about blocks stack full width.
- **Breakpoint, 700px:** header wraps with 16px 18px padding; the language toggle and external links span the full width; planes stack in one column (min 220px); macros go to one column; section padding drops to 40px 18px; the gutter drops to 18px.
- **Spacing:** observed padding values are 20, 28, 32, 36, 40, 48 and 56px. They are not a normalised scale and should not be treated as one. The reused values are the 40px desktop gutter and the 18px mobile gutter.
- **Motion:** smooth in-page scrolling with a 90px scroll padding. All transitions are removed under `prefers-reduced-motion: reduce`.

### Named Rules
**The Twelve-Column Rule.** Every block aligns to the twelve-column unit. Horizontal positions are column counts, not pixel offsets. The circle's position is the one exception, expressed as 7/12 of the hero width.

## Elevation & Depth

Flat. The system uses no box-shadows, no gradients, no glass, no blur and no opacity-based layering. Depth is conveyed only by flat colour planes that sit against each other and against the paper ground, and by the 2px ink rules that divide them.

### Named Rules
**The Flat Plane Rule.** Surfaces are flat at rest and stay flat on hover. Planes never receive shadows, gradients or lift.

## Shapes

Square everywhere. Plane edges, rule ends, tile corners and the photo frame are all right angles. The only curve is the single vermilion circle, a 220px disc with `border-radius: 50%`. The circle is the only rounded element on the page.

Lines are 2px solid ink, drawn as grid-cell borders. Icons are two stroke-based SVG arrows (a plain arrow and an external-link arrow), set at 1em with a 2.2 stroke, round caps and round joins. They are functional action indicators, not a decorative icon set.

### Named Rules
**The One Curve Rule.** The vermilion circle is the sole curve in the system. Do not add a second curve, rounded corner or pill.

## Components

### Tool Plane
A flat colour block, one per tool, min 320px tall (220px at ≤700px), padding 28px. The title sits at the bottom in the title style, with a 48px top padding; the description follows at 10px below in the small style, max 28ch; the action row ("Aç" or "Oku" plus arrow) sits at the bottom in the UI style, 22px above.
- **Colour assignment:** vermilion, indigo, teal with white text; ochre and stone with ink text. Each plane's colour is its tool's colour.
- **Hover:** `filter: brightness(1.08)` over 0.15s. The arrow inside the action row moves `translateX(6px)` over 0.2s.
- **Focus:** the global `:focus-visible` outline, 3px solid ink, 3px offset.

### Photo Plane
The portrait sits in the hero's right five columns on an ochre ground, aligned to the bottom, with `object-fit: cover`.
- **Treatment:** `filter: grayscale(1) contrast(1.1)`, `mix-blend-mode: multiply`, `transform: scale(1.02)`. The ochre ground shows through the multiply, so the photo reads as a duotone.

### Macro Tile
A ruled cell in a four-column grid, each cell a 2px ink bordered tile with a 20px padding and a 150px minimum height. The name is 900 at 19px with a 1.1 line-height; the description is 14px at 85% opacity, pushed to the bottom.
- **Hover:** the tile inverts to ink background with paper text, over 0.15s.

### Language Toggle
A 2px ink-bordered box holding the two labels "TR" and "EN" in 700 at 13px with 4px 10px padding. The active label fills ink with paper text. The language state is held in the page's script, not in CSS.

### Text Actions
Small text links with an arrow sit under the macro grid and in the bio. They carry a 2px underline on hover at a 5px offset.

### Header Navigation
Links at 15px and 500. On hover each link gets a 2px vermilion underline at a 5px offset. Below 1100px the links wrap into a row under the header at 700px and below.

### Vermilion Circle (signature)
A single 220px vermilion disc, `pointer-events: none`, placed over the wordmark and photo at the seven-column boundary, vertically centred. It is hidden below 1100px.

## Do's and Don'ts

### Do:
- **Do** build every block on the twelve-column grid (`grid12`, gap 0, max 1440px), spanning whole columns.
- **Do** set each tool as one flat colour plane with its title, description and action word, using the plane colours above.
- **Do** keep the 2px solid ink rule as the only line weight and colour.
- **Do** keep the circle to one 220px vermilion disc, off-centre on the seven-column boundary.
- **Do** keep the photo as a grayscale duotone plane on ochre (`grayscale(1) contrast(1.1)`, multiply).
- **Do** signal hover with brightness (1.08), an arrow nudge (6px), or an ink inversion for macro tiles, over 0.15–0.2s.
- **Do** honour `prefers-reduced-motion` by removing transitions.
- **Do** self-host Archivo from `assets/fonts/`.

### Don't:
- **Don't** add box-shadows, gradients, glass, blur or lift effects to any plane, tile or photo.
- **Don't** round corners on any element except the single vermilion circle.
- **Don't** add a second curve or a second circle to a surface.
- **Don't** introduce lines in any colour other than ink, or in any weight other than 2px.
- **Don't** set small text in vermilion on paper below 18.66px bold; the contrast at #c4351f is 4.7:1, which passes AA for normal text.
- **Don't** set white text on vermilion below 18.66px bold; the contrast at #c4351f is 5.4:1.
- **Don't** use graph paper, notebook covers, paper textures, or a dark glass-card layout for this surface.
- **Don't** change the tool planes into a flat list or a card grid with rounded corners.
