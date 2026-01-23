/**
 * Tooltips for collection items
 * Shows work title and short description on hover
 */

(function() {
  'use strict';

  let tooltip = null;
  let currentTarget = null;

  // Create tooltip element
  function createTooltip() {
    tooltip = document.createElement('div');
    tooltip.className = 'work-tooltip';
    tooltip.innerHTML = `
      <div class="work-tooltip-title"></div>
      <div class="work-tooltip-description"></div>
    `;
    document.body.appendChild(tooltip);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .work-tooltip {
        position: fixed;
        z-index: 9999;
        background-color: rgba(26, 77, 32, 0.95);
        color: var(--color-white);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-sm);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        font-size: 0.875rem;
        line-height: 1.5;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        backdrop-filter: blur(4px);
      }

      .work-tooltip.visible {
        opacity: 1;
      }

      .work-tooltip-title {
        font-weight: 600;
        margin-bottom: var(--spacing-xs);
        font-size: 0.95rem;
        color: #fff;
      }

      .work-tooltip-description {
        font-size: 0.85rem;
        opacity: 0.9;
        line-height: 1.4;
      }

      /* Hide on mobile */
      @media (max-width: 768px) {
        .work-tooltip {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Show tooltip
  async function showTooltip(element, event) {
    if (!tooltip) createTooltip();
    if (!window.descriptionsManager) return;

    const workId = element.getAttribute('data-work-id');
    if (!workId) return;

    currentTarget = element;

    // Load description
    const description = await window.descriptionsManager.getDescription(workId);
    if (!description || currentTarget !== element) return; // User moved away

    // Get current language
    const currentLang = document.body.classList.contains('lang-nl') ? 'nl' : 'en';

    // Update tooltip content
    const titleKey = currentLang === 'nl' ? 'title_nl' : 'title_en';
    const title = description.metadata[titleKey] || workId;
    const shortDesc = window.descriptionsManager.getShortDescription(description, currentLang);

    tooltip.querySelector('.work-tooltip-title').textContent = title;
    tooltip.querySelector('.work-tooltip-description').textContent = shortDesc;

    // Position tooltip
    positionTooltip(event);

    // Show tooltip
    tooltip.classList.add('visible');
  }

  // Hide tooltip
  function hideTooltip() {
    if (tooltip) {
      tooltip.classList.remove('visible');
    }
    currentTarget = null;
  }

  // Position tooltip near cursor
  function positionTooltip(event) {
    if (!tooltip) return;

    const tooltipRect = tooltip.getBoundingClientRect();
    const offsetX = 15;
    const offsetY = 15;

    let left = event.clientX + offsetX;
    let top = event.clientY + offsetY;

    // Keep tooltip in viewport
    if (left + tooltipRect.width > window.innerWidth) {
      left = event.clientX - tooltipRect.width - offsetX;
    }

    if (top + tooltipRect.height > window.innerHeight) {
      top = event.clientY - tooltipRect.height - offsetY;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  // Update tooltip position on mouse move
  function updateTooltipPosition(event) {
    if (tooltip && tooltip.classList.contains('visible')) {
      positionTooltip(event);
    }
  }

  // Initialize tooltips
  function initTooltips() {
    // Add event listeners to all collection items
    document.addEventListener('mouseenter', function(event) {
      const item = event.target.closest('.collection-image-item');
      if (item) {
        showTooltip(item, event);
      }
    }, true);

    document.addEventListener('mouseleave', function(event) {
      const item = event.target.closest('.collection-image-item');
      if (item) {
        hideTooltip();
      }
    }, true);

    document.addEventListener('mousemove', function(event) {
      const item = event.target.closest('.collection-image-item');
      if (item && currentTarget === item) {
        updateTooltipPosition(event);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTooltips);
  } else {
    initTooltips();
  }

})();
