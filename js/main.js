/**
 * Main JavaScript for Stitching Dutch Heritage
 * Handles navigation, language toggle, and global functionality
 */

(function() {
  'use strict';

  // ================================
  // Mobile Navigation Toggle
  // ================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');

      // Update aria-expanded for accessibility
      const isExpanded = navToggle.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);

      if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ================================
  // Language Toggle
  // ================================
  const langButtons = document.querySelectorAll('.lang-toggle button[data-lang]');
  const body = document.body;

  // Get saved language from localStorage or default to 'en'
  let currentLang = localStorage.getItem('language') || 'en';

  // Set initial language
  setLanguage(currentLang);

  // Add click listeners to language buttons
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  function setLanguage(lang) {
    currentLang = lang;

    // Update body class
    body.className = body.className.replace(/lang-\w+/g, '');
    body.classList.add(`lang-${lang}`);

    // Update button states
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Save to localStorage
    localStorage.setItem('language', lang);

    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
  }

  // ================================
  // Active Navigation Link
  // ================================
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');

      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveNavLink();

  // ================================
  // Smooth Scroll for Anchor Links
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId !== '#') {
        e.preventDefault();
        const target = document.querySelector(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ================================
  // Utility: Escape Key to Close Modals
  // ================================
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      // Close mobile menu
      if (navMenu && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }

      // Dispatch custom event for other components (lightbox, etc.)
      const escapeEvent = new CustomEvent('escape-pressed');
      document.dispatchEvent(escapeEvent);
    }
  });

  // ================================
  // Accessibility: Focus Management
  // ================================
  // Trap focus inside mobile menu when open
  if (navMenu) {
    navMenu.addEventListener('keydown', function(event) {
      if (!navMenu.classList.contains('active')) return;

      const focusableElements = navMenu.querySelectorAll('a, button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  // ================================
  // Console Info (for development)
  // ================================
  console.log('✨ Stitching Dutch Heritage - B2B Wholesale Platform');
  console.log('🌍 Current language:', currentLang);
})();
