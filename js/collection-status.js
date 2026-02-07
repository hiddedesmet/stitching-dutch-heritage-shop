/**
 * Collection Status Management
 * Uses Firebase Realtime Database to track collection availability
 * Statuses: available | reserved | sold
 */

(function() {
  'use strict';

  // Firebase configuration - loaded from js/config.js
  const FIREBASE_CONFIG = window.SITE_CONFIG && window.SITE_CONFIG.firebase ? window.SITE_CONFIG.firebase : {};

  const STATUS_LABELS = {
    available: { nl: 'Te koop', en: 'Available' },
    reserved: { nl: 'Gereserveerd', en: 'Reserved' },
    sold: { nl: 'Verkocht', en: 'Sold' }
  };

  const STATUS_COLORS = {
    available: '#4a9c59',
    reserved: '#d4860b',
    sold: '#c0392b'
  };

  let db = null;

  function initFirebase() {
    if (FIREBASE_CONFIG.apiKey === 'YOUR_FIREBASE_API_KEY') {
      console.log('Collection status: Firebase not configured yet');
      return false;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    db = firebase.database();
    return true;
  }

  function addStatusStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .collection-card {
        position: relative;
      }

      .collection-status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #fff;
        margin-bottom: 12px;
      }

      .collection-status-badge::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
        opacity: 0.8;
      }

      .collection-status-badge.status-available {
        background-color: ${STATUS_COLORS.available};
      }

      .collection-status-badge.status-reserved {
        background-color: ${STATUS_COLORS.reserved};
      }

      .collection-status-badge.status-sold {
        background-color: ${STATUS_COLORS.sold};
      }

      .collection-card.status-sold {
        opacity: 0.6;
      }

      .collection-card.status-sold .collection-images img {
        filter: grayscale(40%);
      }

      .collection-card.status-reserved .btn-add-to-order,
      .collection-card.status-sold .btn-add-to-order {
        background-color: #999 !important;
        cursor: not-allowed;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  function updateCollectionUI(collectionId, status) {
    const card = document.querySelector(`[data-collection-id="${collectionId}"]`);
    if (!card) return;

    // Remove existing status classes
    card.classList.remove('status-available', 'status-reserved', 'status-sold');
    card.classList.add(`status-${status}`);

    // Remove existing badge
    const existingBadge = card.querySelector('.collection-status-badge');
    if (existingBadge) existingBadge.remove();

    // Create status badge
    const badge = document.createElement('div');
    badge.className = `collection-status-badge status-${status}`;

    const labelNl = document.createElement('span');
    labelNl.className = 'lang-nl';
    labelNl.textContent = STATUS_LABELS[status].nl;

    const labelEn = document.createElement('span');
    labelEn.className = 'lang-en';
    labelEn.textContent = STATUS_LABELS[status].en;

    badge.appendChild(labelNl);
    badge.appendChild(labelEn);

    // Insert badge at top of collection header
    const header = card.querySelector('.collection-header');
    if (header) {
      header.insertBefore(badge, header.firstChild);
    }

    // Disable/enable the order button
    const orderBtn = card.querySelector('.btn-add-to-order');
    if (orderBtn) {
      if (status === 'reserved' || status === 'sold') {
        orderBtn.disabled = true;
        orderBtn.classList.add('status-disabled');
      } else {
        // Only re-enable if not already in cart
        if (!orderBtn.classList.contains('added')) {
          orderBtn.disabled = false;
        }
        orderBtn.classList.remove('status-disabled');
      }
    }

  }

  function listenForStatusChanges() {
    if (!db) return;

    db.ref('collections').on('value', (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      Object.keys(data).forEach(collectionId => {
        const status = data[collectionId].status || 'available';
        updateCollectionUI(collectionId, status);
      });
    });
  }

  // Initialize
  function init() {
    addStatusStyles();

    if (initFirebase()) {
      listenForStatusChanges();
      console.log('Collection status: Firebase connected');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for admin page
  window.collectionStatus = {
    updateStatus: function(collectionId, status) {
      if (!db) return Promise.reject('Firebase not initialized');
      return db.ref(`collections/${collectionId}`).set({
        status: status,
        updated: new Date().toISOString()
      });
    },
    getStatuses: function() {
      if (!db) return Promise.reject('Firebase not initialized');
      return db.ref('collections').once('value').then(snap => snap.val());
    },
    initializeDefaults: function() {
      if (!db) return Promise.reject('Firebase not initialized');
      const defaults = {};
      document.querySelectorAll('[data-collection-id]').forEach(card => {
        const id = card.getAttribute('data-collection-id');
        defaults[id] = { status: 'available', updated: new Date().toISOString() };
      });
      return db.ref('collections').set(defaults);
    }
  };
})();
