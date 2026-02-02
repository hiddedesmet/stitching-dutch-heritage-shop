/**
 * Enhanced Lightbox with Tabs: Work, Certificate, Details
 * Features: Certificate flip (NL/EN), Work descriptions, Navigation
 */

(function() {
  'use strict';

  let currentWorkId = null;
  let currentCollection = [];
  let currentIndex = 0;
  let certificateFlipped = false;
  let currentTab = 'work'; // work, certificate, details

  // Create lightbox HTML structure
  function createLightbox() {
    const lightboxHTML = `
      <div id="lightbox" class="lightbox" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Close lightbox">&times;</button>

          <!-- Tabs -->
          <div class="lightbox-tabs">
            <button class="lightbox-tab active" data-tab="work">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span class="lang-nl">Werk</span>
              <span class="lang-en">Work</span>
            </button>
            <button class="lightbox-tab" data-tab="certificate">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span class="lang-nl">Certificaat</span>
              <span class="lang-en">Certificate</span>
            </button>
            <button class="lightbox-tab" data-tab="details">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span class="lang-nl">Details</span>
              <span class="lang-en">Details</span>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="lightbox-main">
            <!-- Work Tab -->
            <div class="lightbox-tab-content active" data-tab-content="work">
              <div class="lightbox-image-container">
                <img id="lightboxImage" src="" alt="" class="lightbox-image">
                <div class="lightbox-work-info">
                  <span id="lightboxArticleNumber" class="lightbox-article-number"></span>
                </div>
              </div>
            </div>

            <!-- Certificate Tab -->
            <div class="lightbox-tab-content" data-tab-content="certificate">
              <div class="lightbox-certificate-container">
                <button class="certificate-flip-btn" id="certificateFlipBtn">
                  <span class="lang-nl">Bekijk in Engels</span>
                  <span class="lang-en">View in English</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                  </svg>
                </button>

                <div class="certificate-flip-card" id="certificateCard">
                  <div class="certificate-side certificate-nl" id="certificateContentNL">
                    <!-- Dynamic NL certificate content -->
                  </div>
                  <div class="certificate-side certificate-en" id="certificateContentEN">
                    <!-- Dynamic EN certificate content -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Details Tab -->
            <div class="lightbox-tab-content" data-tab-content="details">
              <div class="lightbox-details-container">
                <div class="lightbox-details-image">
                  <img id="detailsImage" src="" alt="">
                </div>
                <div class="lightbox-details-content">
                  <h2 id="detailsTitle"></h2>
                  <div class="details-metadata">
                    <div class="detail-item">
                      <strong class="lang-nl">Afmetingen:</strong>
                      <strong class="lang-en">Dimensions:</strong>
                      <span id="detailsDimensions"></span>
                    </div>
                    <div class="detail-item">
                      <strong class="lang-nl">Jaar:</strong>
                      <strong class="lang-en">Year:</strong>
                      <span id="detailsYear"></span>
                    </div>
                    <div class="detail-item">
                      <strong class="lang-nl">Techniek:</strong>
                      <strong class="lang-en">Technique:</strong>
                      <span id="detailsTechnique"></span>
                    </div>
                  </div>
                  <div class="details-description" id="detailsDescription"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <button class="lightbox-nav lightbox-prev" id="lightboxPrev" aria-label="Previous work">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="lightbox-nav lightbox-next" id="lightboxNext" aria-label="Next work">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    initLightboxEvents();
  }

  // Initialize lightbox events
  function initLightboxEvents() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const overlay = lightbox.querySelector('.lightbox-overlay');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const flipBtn = document.getElementById('certificateFlipBtn');
    const tabs = lightbox.querySelectorAll('.lightbox-tab');

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);

    // Navigation
    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);

    // Certificate flip
    flipBtn.addEventListener('click', toggleCertificateFlip);

    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
  }

  // Switch tab
  function switchTab(tabName) {
    currentTab = tabName;

    // Update tab buttons
    const tabs = document.querySelectorAll('.lightbox-tab');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update tab content
    const contents = document.querySelectorAll('.lightbox-tab-content');
    contents.forEach(content => {
      if (content.getAttribute('data-tab-content') === tabName) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    // Load details if needed
    if (tabName === 'details' && currentWorkId) {
      loadWorkDetails(currentWorkId);
    }
  }

  // Load and render certificate content
  async function loadCertificateContent(workId) {
    if (!window.descriptionsManager) {
      console.error('DescriptionsManager not loaded');
      return;
    }

    const description = await window.descriptionsManager.getDescription(workId);
    const collectionId = workId.substring(0, 2).toLowerCase();
    const imagePath = `images/collections/${collectionId}/${workId}.jpg`;

    // Generate NL certificate
    const nlContent = generateCertificateHTML(workId, description, 'nl', imagePath);
    document.getElementById('certificateContentNL').innerHTML = nlContent;

    // Generate EN certificate
    const enContent = generateCertificateHTML(workId, description, 'en', imagePath);
    document.getElementById('certificateContentEN').innerHTML = enContent;
  }

  // Generate certificate HTML
  function generateCertificateHTML(workId, description, lang, imagePath) {
    const isNL = lang === 'nl';

    // Get title and description
    let title = workId;
    let descText = '';
    let dimensions = '-';
    let year = '-';
    let technique = '-';

    if (description && description.metadata) {
      title = isNL ? description.metadata.title_nl : description.metadata.title_en;
      dimensions = description.metadata.dimensions || '-';
      year = description.metadata.year || '-';
      technique = description.metadata.technique || '-';
    }

    if (description) {
      descText = isNL ? description.description_nl : description.description_en;
    }

    // Split description into paragraphs
    const paragraphs = descText ? descText.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('') : '';

    return `
      <div class="certificate-html">
        <div class="certificate-inner">
          <!-- Logo in decorative frame -->
          <div class="certificate-logo-frame">
            <img src="images/dutch-heritage-logo-${lang}.svg" alt="Stitching Dutch Heritage" class="certificate-logo">
          </div>

          <!-- Title -->
          <h2 class="certificate-title">${title || workId}</h2>

          <!-- Description text -->
          <div class="certificate-description">
            ${paragraphs || `<p><em>${isNL ? 'Beschrijving wordt geladen...' : 'Loading description...'}</em></p>`}
          </div>

          <!-- Dutch Houses at bottom -->
          <div class="certificate-houses">
            <img src="images/${isNL ? 'dutch-canal-houses' : 'dutch-houses-windmill'}.png" alt="Dutch Houses" class="houses-img">
          </div>
        </div>
      </div>
    `;
  }

  // Load work details
  async function loadWorkDetails(workId) {
    if (!window.descriptionsManager) {
      console.error('DescriptionsManager not loaded');
      return;
    }

    const description = await window.descriptionsManager.getDescription(workId);
    if (!description) {
      document.getElementById('detailsDescription').innerHTML = `
        <p class="lang-nl"><em>Beschrijving niet beschikbaar</em></p>
        <p class="lang-en"><em>Description not available</em></p>
      `;
      return;
    }

    const currentLang = document.body.classList.contains('lang-nl') ? 'nl' : 'en';

    // Update title
    const titleKey = currentLang === 'nl' ? 'title_nl' : 'title_en';
    document.getElementById('detailsTitle').textContent = description.metadata[titleKey] || workId;

    // Update metadata
    document.getElementById('detailsDimensions').textContent = description.metadata.dimensions || '-';
    document.getElementById('detailsYear').textContent = description.metadata.year || '-';
    document.getElementById('detailsTechnique').textContent = description.metadata.technique || '-';

    // Update description
    const descriptionHTML = window.descriptionsManager.formatDescriptionHTML(description, currentLang);
    document.getElementById('detailsDescription').innerHTML = descriptionHTML;

    // Update image
    const collectionId = workId.substring(0, 2).toLowerCase();
    document.getElementById('detailsImage').src = `images/collections/${collectionId}/${workId}.jpg`;
  }

  // Toggle certificate flip
  function toggleCertificateFlip() {
    certificateFlipped = !certificateFlipped;
    const card = document.getElementById('certificateCard');
    const flipBtn = document.getElementById('certificateFlipBtn');

    if (certificateFlipped) {
      // Now showing English certificate, button should offer to view Dutch
      card.classList.add('flipped');
      flipBtn.querySelector('.lang-nl').textContent = 'Bekijk in Nederlands';
      flipBtn.querySelector('.lang-en').textContent = 'View in Dutch';
    } else {
      // Now showing Dutch certificate, button should offer to view English
      card.classList.remove('flipped');
      flipBtn.querySelector('.lang-nl').textContent = 'Bekijk in Engels';
      flipBtn.querySelector('.lang-en').textContent = 'View in English';
    }
  }

  // Open lightbox
  function openLightbox(workId, collectionGroup) {
    console.log('🔍 Opening lightbox for:', workId, 'in collection:', collectionGroup);

    currentWorkId = workId;
    currentCollection = Array.from(document.querySelectorAll(`[data-lightbox="${collectionGroup}"]`));
    currentIndex = currentCollection.findIndex(item => item.getAttribute('data-work-id') === workId);

    console.log('📊 Collection items found:', currentCollection.length, 'Current index:', currentIndex);

    updateLightboxContent();

    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    console.log('✅ Lightbox opened, active class added');

    // Debug: Check if tab content is visible
    const activeTabContent = document.querySelector('.lightbox-tab-content.active');
    if (activeTabContent) {
      const styles = window.getComputedStyle(activeTabContent);
      console.log('🎨 Active tab content styles:', {
        opacity: styles.opacity,
        visibility: styles.visibility,
        display: styles.display,
        height: styles.height,
        zIndex: styles.zIndex
      });
    } else {
      console.error('❌ No active tab content found!');
    }
  }

  // Update lightbox content
  function updateLightboxContent() {
    if (!currentWorkId) {
      console.error('❌ No currentWorkId set!');
      return;
    }

    const collectionId = currentWorkId.substring(0, 2).toLowerCase();
    console.log('🖼️ Updating lightbox content for:', currentWorkId, 'Collection:', collectionId);

    // Update work image
    const workImagePath = `images/collections/${collectionId}/${currentWorkId}.jpg`;
    document.getElementById('lightboxImage').src = workImagePath;
    document.getElementById('lightboxImage').alt = `Work ${currentWorkId}`;
    document.getElementById('lightboxArticleNumber').textContent = currentWorkId;
    console.log('  ✓ Work image set to:', workImagePath);

    // Load and render dynamic certificates
    loadCertificateContent(currentWorkId);
    console.log('  ✓ Loading dynamic certificates for:', currentWorkId);

    // Reset certificate flip
    certificateFlipped = false;
    document.getElementById('certificateCard').classList.remove('flipped');

    // Load details if on details tab
    if (currentTab === 'details') {
      loadWorkDetails(currentWorkId);
    }

    console.log('✅ Content update complete');
  }

  // Close lightbox
  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');

    // Move focus outside the lightbox before hiding to avoid aria-hidden warning
    const focusTarget = document.querySelector('.nav-brand') || document.body;
    focusTarget.focus({ preventScroll: true });

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Reset to work tab
    switchTab('work');
  }

  // Show previous work
  function showPrevious() {
    if (currentIndex > 0) {
      currentIndex--;
      currentWorkId = currentCollection[currentIndex].getAttribute('data-work-id');
      updateLightboxContent();
    }
  }

  // Show next work
  function showNext() {
    if (currentIndex < currentCollection.length - 1) {
      currentIndex++;
      currentWorkId = currentCollection[currentIndex].getAttribute('data-work-id');
      updateLightboxContent();
    }
  }

  // Keyboard navigation
  function handleKeyPress(event) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch(event.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrevious();
        break;
      case 'ArrowRight':
        showNext();
        break;
      case '1':
        switchTab('work');
        break;
      case '2':
        switchTab('certificate');
        break;
      case '3':
        switchTab('details');
        break;
    }
  }

  // Initialize lightbox when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }

  function initLightbox() {
    console.log('🚀 Initializing enhanced lightbox...');
    createLightbox();
    console.log('✅ Lightbox created');

    // Attach click handlers to collection items
    document.addEventListener('click', function(event) {
      const item = event.target.closest('[data-lightbox]');
      if (item) {
        event.preventDefault();
        const workId = item.getAttribute('data-work-id');
        const collectionGroup = item.getAttribute('data-lightbox');
        console.log('🖱️ Click detected on work item:', workId);
        openLightbox(workId, collectionGroup);
      }
    });

    // Count clickable items
    const clickableItems = document.querySelectorAll('[data-lightbox]');
    console.log('📸 Found', clickableItems.length, 'clickable work items');
  }

})();
