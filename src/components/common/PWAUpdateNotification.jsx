import { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';

const PWAUpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => {
      setShowUpdate(true);
    };

    window.addEventListener('pwa-update-available', handleUpdateAvailable);

    return () => {
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
    };
  }, []);

  const handleUpdate = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl shadow-lg border border-green-500/20 animate-slide-down">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Update Available</h4>
              <p className="text-xs opacity-90">A new version is ready!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
            >
              Update
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdateNotification;
