/**
 * Site Configuration - EXAMPLE
 * Copy this file to config.js and fill in your actual values
 * config.js is excluded from Git via .gitignore
 */
window.SITE_CONFIG = {
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    databaseURL: 'https://YOUR_PROJECT-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'YOUR_PROJECT',
    storageBucket: 'YOUR_PROJECT.firebasestorage.app',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  },
  emailjs: {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID'
  },
  formspree: {
    formId: 'YOUR_FORMSPREE_ID'
  },
  admin: {
    password: 'YOUR_ADMIN_PASSWORD'
  }
};
