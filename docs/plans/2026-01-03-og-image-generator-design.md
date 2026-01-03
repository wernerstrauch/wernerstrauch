# OG-Image Generator aus YAML-Dateien

## Ziel

Automatische Generierung von Open Graph Images für alle Unterseiten basierend auf Konfiguration in den YAML-Dateien. Jede Seite erhält ein individuelles OG-Image mit:
- Flexibler Headline (HTML-formatiert)
- SEO-optimiertem Dateinamen
- Konsistentem Design (Portrait, Signet, Grid-Background)

## YAML-Struktur

Erweiterung des `meta`-Blocks in jeder Seiten-YAML:

```yaml
meta:
  title: "E-Commerce Technologieberatung | Werner Strauch"
  description: "..."
  ogImage:
    headline: "E-Commerce<br><mark>Technologieberatung</mark>"
    filename: "og-ecommerce-technologieberatung"
```

### Felder

| Feld | Beschreibung | Beispiel |
|------|--------------|----------|
| `headline` | HTML-String mit Formatierung. `<mark>` für Lime-Akzent, `<br>` für Zeilenumbruch | `"E-Commerce<br><mark>Audit</mark>"` |
| `filename` | Dateiname ohne `.png` Extension | `"og-ecommerce-audit"` |

## Design-Spezifikation

### Layout (1200x630px)
- **Links:** Headline-Text (max. 2 Zeilen)
- **Rechts:** Portrait-Bild (immer sichtbar)
- **Unten links:** Signet (weiß, 50% opacity)
- **Background:** Dark (#0a1628) + Grid + Glow-Effekte

### Typografie
- Font: Inter (Google Fonts)
- Headline: 72-90px, font-weight 800
- `<mark>`: Lime (#c8ff00)
- Standard: Weiß

### Grafische Elemente
- Grid-Background (Lime, 5% opacity)
- Radial Glow (Lime, 12% opacity)
- Corner-Accents (Lime, 15% opacity)

## Script-Architektur

### Datei: `scripts/generate-og-images.js`

```
1. YAML-Dateien lesen (src/content/pages/de/*.yaml)
2. Für jede Datei mit ogImage-Block:
   a. HTML-Template mit Headline befüllen
   b. Portrait + Signet als Base64 einbetten
   c. Playwright: Screenshot erstellen
   d. Speichern unter /public/og/{filename}.png
3. Zusammenfassung ausgeben
```

### Abhängigkeiten
- `playwright` (dev dependency, lokal installiert)
- `js-yaml` (YAML parsing)
- `glob` (Datei-Suche)

## Output

```
/public/og/
├── og-ecommerce-berater.png        # Startseite
├── og-ecommerce-audit.png
├── og-ecommerce-strategie.png
├── og-ecommerce-beratung.png
├── og-ecommerce-sparring.png
├── og-ecommerce-workshop.png
├── og-technologieberatung.png
├── og-projektleitung.png
├── og-interim-management.png
├── og-umsetzungsbegleitung.png
└── ...
```

## Nutzung

```bash
# Lokal ausführen (Playwright muss installiert sein)
node scripts/generate-og-images.js

# Einzelne Seite generieren
node scripts/generate-og-images.js --page technologieberatung
```

## Astro-Integration

Die generierten Bilder werden in den Seiten-Templates referenziert:

```astro
---
const ogImagePath = page.meta.ogImage?.filename
  ? `/og/${page.meta.ogImage.filename}.png`
  : '/og-image.png';
---
<meta property="og:image" content={`https://wernerstrauch.de${ogImagePath}`} />
```
