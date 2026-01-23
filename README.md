# Stitching Dutch Heritage - B2B Wholesale Website

A professional B2B wholesale catalog for authentic Dutch hand-stitched embroidery works, designed for museum shops, heritage parks, and cultural festivals.

## 🌐 Live Website

[https://stitchingdutchheritage.com](https://stitchingdutchheritage.com)

## 📋 Overview

This website showcases unique collections of authentic Dutch embroidery works, each 50-60 years old, professionally restored and ready for wholesale purchase. The site features:

- **Wholesale Collections**: 5 themed collections (Royal House, Dutch Heritage, Traditional Arts, Nature & Arts, Folk Sampler)
- **Certificates of Authenticity**: Bilingual (NL/EN) certificates for each work
- **Professional B2B Flow**: Order request system with shopping cart
- **Bilingual Support**: Full NL/EN language toggle
- **Responsive Design**: Mobile-first, works on all devices

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/stitching-dutch-heritage-shop.git
cd stitching-dutch-heritage-shop
```

### 2. Add Your Images

You need to populate the `images/` folder with your actual photos:

#### Hero Image
- `images/hero/embroidery-collection.jpg` - Background for homepage hero section

#### Collection Images
For each collection, add thumbnail and full-size images:
- `images/collections/rh/RH001-thumb.jpg` through `RH005-thumb.jpg`
- `images/collections/rh/RH001.jpg` through `RH005.jpg`
- Repeat for `dh/`, `ta/`, `na/`, `fs/` folders

#### Certificates
Add certificate images for both languages:
- `images/certificates/nl/RH001-NL.jpg` (and all other work IDs)
- `images/certificates/en/RH001-EN.jpg` (and all other work IDs)

#### Media/Press
- `images/media/newspaper-front-page.jpg`
- `images/media/newspaper-inside-page.jpg`

#### Icons (Optional)
You can use the default SVG icons or add custom PNG/SVG icons:
- `images/icons/authentic.svg`
- `images/icons/handmade.svg`
- `images/icons/heritage.svg`
- `images/icons/sustainable.svg`

### 3. Set Up Formspree (Contact Form)

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account (50 submissions/month)
3. Create a new form and get your form ID
4. Open `contact.html` and replace `YOUR_FORMSPREE_ID` with your actual form ID:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
   ```

### 4. Configure GitHub Pages

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial B2B website setup"
   git push origin main
   ```

2. Go to your repository settings on GitHub
3. Navigate to **Pages** section
4. Under **Source**, select `main` branch and `/root` folder
5. Click **Save**

### 5. Custom Domain (Optional)

If you want to use `stitchingdutchheritage.com`:

1. In your domain registrar (where you bought the domain), add these DNS records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

2. In GitHub Pages settings, enter your custom domain: `stitchingdutchheritage.com`
3. Wait for DNS propagation (can take 24-48 hours)

The `CNAME` file in the root is already configured with `stitchingdutchheritage.com`.

## 📁 Project Structure

```
/
├── index.html                          # Homepage
├── wholesale-collections.html          # Collections catalog
├── certificates.html                   # Certificates page
├── media.html                          # Press/media page
├── contact.html                        # Contact form
├── CNAME                              # Custom domain configuration
├── css/
│   ├── main.css                       # Global styles & variables
│   ├── navigation.css                 # Navigation & menu
│   ├── hero.css                       # Hero section styling
│   └── collections.css                # Collections page styling
├── js/
│   ├── main.js                        # Navigation & language toggle
│   ├── lightbox.js                    # Image lightbox with certificate flip
│   └── order-form.js                  # Shopping cart & order management
└── images/
    ├── hero/                          # Hero background images
    ├── icons/                         # Feature icons
    ├── collections/                   # Collection work images
    │   ├── rh/                        # Royal House Collection
    │   ├── dh/                        # Dutch Heritage Collection
    │   ├── ta/                        # Traditional Arts Collection
    │   ├── na/                        # Nature & Arts Collection
    │   └── fs/                        # Folk Sampler Collection
    ├── certificates/                  # Certificate images
    │   ├── nl/                        # Dutch certificates
    │   └── en/                        # English certificates
    └── media/                         # Press/media images
```

## 🎨 Customization

### Colors

Edit CSS variables in `css/main.css`:

```css
:root {
  --color-primary: #1e3a5f;        /* Deep blue */
  --color-secondary: #c85a3e;      /* Terracotta */
  --color-accent: #b8860b;         /* Goldenrod */
  /* ... */
}
```

### Collections

To add/modify collections, edit `wholesale-collections.html`:
- Each collection uses the `.collection-card` structure
- Update article numbers (e.g., RH001-RH005)
- Update collection names and prices
- Ensure corresponding images exist in `images/collections/`

### Language Content

All text has bilingual support with `.lang-nl` and `.lang-en` classes:
```html
<span class="lang-nl">Nederlandse tekst</span>
<span class="lang-en">English text</span>
```

### Collection Prices

Current default: €350 per collection (5 works)
To change, edit the `data-price` attribute in wholesale-collections.html:
```html
<button class="btn-add-to-order" data-price="350">
```

## 🛠️ Features

### Bilingual Toggle
- Language preference saved in localStorage
- Instant switching between NL/EN
- Automatic language detection

### Order Cart
- Add collections to cart from wholesale page
- Cart persists in localStorage
- Auto-populate contact form with selections

### Certificate Flip
- Interactive NL ↔ EN certificate viewing
- Smooth 3D flip animation
- Available in lightbox and certificates page

### Lightbox
- Click any work to view full-size
- Navigate between works in collection
- View certificate alongside work
- Keyboard navigation (arrows, ESC)

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Touch-friendly on tablets/phones

## 📝 Content Management

### Adding a New Collection

1. Create a new folder in `images/collections/` (e.g., `nc/` for "New Collection")
2. Add 5 thumbnail and full-size images (NC001-NC005)
3. Add certificates in `images/certificates/nl/` and `en/`
4. Copy an existing collection block in `wholesale-collections.html`
5. Update:
   - Collection ID (data-collection-id="NC")
   - Collection name
   - Article numbers (NC001-NC005)
   - Image paths

### Updating Prices

Global price changes can be done by searching for `€350` in `wholesale-collections.html` and updating all instances.

### Adding Media Coverage

1. Add scans to `images/media/`
2. Copy the `.media-article` block in `media.html`
3. Update image paths, publication name, date, and translation

## 🧪 Testing

### Before Going Live

- [ ] All images loaded correctly
- [ ] Language toggle works on all pages
- [ ] Mobile menu functions properly
- [ ] Order cart adds/removes collections
- [ ] Contact form submits successfully (test with Formspree)
- [ ] Lightbox opens and navigates correctly
- [ ] Certificate flip animation works
- [ ] All internal links work
- [ ] Responsive design tested on mobile/tablet

### Browsers to Test
- Chrome/Edge
- Firefox
- Safari (desktop & iOS)

### Test Order Flow
1. Browse wholesale-collections.html
2. Add 2-3 collections to cart
3. Navigate to contact.html
4. Verify cart items appear in order details field
5. Submit form and check Formspree email

## 🌍 SEO & Performance

### Meta Tags
Each page has appropriate:
- `<title>`
- `<meta name="description">`
- `<meta name="keywords">`
- Open Graph tags for social sharing

### Image Optimization
For best performance, optimize images before uploading:
- Use WebP format where possible
- Compress JPEGs to 80-85% quality
- Thumbnails: max 400x400px
- Full images: max 1200x1200px

### Accessibility
- All images have `alt` attributes
- Form labels properly associated
- Keyboard navigation supported
- ARIA labels on interactive elements

## 📊 Analytics (Optional)

To add Google Analytics:

1. Get your GA4 measurement ID
2. Add to `<head>` of all HTML files:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🚨 Troubleshooting

### Images not loading
- Check file paths are correct (case-sensitive)
- Verify images exist in correct folders
- Check file extensions (.jpg vs .jpeg)

### Contact form not working
- Verify Formspree ID is correct in contact.html
- Check Formspree dashboard for blocked submissions
- Test form submission in incognito mode

### GitHub Pages not updating
- Check GitHub Actions tab for build errors
- Clear browser cache
- Wait 5-10 minutes for propagation

### Custom domain not working
- Verify DNS records are correct
- Check CNAME file contains correct domain
- Wait 24-48 hours for DNS propagation

## 📞 Support

For questions or issues:
- Email: [your-email@example.com]
- Website: [https://stitchingdutchheritage.com/contact.html](https://stitchingdutchheritage.com/contact.html)

## 📄 License

© 2026 Stitching Dutch Heritage. All rights reserved.

## 🙏 Credits

Built with:
- Pure HTML, CSS, JavaScript (no frameworks)
- [Formspree](https://formspree.io/) for form handling
- Hosted on [GitHub Pages](https://pages.github.com/)

---

**Ready to launch?** Follow the Quick Start guide above and start showcasing your beautiful Dutch heritage to the world! 🇳🇱
