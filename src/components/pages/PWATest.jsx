import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Download, Smartphone, Wifi, WifiOff } from 'lucide-react';

const PWATest = () => {
  const [pwaStatus, setPwaStatus] = useState({
    serviceWorker: false,
    manifest: false,
    https: false,
    installPrompt: false,
    isInstalled: false,
    isOnline: navigator.onLine
  });

  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    checkPWAStatus();

    // Listen for PWA events
    const handleInstallable = (e) => {
      setInstallPrompt(e.detail);
      setPwaStatus(prev => ({ ...prev, installPrompt: true }));
    };

    const handleInstalled = () => {
      setPwaStatus(prev => ({ ...prev, isInstalled: true, installPrompt: false }));
      setInstallPrompt(null);
    };

    const handleOnline = () => {
      setPwaStatus(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setPwaStatus(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkPWAStatus = async () => {
    const status = { ...pwaStatus };

    // Check Service Worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        status.serviceWorker = !!registration;

        // Also check if service worker is active
        if (registration && registration.active) {
          console.log('✅ Service Worker is active:', registration.active.scriptURL);
        }
      } catch (error) {
        console.error('Service Worker check failed:', error);
        status.serviceWorker = false;
      }
    }

    // Check Manifest
    try {
      const response = await fetch('/manifest.webmanifest');
      status.manifest = response.ok;
      if (response.ok) {
        const manifest = await response.json();
        console.log('✅ Manifest loaded:', manifest);
      }
    } catch (error) {
      console.error('Manifest check failed:', error);
      status.manifest = false;
    }

    // Check HTTPS
    status.https = location.protocol === 'https:' || location.hostname === 'localhost';

    // Check if already installed
    status.isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true;

    // Check install prompt
    status.installPrompt = !!window.deferredPrompt;

    console.log('PWA Status:', status);
    setPwaStatus(status);
  };

  const handleInstall = async () => {
    if (installPrompt || window.deferredPrompt) {
      const outcome = await window.installPWA();
      console.log('Install outcome:', outcome);
    }
  };

  const StatusIcon = ({ status }) => {
    if (status) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const testOffline = () => {
    window.location.href = '/offline.html';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">PWA Status Dashboard</h1>
        
        {/* Connection Status */}
        <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center gap-3">
            {pwaStatus.isOnline ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium">
              {pwaStatus.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* PWA Requirements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">PWA Requirements</h2>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <StatusIcon status={pwaStatus.serviceWorker} />
              <span>Service Worker Registered</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <StatusIcon status={pwaStatus.manifest} />
              <span>Web App Manifest</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <StatusIcon status={pwaStatus.https} />
              <span>HTTPS/Localhost</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <StatusIcon status={pwaStatus.installPrompt} />
              <span>Install Prompt Available</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Installation Status</h2>
            
            {pwaStatus.isInstalled ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">App is installed!</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  LearnHub is running as a PWA
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">Ready to install</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    Click the button below or use browser menu
                  </p>
                </div>
                
                <button
                  onClick={handleInstall}
                  disabled={!pwaStatus.installPrompt && !window.deferredPrompt}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  {pwaStatus.installPrompt || window.deferredPrompt ? 'Install PWA' : 'Install Not Available'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Test Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={checkPWAStatus}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🔄 Refresh Status
          </button>
          
          <button
            onClick={testOffline}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            🔌 Test Offline Page
          </button>
        </div>

        {/* PWA Features */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">PWA Features Enabled</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">✅ Implemented:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Auto-updating service worker</li>
                <li>• Offline fallback page</li>
                <li>• App manifest with icons</li>
                <li>• Install prompts</li>
                <li>• Mobile-friendly meta tags</li>
                <li>• Standalone display mode</li>
                <li>• Asset caching</li>
                <li>• Update notifications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">📱 Browser Support:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Chrome/Edge (Desktop & Mobile)</li>
                <li>• Firefox (Desktop & Mobile)</li>
                <li>• Safari (iOS with limitations)</li>
                <li>• Samsung Internet</li>
                <li>• Opera</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWATest;
