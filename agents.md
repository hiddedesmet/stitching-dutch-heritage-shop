# AI Agents - Stitching Dutch Heritage

Dit document beschrijft hoe AI agents effectief kunnen werken met dit project.

## Speckit Agents

Dit project bevat voorgedefinieerde Speckit agents in `.github/agents/` voor feature development:

| Agent | Beschrijving |
|-------|--------------|
| `speckit.analyze` | Analyseer een feature request |
| `speckit.clarify` | Verduidelijk requirements |
| `speckit.specify` | Maak gedetailleerde specificaties |
| `speckit.plan` | Plan de implementatie |
| `speckit.tasks` | Genereer takenlijst |
| `speckit.checklist` | Maak review checklists |
| `speckit.implement` | Voer de implementatie uit |
| `speckit.taskstoissues` | Converteer taken naar GitHub issues |

### Gebruik
De agents worden aangeroepen via VS Code GitHub Copilot Chat of andere AI IDE integraties.

---

## Algemene AI Agent Richtlijnen

### Project Karakteristieken

Dit is een **statische website** zonder build pipeline:
- Geen Node.js, npm, of framework
- Directe HTML/CSS/JS bestanden
- Geen compilatie of transpilatie nodig
- Wijzigingen zijn direct zichtbaar na refresh

### Tweetaligheid

**Kritiek**: Alle user-facing content moet tweetalig zijn (NL/EN):

```html
<!-- Correct -->
<h2>
  <span class="lang-nl">Titel in het Nederlands</span>
  <span class="lang-en">Title in English</span>
</h2>

<!-- Fout - alleen één taal -->
<h2>Title</h2>
```

Bij het toevoegen of wijzigen van tekst:
1. Controleer of beide talen aanwezig zijn
2. Gebruik consistente `lang-nl` en `lang-en` classes
3. Test de language toggle functionaliteit

### CSS Variabelen

Gebruik altijd de gedefinieerde CSS variabelen uit `css/main.css`:

```css
/* Correct */
color: var(--color-primary);
background: var(--color-cream);

/* Fout - hardcoded kleuren */
color: #1e3a5f;
background: #f9f6f0;
```

### Bestandswijzigingen

#### HTML Pagina's
- Behoud de consistente header/nav structuur
- Footer moet identiek zijn op alle pagina's
- Include alle benodigde CSS en JS bestanden

#### CSS
- Voeg nieuwe styles toe aan het relevante bestand:
  - `main.css` - globale styles, variabelen, utilities
  - `navigation.css` - header, nav, menu
  - `hero.css` - hero sections
  - `collections.css` - wholesale collecties pagina
  - `lightbox-enhanced.css` - lightbox functionaliteit

#### JavaScript
- Vanilla JS only (geen jQuery, React, etc.)
- Alle interactieve functionaliteit in `js/main.js`
- Lucide icons initialiseren: `lucide.createIcons()`

### Afbeeldingen

Naamgeving conventies:
- Collectie items: `[CODE][NNN].jpg` en `[CODE][NNN]-thumb.jpg`
- Certificaten: `[CODE][NNN]-NL.jpg` en `[CODE][NNN]-EN.jpg`
- Codes: RH, DH, TA, NA, FS

Locaties:
- `/images/collections/[code]/` - collectie afbeeldingen
- `/images/certificates/nl/` - Nederlandse certificaten
- `/images/certificates/en/` - Engelse certificaten

### Testing

Geen automated tests. Handmatig testen:
1. Open in browser met HTTP server
2. Test language toggle op elke pagina
3. Test responsive op mobile/tablet breakpoints
4. Test alle interactieve elementen (lightbox, winkelwagen, formulier)

### Veelvoorkomende Taken

#### Nieuwe sectie toevoegen
1. Voeg HTML toe met beide taalversies
2. Voeg CSS toe in relevant bestand
3. Test responsive gedrag
4. Test language toggle

#### Prijzen wijzigen
- Zoek `data-price` attributen in `wholesale-collections.html`
- Update alle instanties consistent
- Update eventuele hardcoded prijzen in tekst

#### Nieuwe collectie toevoegen
1. Maak folder in `/images/collections/[code]/`
2. Voeg 5 afbeeldingen toe (thumb + full)
3. Voeg certificaten toe in beide talen
4. Kopieer collectie HTML blok en pas aan

### Belangrijke Don'ts

- **Geen** package.json of npm dependencies toevoegen
- **Geen** build tools of bundlers introduceren
- **Geen** frameworks (React, Vue, etc.) toevoegen
- **Geen** inline styles gebruiken (behalve voor dynamische waarden)
- **Geen** hardcoded kleuren in CSS
- **Geen** content in slechts één taal

### Git Workflow

- Branch naming: `feature/[beschrijving]` of `fix/[beschrijving]`
- Commit messages in het Engels
- Test lokaal voor push
- Main branch is productie (GitHub Pages)
