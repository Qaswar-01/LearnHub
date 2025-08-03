import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Register service worker
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      // Try to import the PWA register module
      const { registerSW } = await import('virtual:pwa-register');

      const updateSW = registerSW({
        onNeedRefresh() {
          console.log('🔄 New content available, please refresh.');
          window.dispatchEvent(new CustomEvent('pwa-update-available'));
        },
        onOfflineReady() {
          console.log('✅ App ready to work offline');
        },
        onRegistered(r) {
          console.log('✅ Service Worker registered:', r);
        },
        onRegisterError(error) {
          console.error('❌ Service Worker registration failed:', error);
        }
      });
    } catch (error) {
      console.warn('⚠️ PWA register not available, trying manual registration');

      // Fallback to manual service worker registration
      try {
        const registration = await navigator.serviceWorker.register('/dev-sw.js', {
          scope: '/',
          type: 'classic'
        });
        console.log('✅ Service Worker registered manually:', registration);
      } catch (swError) {
        console.error('❌ Manual service worker registration failed:', swError);
      }
    }
  } else {
    console.warn('⚠️ Service Worker not supported in this browser');
  }
}

// Register service worker after DOM is loaded
registerServiceWorker();

// PWA Installation and Service Worker Management
let deferredPrompt = null;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('🎯 PWA install prompt available');
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  window.deferredPrompt = e;

  // Dispatch custom event to notify components
  window.dispatchEvent(new CustomEvent('pwa-installable', { detail: e }));
});

// Listen for the appinstalled event
window.addEventListener('appinstalled', (e) => {
  console.log('🎉 PWA was installed successfully!');
  deferredPrompt = null;
  window.deferredPrompt = null;

  // Dispatch custom event to notify components
  window.dispatchEvent(new CustomEvent('pwa-installed'));
});

// Check if app is already installed
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
  console.log('✅ PWA is already installed and running in standalone mode');
  document.documentElement.classList.add('pwa-installed');
}

// Global install function for PWA
window.installPWA = async () => {
  if (window.deferredPrompt) {
    const promptEvent = window.deferredPrompt;
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    window.deferredPrompt = null;
    return result;
  }
  return { outcome: 'dismissed' };
};

// Expose PWA install function globally
window.installPWA = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install prompt outcome: ${outcome}`);

    if (outcome === 'accepted') {
      deferredPrompt = null;
      window.deferredPrompt = null;
    }

    return outcome;
  } else {
    console.log('PWA install prompt not available');
    return 'not-available';
  }
};


