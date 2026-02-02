# Stitching Dutch Heritage - Project Context

## Project Overzicht

Dit is een B2B wholesale website voor authentieke Nederlandse borduurwerken, gericht op:
- Museumwinkels
- Erfgoedparken
- Culturele festivals

**Live website**: https://stitchingdutchheritage.com

## Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript (geen frameworks)
- **Hosting**: GitHub Pages
- **Forms**: Formspree voor contactformulier
- **Icons**: Lucide Icons (via CDN)
- **Taal**: Tweetalig (NL/EN) met language toggle

## Bestandsstructuur

```
/
├── index.html                 # Homepage
├── wholesale-collections.html # Collecties catalogus
├── certificates.html          # Certificaten pagina
├── media.html                 # Pers/media pagina
├── contact.html               # Contactformulier
├── css/
│   ├── main.css              # Globale styles & CSS variabelen
│   ├── navigation.css        # Navigatie & menu
│   ├── hero.css              # Hero section styling
│   ├── collections.css       # Collections pagina styling
│   └── lightbox-enhanced.css # Lightbox styling
├── js/
│   └── main.js               # Navigatie, taal toggle & interacties
└── images/
    ├── hero/                 # Hero achtergrondafbeeldingen
    ├── collections/          # Collectie afbeeldingen per thema
    │   ├── rh/              # Royal House Collection
    │   ├── dh/              # Dutch Heritage Collection
    │   ├── ta/              # Traditional Arts Collection
    │   ├── na/              # Nature & Arts Collection
    │   └── fs/              # Folk Sampler Collection
    ├── certificates/         # Certificaat afbeeldingen
    │   ├── nl/              # Nederlandse certificaten
    │   └── en/              # Engelse certificaten
    └── media/               # Pers/media afbeeldingen
```

## Code Conventies

### HTML
- Tweetalige content gebruikt `lang-nl` en `lang-en` classes:
  ```html
  <span class="lang-nl">Nederlandse tekst</span>
  <span class="lang-en">English text</span>
  ```
- Consistente BEM-achtige class naming
- Semantische HTML elementen (section, article, nav, etc.)

### CSS
- CSS variabelen gedefinieerd in `:root` in main.css
- Kleurenpalet:
  - Primary: `#1e3a5f` (diep blauw)
  - Secondary: `#c85a3e` (terracotta)
  - Accent: `#b8860b` (goudbruin)
- Mobile-first responsive design
- Breakpoints: 480px, 768px, 1024px

### JavaScript
- Vanilla JavaScript (geen jQuery of frameworks)
- Event delegation waar mogelijk
- LocalStorage voor taalvoorkeur en winkelwagen

## Collecties

5 thematische collecties, elk met 5 borduurwerken:
1. **Royal House (RH)** - Koninklijke thema's
2. **Dutch Heritage (DH)** - Nederlands erfgoed
3. **Traditional Arts (TA)** - Traditionele kunst
4. **Nature & Arts (NA)** - Natuur & kunst
5. **Folk Sampler (FS)** - Volkskunst merklappen

Artikel nummering: `[COLLECTIE_CODE][001-005]` (bijv. RH001, DH003)

## Belangrijke Features

1. **Taal Toggle**: Instant wisselen tussen NL/EN, opgeslagen in localStorage
2. **Winkelwagen**: Collections toevoegen, persistent in localStorage
3. **Lightbox**: Afbeeldingen bekijken met certificaat flip animatie
4. **Responsive**: Mobile-first, touch-friendly

## Development Richtlijnen

- **Geen build tools nodig** - direct HTML/CSS/JS bewerken
- **Test lokaal** met een simple HTTP server (bijv. `python -m http.server`)
- **Afbeeldingen optimaliseren** voor web (WebP waar mogelijk, max 1200px)
- **Toegankelijkheid**: Alt teksten, ARIA labels, keyboard navigatie

## Belangrijke Notities

- Prijzen staan in de HTML (`data-price` attributen), momenteel €350 per collectie
- Formspree ID moet geconfigureerd worden in contact.html
- CNAME bestand bevat het custom domain
- Test bestanden (test-*.html, *-diagnostic.html) zijn voor development/debugging
