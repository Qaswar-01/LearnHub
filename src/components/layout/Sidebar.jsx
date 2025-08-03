import { NavLink } from 'react-router-dom';
import { Home, BookOpen, HelpCircle, BarChart2, Settings, PlayCircle, Code, Zap, X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

function Sidebar({ isOpen, closeSidebar }) {
  const { userProgress } = useAppContext();

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Lessons', path: '/lessons', icon: BookOpen },
    { name: 'JavaScript Course', path: '/javascript-course', icon: PlayCircle },
    { name: 'Web Dev Game', path: '/game', icon: Code, secondaryIcon: Zap },
    { name: 'Progress', path: '/progress', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-80 sm:w-72 md:w-80 transform bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-large transition duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header with close button (mobile only) */}
          <div className="flex items-center justify-between p-6 md:hidden border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl blur opacity-20"></div>
              <div className="relative px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl">
                <span className="text-lg font-bold text-white">LearnHub</span>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 hover:scale-105"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const SecondaryIcon = item.secondaryIcon;
              const isWebDevGame = item.name === 'Web Dev Game';

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-4 sm:py-3.5 text-sm font-medium rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95 touch-manipulation ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 transform-gpu'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:text-purple-700 dark:hover:text-purple-300'
                    }`
                  }
                  onClick={() => window.innerWidth < 768 && closeSidebar()}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative flex items-center">
                    <Icon className="mr-4 h-6 w-6 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                    {SecondaryIcon && (
                      <SecondaryIcon className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 group-hover:scale-125 transition-transform duration-200" />
                    )}
                  </div>
                  <span className="flex-1 text-base sm:text-sm">{item.name}</span>

                  {/* Show badge for Progress if there are completed lessons */}
                  {item.name === 'Progress' && userProgress.completedLessons.length > 0 && (
                    <div className="ml-2 relative">
                      <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-success-500 to-success-600 rounded-full shadow-soft animate-pulse-soft">
                        {userProgress.completedLessons.length}
                      </span>
                    </div>
                  )}

                  {/* Show special badge for Web Dev Game */}
                  {isWebDevGame && (
                    <div className="ml-2 relative">
                      <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-soft animate-pulse-soft">
                        🎮
                      </span>
                    </div>
                  )}

                  {/* Hover effect indicator */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                </NavLink>
              );
            })}


          </nav>

          {/* User progress summary */}
          <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Learning Progress</span>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                  {Math.min((userProgress.completedLessons.length / 5) * 100, 100)}%
                </span>
              </div>

              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-success-500 h-full rounded-full transition-all duration-700 ease-out shadow-colored relative"
                    style={{ width: `${Math.min((userProgress.completedLessons.length / 5) * 100, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse-soft"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {userProgress.completedLessons.length} of 5 lessons
                </span>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-success-600 dark:text-success-400 font-medium">
                    {userProgress.points} pts
                  </span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {userProgress.quizResults.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Quizzes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-warning-600 dark:text-warning-400">
                    {userProgress.badges.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Badges</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>


    </>
  );
}

export default Sidebar;