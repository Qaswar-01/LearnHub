// Floating Action Button for Game Access
import React, { useState, useEffect } from 'react';
import { Gamepad2, PlayCircle, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const GameFloatingButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGameModal, setShowGameModal] = useState(false);

  // Don't show button on game page
  const isOnGamePage = location.pathname === '/game';

  const handleGameSelect = (category) => {
    navigate(`/game?category=${category}`);
    setShowGameModal(false);
    localStorage.setItem('gameButtonInteracted', 'true');
  };

  if (isOnGamePage) return null;

  return (
    <>
      {/* Floating Button - Positioned above bottom nav on mobile */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-20"></div>

        {/* Main button */}
        <button
          onClick={() => setShowGameModal(true)}
          className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group touch-manipulation active:scale-95"
          aria-label="Web Dev Game"
        >
          <Gamepad2 className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-12 transition-transform duration-200" />

          {/* Tooltip - Hidden on mobile */}
          <div className="hidden md:block absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Web Dev Game 🎮
          </div>

          {/* Badge indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">🎯</span>
          </div>
        </button>
      </div>

      {/* Game Selection Modal */}
      {showGameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-4 sm:p-6 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Choose Game Mode</h3>
              </div>
              <button
                onClick={() => setShowGameModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Game Mode Options */}
            <div className="space-y-2 sm:space-y-3">
              {/* Frontend Games */}
              <button
                onClick={() => handleGameSelect('frontend')}
                className="w-full p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 group text-left touch-manipulation active:scale-95"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Frontend Games
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      CSS Flexbox, Selectors & HTML
                    </p>
                  </div>
                  <div className="text-blue-500 group-hover:translate-x-1 transition-transform">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                </div>
              </button>

              {/* Backend Games */}
              <button
                onClick={() => handleGameSelect('backend')}
                className="w-full p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 group text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      Backend Games
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      JavaScript Debugging & Logic
                    </p>
                  </div>
                  <div className="text-orange-500 group-hover:translate-x-1 transition-transform">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                </div>
              </button>

              {/* Mixed Games */}
              <button
                onClick={() => handleGameSelect('mixed')}
                className="w-full p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 group text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                    <span className="text-2xl">🎲</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      Mixed Challenge
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Random from all categories
                    </p>
                  </div>
                  <div className="text-green-500 group-hover:translate-x-1 transition-transform">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                🎯 Test your skills with interactive coding challenges
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameFloatingButton;
