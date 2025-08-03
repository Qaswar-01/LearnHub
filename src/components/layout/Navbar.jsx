import { useAppContext } from '../../contexts/AppContext';
import { Menu, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import PWAInstallButton from '../common/PWAInstallButton';

function Navbar({ toggleSidebar }) {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-soft">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Left side - Logo and mobile menu button */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 sm:p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary-500 md:hidden transition-all duration-200 hover:scale-105 touch-manipulation active:scale-95"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center ml-2 sm:ml-3 md:ml-0 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                  <span className="text-lg sm:text-xl font-bold text-white">LearnHub</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right side - PWA Install and Theme toggle */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* PWA Install Button - Hidden on small screens */}
            <div className="hidden sm:block">
              <PWAInstallButton variant="button" className="text-sm px-3 py-1.5" />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex items-center justify-center p-2 sm:p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 hover:scale-105 group touch-manipulation active:scale-95"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative">
                {darkMode ? (
                  <Sun className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-200" />
                ) : (
                  <Moon className="h-5 w-5 transform group-hover:-rotate-12 transition-transform duration-200" />
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute -bottom-10 right-0 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {darkMode ? 'Light mode' : 'Dark mode'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;