---
name: carousel-generator
description: Generate LinkedIn/Instagram carousel slides. Use when the user wants to create a carousel, social media slides, or visual content series from a topic or idea.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
---

# Carousel Generator

Generate professional LinkedIn/Instagram carousel slides using HTML/CSS templates rendered with Puppeteer. Werner Strauch branding built-in. **Kostenlos** - keine API Keys erforderlich.

## Workflow Overview

```
1. Gather Input     → Ask user for topic, platform, template, colors
2. Generate Content → Claude creates compelling text for each slide
3. Review & Approve → Present content to user, iterate until approved
4. Generate Images  → Puppeteer renders HTML → PNG (kostenlos!)
```

## Step 1: Gather Information

Use AskUserQuestion to collect preferences:

```
Questions:
1. Platform: LinkedIn (1:1) or Instagram (4:5)?
2. Template: Hook→Content→CTA / Listicle / Story-Framework?
3. Slide Count: 5, 7, or 10 slides?
4. Color Mode: Dark / Light / Mixed?
```

Then ask:
- **Topic**: "Was ist das Thema deines Carousels?"
- **Key Points**: "Welche Hauptgedanken oder Argumente sollen rein?"

## Step 2: Generate Slide Content

Based on user input, **generate compelling German text** for each slide.

### Content Rules

**Hook Slides (Slide 1):**
- Maximum 6-8 words
- Provocative question OR bold statement
- Creates curiosity gap
- UPPERCASE for impact
- Examples:
  - "DEINE MARGE STIRBT LEISE"
  - "WARUM 90% SCHEITERN"
  - "DAS SAGT DIR KEINER"

**Content/Listicle Slides:**
- Headline: 3-5 words, punchy, UPPERCASE
- One clear idea per slide
- Optional subtitle: 1 short sentence
- Examples:
  - "RABATTE OHNE GEGENLEISTUNG"
  - "ZEITAUFWAND IGNORIEREN"

**Framework Steps:**
- Step number prominent (1/5, 2/5...)
- Clear action or phase name
- Progressive flow

**CTA Slide (Final):**
- Always: "WERNER STRAUCH."
- Tagline: "Der Stille Stratege"
- Handle: @wernerstrauch

### Template Structures

**Hook → Content → CTA:**
```
Slide 1: Hook (attention-grabbing opener)
Slide 2-N-1: Content points (key insights)
Slide N: CTA (brand close)
```

**Listicle (Top X):**
```
Slide 1: Title ("5 WEGE ZU...")
Slide 2-N-1: Numbered items (01, 02, 03...)
Slide N: CTA
```

**Story/Framework:**
```
Slide 1: Framework name + promise
Slide 2-N-1: Steps (Schritt 1, Schritt 2...)
Slide N: CTA
```

## Step 3: Present Content for Review

**CRITICAL: Always present content and wait for approval before generating!**

```markdown
## Carousel Preview: [Topic]

**Platform:** Instagram (4:5)
**Template:** Listicle
**Slides:** 7

---

### Slide 01 — Hook [Dark]
**DU BIST ZU BILLIG**
_5 Zeichen die es verraten_

### Slide 02 — 01 [Dark]
**KUNDEN FRAGEN NIE NACH DEM PREIS**
_Sie sagen sofort ja_

### Slide 03 — 02 [Dark]
**DU ARBEITEST MEHR ALS ALLE ANDEREN**
_Voller Kalender, leeres Konto_

... (weitere Slides)

### Slide 07 — CTA [Dark]
**WERNER STRAUCH.**
_Der Stille Stratege_

---

Soll ich diese Slides so generieren, oder möchtest du Änderungen?
```

**Wait for user approval!** If changes requested, update and show again.

## Step 4: Generate Images

Once approved, write JSON and run Puppeteer generator.

### 4.1 Write Content File

Write to `carousel/src/generated-content.json`:

```json
{
  "topic": "5 Zeichen dass du zu billig bist",
  "platform": "instagram",
  "template": "listicle",
  "colorMode": "dark",
  "slides": [
    {
      "index": 0,
      "type": "hook",
      "title": "DU BIST ZU BILLIG",
      "subtitle": "5 Zeichen die es verraten",
      "showSwipeArrow": true,
      "colorMode": "dark"
    },
    {
      "index": 1,
      "type": "listicle-item",
      "title": "KUNDEN FRAGEN NIE NACH DEM PREIS",
      "subtitle": "Sie sagen sofort ja",
      "number": 1,
      "accentText": "01",
      "showSwipeArrow": true,
      "colorMode": "dark"
    },
    {
      "index": 2,
      "type": "listicle-item",
      "title": "DU ARBEITEST MEHR ALS ALLE ANDEREN",
      "subtitle": "Voller Kalender, leeres Konto",
      "number": 2,
      "accentText": "02",
      "showSwipeArrow": true,
      "colorMode": "dark"
    },
    {
      "index": 3,
      "type": "listicle-item",
      "title": "JEDER WIRD KUNDE",
      "subtitle": "Null Absagen = Null Positionierung",
      "number": 3,
      "accentText": "03",
      "showSwipeArrow": true,
      "colorMode": "dark"
    },
    {
      "index": 4,
      "type": "listicle-item",
      "title": "DU HASST DEINE BESTEN KUNDEN",
      "subtitle": "Sie fordern am meisten für am wenigsten",
      "number": 4,
      "accentText": "04",
      "showSwipeArrow": true,
      "colorMode": "dark"
    },
    {
      "index": 5,
      "type": "listicle-item",
      "title": "DEIN GEWINN SCHRUMPFT JEDES JAHR",
      "subtitle": "Mehr Umsatz, weniger übrig",
      "number": 5,
      "accentText": "05",
      "showSwipeArrow": true,
      "colorMode": "dark"
    },
    {
      "index": 6,
      "type": "cta",
      "title": "WERNER STRAUCH.",
      "subtitle": "Der Stille Stratege",
      "accentText": "@wernerstrauch",
      "showSwipeArrow": false,
      "colorMode": "dark"
    }
  ]
}
```

### 4.2 Run Generator

```bash
cd /Users/werner.strauch/Projekte/werner-strauch/carousel && pnpm tsx src/generate-from-content.ts
```

### 4.3 Open Output & Report

```bash
open /Users/werner.strauch/Projekte/werner-strauch/carousel/output/[folder-name]
```

Report:
```
✅ Carousel generiert!

📁 Output: carousel/output/2026-01-01_topic-name/
   - 01-hook.png
   - 02-listicle-item.png
   - 03-listicle-item.png
   - 04-listicle-item.png
   - 05-listicle-item.png
   - 06-listicle-item.png
   - 07-cta.png
   - carousel.pdf

💰 Kostenlos (Puppeteer/HTML rendering)
```

## Slide Types Reference

### Basis-Templates (5)

| Type | Use For | Key Elements |
|------|---------|--------------|
| `hook` | First slide, attention grabber | Large title, subtitle, diagonal accent |
| `listicle-item` | Numbered list items | Big number (01-99), headline, subtitle |
| `content` | General content points | Headline, optional subtitle, accent bar |
| `framework-step` | Framework/process steps | Step number block, phase name |
| `cta` | Final slide, brand close | Name, tagline, handle, decorative circles |

### Erweiterte Templates (9)

| Type | Use For | Key Elements |
|------|---------|--------------|
| `quote` | Zitat mit Autor | Große Anführungszeichen, zentrierter Text, `quoteAuthor` |
| `stat` | Große Statistik-Zahl | Riesige Zahl in Lime (73%, 5x), Kontext darunter |
| `question` | Rhetorische Frage | Großes ? als Hintergrund, provokative Frage |
| `tip` | Quick Tip/Hack | Card-Box mit 💡 Icon, Lime Border |
| `myth-buster` | Mythos durchstreichen | `mythText` durchgestrichen, `truthText` mit Lime |
| `comparison` | Vorher/Nachher | Zwei Spalten, ✗/✓ Icons, `leftContent`/`rightContent` |
| `split` | Do/Don't Listen | Zwei Spalten mit Listen (Items durch \| getrennt) |
| `highlight` | Key Takeaway | Spotlight-Effekt, dicker Lime Border |
| `chapter` | Kapitel-Übergang | Große Nummer, Kapiteltitel, minimalistisch |

### Bild-Templates (4)

| Type | Use For | Key Elements |
|------|---------|--------------|
| `image-left` | Bild links, Text rechts | 40% Bild, 60% Text, Gradient-Übergang |
| `image-right` | Text links, Bild rechts | 60% Text, 40% Bild, Gradient-Übergang |
| `image-top` | Bild oben, Text unten | 50/50 Split vertikal |
| `phone-mockup` | App-Screenshots | iPhone-Frame mit Screenshot, Text links |

**Bildquellen (alle Templates):**
- `imagePath`: Absoluter Pfad zu lokalem Bild (z.B. `/Users/.../screenshot.png`)
- `imageUrl`: URL zu externem Bild (z.B. `https://example.com/image.jpg`)
- `imageBase64`: Base64-encoded Bild (für AI-generierte Bilder)
- Falls kein Bild angegeben: Gradient-Platzhalter wird angezeigt

### Erweiterte Template JSON-Beispiele

**Quote Slide:**
```json
{
  "type": "quote",
  "title": "Der Preis ist nur ein Problem, wenn der Wert nicht klar ist.",
  "quoteAuthor": "Werner Strauch",
  "colorMode": "dark"
}
```

**Stat Slide:**
```json
{
  "type": "stat",
  "title": "73%",
  "subtitle": "aller Unternehmer unterschätzen ihre wahren Kosten",
  "colorMode": "dark"
}
```

**Question Slide:**
```json
{
  "type": "question",
  "title": "WAS WÄRE WENN DU 50% MEHR VERLANGEN KÖNNTEST?",
  "subtitle": "Ohne einen einzigen Kunden zu verlieren",
  "colorMode": "dark"
}
```

**Tip Slide:**
```json
{
  "type": "tip",
  "title": "Nenne nie den Preis zuerst",
  "subtitle": "Lass den Kunden seinen Bedarf erklären, bevor du über Geld sprichst.",
  "colorMode": "dark"
}
```

**Myth-Buster Slide:**
```json
{
  "type": "myth-buster",
  "title": "placeholder",
  "mythText": "Mehr Kunden = mehr Gewinn",
  "truthText": "Höhere Marge = mehr Gewinn",
  "colorMode": "dark"
}
```

**Comparison Slide:**
```json
{
  "type": "comparison",
  "title": "placeholder",
  "leftLabel": "VORHER",
  "rightLabel": "NACHHER",
  "leftContent": "Stundenlohn kalkulieren",
  "rightContent": "Wertbasiert kalkulieren",
  "colorMode": "dark"
}
```

**Split Slide (Do/Don't):**
```json
{
  "type": "split",
  "title": "placeholder",
  "leftLabel": "DON'T",
  "rightLabel": "DO",
  "leftContent": "Rabatte geben|Stunden zählen|Jeden Kunden annehmen",
  "rightContent": "Wert kommunizieren|Ergebnisse verkaufen|Kunden qualifizieren",
  "colorMode": "dark"
}
```

**Highlight Slide:**
```json
{
  "type": "highlight",
  "title": "Dein Preis kommuniziert deinen Wert",
  "subtitle": "Wer billig ist, wird billig behandelt.",
  "colorMode": "dark"
}
```

**Chapter Slide:**
```json
{
  "type": "chapter",
  "title": "DIE LÖSUNG",
  "subtitle": "So erhöhst du deine Preise ohne Kunden zu verlieren",
  "chapterNumber": 2,
  "colorMode": "dark"
}
```

## Brand Guidelines

**Colors:**
- Deep Navy: #0A192F (60%)
- Electric Lime: #DFFF00 (10%)
- High White: #FFFFFF (30%)

**Voice:**
- German language
- Expert: pricing, profit, strategy
- "Der Stille Stratege"
- Professional but bold

## Files Reference

| File | Purpose |
|------|---------|
| [carousel/src/generate-from-content.ts](../../carousel/src/generate-from-content.ts) | Puppeteer generator |
| [carousel/src/slides/dynamic-templates.ts](../../carousel/src/slides/dynamic-templates.ts) | HTML/CSS templates |
| [carousel/src/styles/carousel-theme.ts](../../carousel/src/styles/carousel-theme.ts) | Brand colors & fonts |
