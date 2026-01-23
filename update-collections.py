#!/usr/bin/env python3
"""
Script to update wholesale-collections.html with 6 collections
"""

# Collection data based on user's packages
collections = [
    {
        'id': 'rh',
        'code': 'RH',
        'name_nl': 'Koninklijk Verhaal',
        'name_en': 'Royal Story',
        'lightbox': 'royal-house',
        'count': 5,
        'price': 350
    },
    {
        'id': 'zs',
        'code': 'ZS',
        'name_nl': 'Zaanse Taferelen',
        'name_en': 'Zaan Scenes',
        'lightbox': 'zaanse-schans',
        'count': 4,  # ZS005 missing
        'price': 350
    },
    {
        'id': 'wm',
        'code': 'WM',
        'name_nl': 'Molens & Meesters van de Wind',
        'name_en': 'Windmills – Masters of the Wind',
        'lightbox': 'windmills',
        'count': 4,  # WM005 missing
        'price': 350
    },
    {
        'id': 'cs',
        'code': 'CS',
        'name_nl': 'Stad & Straat',
        'name_en': 'City & Street',
        'lightbox': 'city-street',
        'count': 2,  # CS003-CS005 missing
        'price': 350
    },
    {
        'id': 'sm',
        'code': 'SM',
        'name_nl': 'Nederland in Stof',
        'name_en': 'Samplers & Identity',
        'lightbox': 'samplers',
        'count': 5,
        'price': 350
    },
    {
        'id': 'fl',
        'code': 'FL',
        'name_nl': 'Van Alles Wat',
        'name_en': 'Folk Life & Tradition',
        'lightbox': 'folk-life',
        'count': 2,  # FL001-FL003 missing
        'price': 350
    }
]

def generate_collection_card(col):
    """Generate HTML for a single collection card"""
    images_html = ''
    for i in range(1, col['count'] + 1):
        work_id = f"{col['code']}{i:03d}"
        images_html += f'''            <div class="collection-image-item" data-work-id="{work_id}" data-lightbox="{col['lightbox']}">
              <img src="images/collections/{col['id']}/{work_id}-thumb.jpg" alt="{col['name_en']} Work {work_id}" loading="lazy">
              <div class="article-number">{work_id}</div>
            </div>
'''

    # Note about missing works
    missing_note = ''
    if col['count'] < 5:
        missing_count = 5 - col['count']
        missing_works = ', '.join([f"{col['code']}{i:03d}" for i in range(col['count'] + 1, 6)])
        missing_note = f'''          <div class="collection-note" style="color: var(--color-text-light); font-size: 0.875rem; font-style: italic; margin-top: var(--spacing-sm);">
            <span class="lang-nl">⚠ Let op: {missing_count} werk{'en' if missing_count > 1 else ''} nog niet beschikbaar ({missing_works})</span>
            <span class="lang-en">⚠ Note: {missing_count} work{'s' if missing_count > 1 else ''} not yet available ({missing_works})</span>
          </div>
'''

    collection_html = f'''      <!-- Collection: {col['name_en']} -->
      <article class="collection-card" data-collection-id="{col['code']}">
        <div class="collection-header">
          <h2>
            <span class="lang-nl">{col['name_nl']}</span>
            <span class="lang-en">{col['name_en']}</span>
          </h2>
          <p class="collection-article-range">{col['code']}001–{col['code']}{'%03d' % col['count']}</p>
        </div>

        <div class="collection-body">
          <div class="collection-images">
{images_html}          </div>

          <div class="collection-details">
            <div class="collection-detail-item">
              <span class="collection-detail-label lang-nl">Wholesale Prijs</span>
              <span class="collection-detail-label lang-en">Wholesale Price</span>
              <span class="collection-detail-value collection-price">€{col['price']}</span>
            </div>
            <div class="collection-detail-item">
              <span class="collection-detail-label lang-nl">Minimum Order</span>
              <span class="collection-detail-label lang-en">Minimum Order</span>
              <span class="collection-detail-value lang-nl">1 pakket</span>
              <span class="collection-detail-value lang-en">1 package</span>
            </div>
            <div class="collection-detail-item">
              <span class="collection-detail-label">Lead Time</span>
              <span class="collection-detail-value lang-nl">Binnen 1 week</span>
              <span class="collection-detail-value lang-en">Ships within 1 week</span>
            </div>
            <div class="collection-detail-item">
              <span class="collection-detail-label">Includes</span>
              <span class="collection-detail-value lang-nl">{col['count']} authentieke borduurwerken</span>
              <span class="collection-detail-value lang-en">{col['count']} authentic embroideries</span>
            </div>
          </div>
        </div>
{missing_note}
        <div class="collection-footer">
          <p class="collection-extra-info lang-nl">
            Elk werk wordt geleverd met een tweetalig info-kaartje (NL/EN)
          </p>
          <p class="collection-extra-info lang-en">
            Each work comes with a bilingual info card (NL/EN)
          </p>
          <button class="btn-add-to-order" data-collection="{col['name_nl']} / {col['name_en']}" data-price="{col['price']}" data-id="{col['code']}">
            <span class="lang-nl">Toevoegen aan Order</span>
            <span class="lang-en">Add to Order Request</span>
          </button>
        </div>
      </article>

'''
    return collection_html

# Generate all collection cards
collections_html = ''
for col in collections:
    collections_html += generate_collection_card(col)

# Read the original file to preserve header and footer
with open('wholesale-collections.html', 'r', encoding='utf-8') as f:
    original = f.read()

# Find the start and end markers
start_marker = '  <!-- Collections Grid -->'
end_marker = '  <!-- Authenticity & Availability Notes -->'

start_idx = original.find(start_marker)
end_idx = original.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Error: Could not find collection grid markers")
    exit(1)

# Extract header and footer
header = original[:start_idx + len(start_marker)]
footer = original[end_idx:]

# Build new content
new_content = header + '''
  <section class="collections-grid">
    <div class="container-wide">

''' + collections_html + '''    </div>
  </section>

''' + footer

# Write the new file
with open('wholesale-collections.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ wholesale-collections.html updated with 6 collections!")
print("\n📋 Collection summary:")
for col in collections:
    status = f"{col['count']}/5" if col['count'] < 5 else "Complete"
    print(f"  {col['code']} - {col['name_nl']}: {status}")
