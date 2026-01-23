/**
 * Order Form & Cart Management
 * Handles adding collections to order requests
 */

(function() {
  'use strict';

  // Order cart state
  let orderCart = [];

  // Load cart from localStorage
  function loadCart() {
    const savedCart = localStorage.getItem('orderCart');
    if (savedCart) {
      try {
        orderCart = JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to load cart:', e);
        orderCart = [];
      }
    }
    updateCartDisplay();
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('orderCart', JSON.stringify(orderCart));
  }

  // Add collection to cart
  function addToCart(collectionId, collectionName, price) {
    // Check if already in cart
    const existingIndex = orderCart.findIndex(item => item.id === collectionId);

    if (existingIndex === -1) {
      orderCart.push({
        id: collectionId,
        name: collectionName,
        price: parseFloat(price)
      });

      saveCart();
      updateCartDisplay();
      showNotification(`${collectionName} toegevoegd aan order`, 'success');
    } else {
      showNotification(`${collectionName} staat al in uw order`, 'info');
    }
  }

  // Remove collection from cart
  function removeFromCart(collectionId) {
    const item = orderCart.find(item => item.id === collectionId);
    orderCart = orderCart.filter(item => item.id !== collectionId);

    saveCart();
    updateCartDisplay();

    if (item) {
      showNotification(`${item.name} verwijderd uit order`, 'info');
    }
  }

  // Update cart display
  function updateCartDisplay() {
    const cartElement = document.getElementById('orderCart');
    const cartItemsElement = document.getElementById('orderCartItems');
    const cartTotalElement = document.getElementById('orderCartTotal');

    if (!cartElement || !cartItemsElement || !cartTotalElement) {
      return; // Not on collections page
    }

    // Show/hide cart
    if (orderCart.length > 0) {
      cartElement.classList.add('visible');
    } else {
      cartElement.classList.remove('visible');
    }

    // Update cart items
    cartItemsElement.innerHTML = '';
    let total = 0;

    orderCart.forEach(item => {
      total += item.price;

      const itemElement = document.createElement('li');
      itemElement.className = 'order-cart-item';
      itemElement.innerHTML = `
        <span>${item.name}</span>
        <button onclick="removeFromOrderCart('${item.id}')" aria-label="Remove ${item.name}">×</button>
      `;
      cartItemsElement.appendChild(itemElement);
    });

    // Update total
    cartTotalElement.textContent = `€${total}`;

    // Update "Add to Order" button states
    document.querySelectorAll('.btn-add-to-order').forEach(button => {
      const collectionId = button.getAttribute('data-id');
      const isInCart = orderCart.some(item => item.id === collectionId);

      if (isInCart) {
        button.classList.add('added');
        button.disabled = true;
      } else {
        button.classList.remove('added');
        button.disabled = false;
      }
    });
  }

  // Show notification
  function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notificationContainer = document.getElementById('notificationContainer');

    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'notificationContainer';
      notificationContainer.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(notificationContainer);
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      font-size: 0.95rem;
      animation: slideInRight 0.3s ease;
      max-width: 300px;
    `;

    notificationContainer.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Add animation styles
  function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Populate contact form with cart data
  function populateContactForm() {
    const orderDetailsField = document.getElementById('orderDetails');

    if (orderDetailsField && orderCart.length > 0) {
      let orderText = 'Selected Collections:\n\n';

      orderCart.forEach((item, index) => {
        orderText += `${index + 1}. ${item.name} - €${item.price}\n`;
      });

      const total = orderCart.reduce((sum, item) => sum + item.price, 0);
      orderText += `\n Total (excl. shipping): €${total}\n`;

      orderDetailsField.value = orderText;
    }
  }

  // Export function to global scope (for onclick handlers)
  window.removeFromOrderCart = removeFromCart;

  // Initialize
  function init() {
    addNotificationStyles();
    loadCart();

    // Add event listeners to "Add to Order" buttons
    document.querySelectorAll('.btn-add-to-order').forEach(button => {
      button.addEventListener('click', function() {
        const collectionId = this.getAttribute('data-id');
        const collectionName = this.getAttribute('data-collection');
        const price = this.getAttribute('data-price');

        addToCart(collectionId, collectionName, price);
      });
    });

    // If on contact page, populate form
    if (window.location.pathname.includes('contact.html')) {
      populateContactForm();
    }

    console.log('🛒 Order cart initialized:', orderCart.length, 'items');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export cart for use in contact form
  window.getOrderCart = function() {
    return orderCart;
  };

  window.clearOrderCart = function() {
    orderCart = [];
    saveCart();
    updateCartDisplay();
    showNotification('Order cart cleared', 'info');
  };
})();
