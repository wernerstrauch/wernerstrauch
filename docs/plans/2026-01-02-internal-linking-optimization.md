# Interne Verlinkungsstrategie - Implementierungsplan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Optimierung der internen Verlinkung zur besseren Verteilung des Link Juice von der Startseite zu den Unterseiten und thematisch sinnvolle Querlinks zwischen den Unterseiten.

**Architecture:** Hub-and-Spoke mit thematischen Clustern. Die Homepage fungiert als zentraler Hub, der Link Juice auf thematische Cluster-Hubs (Leistungen-Übersicht) und direkt auf wichtige Service-Seiten verteilt. Innerhalb der Cluster verlinken sich thematisch verwandte Seiten gegenseitig.

**Tech Stack:** Astro YAML-basierte Content-Seiten, Markdown-Links in HTML-Content

---

## Analyse-Ergebnis: Seitenstruktur

### Hierarchie (nach SEO-Priorität)

| Ebene | Seite | Slug | Priority |
|-------|-------|------|----------|
| 1 | Homepage | `/` | 1.0 |
| 2 | Leistungen (Hub) | `/leistungen` | 0.9 |
| 2 | E-Commerce Strategie | `/ecommerce-strategie` | 0.9 |
| 2 | E-Commerce Beratung | `/ecommerce-beratung` | 0.9 |
| 2 | Interim Management | `/interim-management` | 0.9 |
| 3 | Technologieberatung | `/technologieberatung` | 0.85 |
| 3 | E-Commerce Audit | `/ecommerce-audit` | 0.8 |
| 3 | E-Commerce Sparring | `/ecommerce-sparring` | 0.8 |
| 3 | E-Commerce Workshop | `/ecommerce-workshop` | 0.8 |
| 3 | Umsetzungsbegleitung | `/umsetzungsbegleitung` | 0.8 |
| 3 | Projektleitung | `/projektleitung` | 0.8 |
| 3 | Über Mich | `/ueber-mich` | 0.8 |
| 4 | Kontakt | `/kontakt` | 0.8 |

---

## Thematische Cluster

### Cluster 1: Analyse & Strategie (Einstiegsphase)
- **E-Commerce Audit** - Bestandsaufnahme, Ist-Analyse
- **E-Commerce Strategie** - Strategieentwicklung, Roadmap
- **E-Commerce Beratung** - Ganzheitliche Betrachtung

**Logik:** Kunden beginnen oft mit einer Analyse (Audit), entwickeln dann eine Strategie, oder benötigen ganzheitliche Beratung.

### Cluster 2: Technologie & Systeme
- **Technologieberatung** - Systemauswahl, ERP, PIM, Shopify
- **E-Commerce Strategie** - Hat Technologie-Roadmap-Komponente
- **Projektleitung** - Setzt Technologie-Entscheidungen um

**Logik:** Technologie-Entscheidungen fließen von der Beratung über die Strategie in die Projektleitung.

### Cluster 3: Wissenstransfer & Entwicklung
- **E-Commerce Workshop** - Einmalig, intensiv, Team-fokussiert
- **E-Commerce Sparring** - Kontinuierlich, individuell
- **E-Commerce Beratung** - Kann beides beinhalten

**Logik:** Workshop als Einstieg, Sparring als kontinuierliche Begleitung.

### Cluster 4: Umsetzung & Führung (Intensitäts-Stufen)
- **Umsetzungsbegleitung** - Beratend, QA, wenig Verantwortung
- **Projektleitung** - Steuernd, mittlere Verantwortung
- **Interim Management** - Operativ, volle Verantwortung

**Logik:** Drei Intensitätsstufen der Umsetzungsunterstützung.

---

## Verlinkungsmatrix

### Legende
- **→** = Unidirektional (Von → Nach)
- **↔** = Bidirektional (Gegenseitig)
- **Priority:** HIGH = Must-have, MED = Should-have, LOW = Nice-to-have

### Von Homepage (`/`)

| Ziel | Kontext | Priority |
|------|---------|----------|
| `/leistungen` | Hero Secondary CTA, Intro Values | HIGH |
| `/ecommerce-audit` | Intro Values "Analyse & Strategie" | HIGH |
| `/ecommerce-beratung` | Intro Values "Beratung & Sparring" | HIGH |
| `/projektleitung` | Intro Values "Umsetzung & Führung" | HIGH |
| `/technologieberatung` | ServicesShowcase | HIGH |
| `/ecommerce-sparring` | ServicesShowcase | HIGH |
| `/umsetzungsbegleitung` | ServicesShowcase | MED |
| `/ueber-mich` | ContentEditorial (existiert bereits) | MED |
| `/kontakt` | Alle CTAs (existiert bereits) | HIGH |

### Von Leistungen (`/leistungen`)

| Ziel | Kontext | Priority |
|------|---------|----------|
| `/ecommerce-audit` | ServicesShowcase | HIGH |
| `/ecommerce-strategie` | ServicesShowcase | HIGH |
| `/ecommerce-beratung` | ServicesShowcase | HIGH |
| `/technologieberatung` | ServicesShowcase | HIGH |
| `/ecommerce-sparring` | ServicesShowcase, ServiceCards | HIGH |
| `/ecommerce-workshop` | ServiceCards | HIGH |
| `/umsetzungsbegleitung` | BentoGrid | HIGH |
| `/projektleitung` | BentoGrid | HIGH |
| `/interim-management` | BentoGrid | HIGH |

### Cluster 1: Analyse & Strategie (Querlinks)

| Von | Nach | Kontext | Priority |
|-----|------|---------|----------|
| `/ecommerce-audit` | `/ecommerce-strategie` | "Nach dem Audit: Strategie entwickeln" | HIGH |
| `/ecommerce-audit` | `/ecommerce-beratung` | "Ganzheitliche Beratung" | MED |
| `/ecommerce-strategie` | `/ecommerce-audit` | "Analyse als Grundlage" | HIGH |
| `/ecommerce-strategie` | `/technologieberatung` | "Technologie-Roadmap" | HIGH |
| `/ecommerce-strategie` | `/ecommerce-beratung` | "Ganzheitliche Begleitung" | MED |
| `/ecommerce-beratung` | `/ecommerce-audit` | "Starten mit Audit" | HIGH |
| `/ecommerce-beratung` | `/ecommerce-strategie` | "Strategieentwicklung" | HIGH |
| `/ecommerce-beratung` | `/ueber-mich` | "Mehr über mich" (existiert) | MED |

### Cluster 2: Technologie (Querlinks)

| Von | Nach | Kontext | Priority |
|-----|------|---------|----------|
| `/technologieberatung` | `/projektleitung` | "Implementierung begleiten" | HIGH |
| `/technologieberatung` | `/ecommerce-strategie` | "In Gesamtstrategie einbetten" | MED |
| `/technologieberatung` | `/umsetzungsbegleitung` | "Umsetzung absichern" | MED |

### Cluster 3: Wissenstransfer (Querlinks)

| Von | Nach | Kontext | Priority |
|-----|------|---------|----------|
| `/ecommerce-workshop` | `/ecommerce-sparring` | "Kontinuierliche Begleitung" | HIGH |
| `/ecommerce-workshop` | `/ecommerce-beratung` | "Längerfristige Zusammenarbeit" | MED |
| `/ecommerce-sparring` | `/ecommerce-workshop` | "Team-Workshop als Start" | HIGH |
| `/ecommerce-sparring` | `/projektleitung` | "Bei konkreten Projekten" | MED |

### Cluster 4: Umsetzung (Querlinks - Intensitätsstufen)

| Von | Nach | Kontext | Priority |
|-----|------|---------|----------|
| `/umsetzungsbegleitung` | `/projektleitung` | "Mehr Verantwortung" | HIGH |
| `/umsetzungsbegleitung` | `/ecommerce-sparring` | "Leichtere Begleitung" | MED |
| `/projektleitung` | `/umsetzungsbegleitung` | "Weniger intensiv" | MED |
| `/projektleitung` | `/interim-management` | "Noch mehr Verantwortung" | HIGH |
| `/interim-management` | `/projektleitung` | "Nur Projektfokus" | MED |
| `/interim-management` | `/ecommerce-beratung` | "Nur beratend" | MED |

### Über Mich (`/ueber-mich`)

| Ziel | Kontext | Priority |
|------|---------|----------|
| `/ecommerce-beratung` | Secondary CTA (existiert) | HIGH |
| `/leistungen` | "Meine Leistungen" | HIGH |
| `/ecommerce-strategie` | Skills-Bereich | MED |

---

## Implementierungstasks

### Task 1: Homepage - Bestehende Links prüfen und ergänzen

**Files:**
- Modify: `website/src/content/pages/de/index.yaml`

**Step 1: Prüfe vorhandene Links in der Homepage**

Die Homepage hat bereits:
- Hero CTA → `/kontakt`
- Intro Values → `/ecommerce-audit`, `/ecommerce-beratung`, `/projektleitung`
- ServicesShowcase → `/ecommerce-audit`, `/technologieberatung`, `/umsetzungsbegleitung`, `/ecommerce-sparring`

**Step 2: Ergänze fehlenden Link zu /leistungen**

In der Intro-Section (AboutStory) sollte ein Link zur Leistungen-Übersicht hinzugefügt werden.

```yaml
# In sections -> intro -> content -> valuesTitle sollte ein Link ergänzt werden
valuesTitle: "Meine Leistungsbereiche"
# Ergänze unter dem valuesTitle einen Link:
valuesCta:
  text: "Alle Leistungen im Überblick"
  href: "/leistungen"
```

Alternativ: In der ContentEditorial-Sektion einen expliziten Link zu `/leistungen` im Text ergänzen.

**Step 3: Ergänze Link zu /ecommerce-strategie in ServicesShowcase**

Die E-Commerce Strategie Seite fehlt im ServicesShowcase, obwohl sie Priority 0.9 hat.

```yaml
# Neues Item in ServicesShowcase items:
- icon: "heroicons:map-16-solid"
  title: "E-Commerce Strategie"
  description: "Ihr Masterplan für nachhaltiges Wachstum. Strategiedokument mit Roadmap, Business Case und KPI-Framework."
  linkHref: "/ecommerce-strategie"
```

---

### Task 2: E-Commerce Audit - Querlinks zu Cluster-Seiten

**Files:**
- Modify: `website/src/content/pages/de/ecommerce-audit.yaml`

**Step 1: Ergänze Link zu E-Commerce Strategie nach dem Audit**

Im ContentEditorial (Section 7) oder FAQ einen Verweis ergänzen:

```yaml
# In editorial -> sections, neuer Abschnitt oder im bestehenden ergänzen:
- title: "Wie geht es nach dem Audit weiter?"
  content: |
    <p>Ein Audit ist der erste Schritt. Auf Basis der Ergebnisse können Sie direkt in die Umsetzung gehen – oder zunächst eine <a href="/ecommerce-strategie">E-Commerce Strategie</a> entwickeln, die alle Maßnahmen priorisiert und in einen größeren Kontext stellt.</p>
    <p>Für die laufende Begleitung bietet sich das <a href="/ecommerce-sparring">E-Commerce Sparring</a> an, für komplexe Projekte die <a href="/umsetzungsbegleitung">Umsetzungsbegleitung</a> oder <a href="/projektleitung">Projektleitung</a>.</p>
```

---

### Task 3: E-Commerce Strategie - Querlinks ergänzen

**Files:**
- Modify: `website/src/content/pages/de/ecommerce-strategie.yaml`

**Step 1: Link zu Audit als Voraussetzung**

Im ContentEditorial (Section 8) ergänzen:

```yaml
# Im editorial content ergänzen:
- title: "Strategie auf Basis einer Analyse"
  content: |
    <p>Eine fundierte Strategie basiert auf klaren Daten. Wenn Sie noch keine Bestandsaufnahme gemacht haben, kann ein <a href="/ecommerce-audit">E-Commerce Audit</a> die Grundlage für strategische Entscheidungen liefern.</p>
```

**Step 2: Link zu Technologieberatung**

Im Abschnitt "Technologie & Architektur" im BentoGrid einen expliziten Link setzen:

```yaml
# In BentoGrid cards -> "Technologie & Architektur":
description: "Shop-System, ERP, PIM, CRM – die richtige Technologie-Architektur ist das Rückgrat Ihres E-Commerce. Mehr zur <a href='/technologieberatung'>Technologieberatung</a>."
```

**Step 3: Link zu Umsetzung**

Im FAQ unter "Begleiten Sie auch die Umsetzung?":

```yaml
answer: "Ja, auf Wunsch. Manche Kunden nutzen die Strategie als Grundlage für die eigene Umsetzung. Andere möchten eine kontinuierliche Begleitung bei der Implementierung – als <a href='/ecommerce-sparring'>Sparringspartner</a>, <a href='/umsetzungsbegleitung'>Umsetzungsbegleiter</a> oder in einer <a href='/interim-management'>Interim-Rolle</a>. Beides ist möglich."
```

---

### Task 4: E-Commerce Beratung - Querlinks ergänzen

**Files:**
- Modify: `website/src/content/pages/de/ecommerce-beratung.yaml`

**Step 1: Link zu Audit als Einstieg**

Im ContentSplitImage (Section 6) oder Editorial ergänzen:

```yaml
# In editorial -> sections -> "Typische Beratungsanlässe" ergänzen:
content: |
  <p>Online-Händler suchen Beratung in verschiedenen Situationen: Vor einer Shop-Migration oder ERP-Einführung, bei stagnierendem Wachstum, vor der Internationalisierung, bei der Vorbereitung auf Investoren oder Verkauf, oder einfach, um einen externen Blick auf das eigene Geschäft zu bekommen.</p>
  <p>Viele Kunden starten mit einem <a href="/ecommerce-audit">E-Commerce Audit</a>, um Klarheit über den Status quo zu bekommen. Für strategische Weichenstellungen empfehle ich eine <a href="/ecommerce-strategie">E-Commerce Strategie</a>.</p>
```

**Step 2: Link zu Technologieberatung**

Im BentoGrid "Technologie & Systeme":

```yaml
description: "Shop-System, ERP, PIM, CRM – ich helfe Ihnen, die richtige Technologie-Architektur zu entwickeln und Systeme sinnvoll zu integrieren. Mehr zur <a href='/technologieberatung'>Technologieberatung</a>."
```

---

### Task 5: Technologieberatung - Querlinks ergänzen

**Files:**
- Modify: `website/src/content/pages/de/technologieberatung.yaml`

**Step 1: Link zu Projektleitung für Implementierung**

Im ContentEditorial (Section 7) ergänzen:

```yaml
# Am Ende von "Die richtige Entscheidung treffen":
content: |
  ...Die beste Architektur hängt von Ihrem Geschäftsmodell, Ihrer technischen Kompetenz und Ihren Wachstumszielen ab.
  <p>Nach der Technologie-Entscheidung unterstütze ich Sie auf Wunsch bei der <a href="/projektleitung">Projektleitung</a> oder <a href="/umsetzungsbegleitung">Umsetzungsbegleitung</a> – damit die Implementierung so sauber läuft wie die Auswahl.</p>
```

**Step 2: Link zu E-Commerce Strategie**

Im BentoGrid "Moderne Architekturen":

```yaml
description: "Headless Commerce, MACH und Composable Commerce – neue Ansätze versprechen mehr Flexibilität. Aber sind sie die richtige Wahl für Sie? Die Antwort liegt in Ihrer <a href='/ecommerce-strategie'>E-Commerce Strategie</a>."
```

---

### Task 6: Workshop - Querlinks zu Sparring

**Files:**
- Modify: `website/src/content/pages/de/ecommerce-workshop.yaml`

**Step 1: Link zu Sparring als Fortsetzung**

Im FAQ "Kann der Workshop auch Teil einer längeren Beratung sein?" erweitern:

```yaml
answer: "Absolut. Viele meiner Kunden starten mit einem Workshop als Kick-off für eine längerfristige Zusammenarbeit. Der Workshop schafft die strategische Grundlage, das <a href='/ecommerce-sparring'>E-Commerce Sparring</a> sichert die kontinuierliche Begleitung, und die <a href='/umsetzungsbegleitung'>Umsetzungsbegleitung</a> stellt die Qualität in der Implementierung sicher."
```

**Step 2: Link zu Beratung**

Im ContentSplitImage (Section 6) bei "Für wen?":

```yaml
# Bei "Unternehmen im Wandel" ergänzen:
description: "Vor Shop-Relaunch, ERP-Migration oder Neuausrichtung – der Workshop schafft Klarheit. Für die laufende Begleitung bietet sich die <a href='/ecommerce-beratung'>E-Commerce Beratung</a> an."
```

---

### Task 7: Sparring - Querlinks zu Workshop und Projektleitung

**Files:**
- Modify: `website/src/content/pages/de/ecommerce-sparring.yaml`

**Step 1: Link zu Workshop als Kick-off**

Im ContentSplitImage (Section 2) ergänzen:

```yaml
# Im Text ergänzen:
content: |
  ...Anders als bei einem einmaligen Audit oder Workshop bin ich als Sparringspartner dauerhaft an Ihrer Seite.
  <p>Für einen intensiven Start bietet sich ein <a href="/ecommerce-workshop">E-Commerce Workshop</a> an – danach geht es nahtlos ins Sparring über.</p>
```

**Step 2: Link zu Projektleitung bei größeren Projekten**

Im BentoGrid "Team & Organisation":

```yaml
description: "Recruiting, Teamaufbau, Agentur-Steuerung – die menschliche Seite des E-Commerce. Bei größeren Projekten bietet sich die <a href='/projektleitung'>Projektleitung</a> an."
```

---

### Task 8: Umsetzungsbegleitung - Querlinks zu Intensitätsstufen

**Files:**
- Modify: `website/src/content/pages/de/umsetzungsbegleitung.yaml`

**Step 1: Link zu Projektleitung als intensivere Alternative**

Im ContentSplitImage (Section 2) ergänzen:

```yaml
content: |
  ...Jemanden, der technische Konzepte hinterfragt, Vendor-Angebote einordnet und Business-Anforderungen in die Sprache der Entwickler übersetzt.
  <p>Wenn Sie mehr als Begleitung brauchen – echte Steuerung und Entscheidungsverantwortung – ist die <a href="/projektleitung">Projektleitung</a> oder das <a href="/interim-management">Interim Management</a> die richtige Wahl.</p>
```

**Step 2: Link zu Sparring als leichtere Alternative**

Im FAQ "Ab welcher Projektgröße macht Begleitung Sinn?":

```yaml
answer: "Als Faustregel: Bei Projekten ab 50.000€ Volumen oder ab 3 Monaten Laufzeit lohnt sich eine unabhängige Begleitung. Bei kleineren Projekten ist oft ein einmaliges <a href='/ecommerce-audit'>Audit</a> oder ein <a href='/ecommerce-sparring'>Sparring</a> sinnvoller."
```

---

### Task 9: Projektleitung - Querlinks zu Umsetzungsbegleitung und Interim

**Files:**
- Modify: `website/src/content/pages/de/projektleitung.yaml`

**Step 1: Link zu Umsetzungsbegleitung als leichtere Alternative**

Im FAQ "Ab welcher Projektgröße macht externe Projektleitung Sinn?":

```yaml
answer: "Sobald mehr als drei Parteien beteiligt sind oder das Projektbudget über 50.000 Euro liegt. Bei kleineren Projekten reicht oft ein gelegentliches <a href='/ecommerce-sparring'>Sparring</a> oder eine <a href='/umsetzungsbegleitung'>Umsetzungsbegleitung</a>. Im Erstgespräch klären wir, was für Ihr Projekt sinnvoll ist."
```

**Step 2: Link zu Interim Management als intensivere Alternative**

Im ContentSplitImage (Section 6):

```yaml
content: |
  ...Ein externer Projektleiter kann sich zu 100% auf das Projekt konzentrieren.
  <p>Wenn Sie darüber hinaus auch operative Führungsverantwortung für ein Team brauchen, ist das <a href="/interim-management">Interim Management</a> die passende Lösung.</p>
```

---

### Task 10: Interim Management - Querlinks zu leichteren Formaten

**Files:**
- Modify: `website/src/content/pages/de/interim-management.yaml`

**Step 1: Link zu Beratung und Projektleitung**

Im ContentSplitImage (Section 4) ergänzen:

```yaml
content: |
  ...Die Umsetzung liegt bei Ihrem Team.
  <p>Wenn Sie keine volle operative Verantwortung abgeben möchten, bieten sich die <a href="/ecommerce-beratung">E-Commerce Beratung</a> oder <a href="/projektleitung">Projektleitung</a> an – mit weniger Tiefe, aber auch weniger Commitment.</p>
```

---

### Task 11: Über Mich - Link zu Leistungen ergänzen

**Files:**
- Modify: `website/src/content/pages/de/ueber-mich.yaml`

**Step 1: Secondary CTA zu Leistungen**

Im Hero bereits vorhanden: `secondaryCtaHref: "/ecommerce-beratung"`

Besser wäre: `/leistungen` als Übersichtsseite.

```yaml
# In hero -> content:
secondaryCta: "Meine Leistungen"
secondaryCtaHref: "/leistungen"
```

---

### Task 12: Leistungen-Seite prüfen

**Files:**
- Modify: `website/src/content/pages/de/leistungen.yaml`

Die Leistungen-Seite hat bereits umfangreiche Links zu allen Services:
- ServicesShowcase → 5 Kernleistungen mit Links
- ServiceCards → Workshop & Sparring
- BentoGrid → Umsetzung, Projektleitung, Interim
- ServicesAccordion → Alle 9 Leistungen detailliert

**Empfehlung:** Keine Änderungen notwendig – die Seite ist bereits gut verlinkt.

---

## Zusammenfassung der Änderungen

| Datei | Änderungen | Priority |
|-------|------------|----------|
| `de/index.yaml` | +1 Service (Strategie), +1 Link (Leistungen) | HIGH |
| `de/ecommerce-audit.yaml` | +3 Links (Strategie, Sparring, Umsetzung) | HIGH |
| `de/ecommerce-strategie.yaml` | +4 Links (Audit, Tech, Sparring, Interim) | HIGH |
| `de/ecommerce-beratung.yaml` | +3 Links (Audit, Strategie, Tech) | HIGH |
| `de/technologieberatung.yaml` | +3 Links (Projektleitung, Umsetzung, Strategie) | MED |
| `de/ecommerce-workshop.yaml` | +2 Links (Sparring, Beratung) | MED |
| `de/ecommerce-sparring.yaml` | +2 Links (Workshop, Projektleitung) | MED |
| `de/umsetzungsbegleitung.yaml` | +4 Links (Projekt, Interim, Audit, Sparring) | MED |
| `de/projektleitung.yaml` | +3 Links (Sparring, Umsetzung, Interim) | MED |
| `de/interim-management.yaml` | +2 Links (Beratung, Projektleitung) | MED |
| `de/ueber-mich.yaml` | +1 Link (Leistungen statt Beratung) | LOW |

---

## SEO-Prinzipien angewandt

1. **Link Juice Flow:** Homepage → Leistungen/Service-Hubs → Detail-Seiten
2. **Thematische Cluster:** Seiten zum gleichen Thema verlinken sich gegenseitig
3. **Anchor-Texte:** Beschreibend und keyword-relevant (nicht "hier klicken")
4. **Kontext:** Links nur dort, wo sie inhaltlich Sinn machen
5. **Tiefe:** Maximal 3 Klicks von der Homepage zu jeder wichtigen Seite
6. **Bidirektionalität:** Wichtige Querlinks in beide Richtungen

---

**Plan complete and saved to `docs/plans/2026-01-02-internal-linking-optimization.md`.**

**Zwei Ausführungsoptionen:**

**1. Subagent-Driven (this session)** - Ich dispatche einen frischen Subagent pro Task, reviewe zwischen Tasks, schnelle Iteration

**2. Parallel Session (separate)** - Neue Session mit executing-plans öffnen, Batch-Ausführung mit Checkpoints

**Welchen Ansatz bevorzugen Sie?**
