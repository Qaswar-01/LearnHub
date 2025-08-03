import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

const PWAInstallButton = ({ variant = 'button', className = '' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const installed = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone === true;
      setIsInstalled(installed);
      return installed;
    };

    checkInstalled();

    // Listen for PWA events
    const handleInstallable = (e) => {
      setDeferredPrompt(e.detail);
      setShowInstallPrompt(true);
      
      // Show banner after a delay if not dismissed
      setTimeout(() => {
        if (!localStorage.getItem('pwa-banner-dismissed') && !checkInstalled()) {
          setShowBanner(true);
        }
      }, 3000);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);

    // Check if prompt is already available
    if (window.deferredPrompt) {
      handleInstallable({ detail: window.deferredPrompt });
    }

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      const outcome = await window.installPWA();
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
        setShowBanner(false);
      }
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Don't show anything if already installed
  if (isInstalled) {
    return null;
  }

  // Banner variant
  if (variant === 'banner' && showBanner) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Install LearnHub</h4>
                <p className="text-xs opacity-90">Get the full app experience!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleInstall}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
              >
                Install
              </button>
              <button
                onClick={dismissBanner}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Button variant
  if (variant === 'button' && showInstallPrompt) {
    return (
      <button
        onClick={handleInstall}
        className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg ${className}`}
      >
        <Download className="h-4 w-4 mr-2" />
        Install App
      </button>
    );
  }

  // Floating variant
  if (variant === 'floating' && showInstallPrompt) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleInstall}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          title="Install LearnHub App"
        >
          <Download className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    );
  }

  return null;
};

export default PWAInstallButton;
