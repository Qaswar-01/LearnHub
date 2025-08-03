import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, PlayCircle, Code, BarChart2, Settings } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();

  // Navigation items for bottom nav (simplified for mobile)
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Lessons', path: '/lessons', icon: BookOpen },
    { name: 'Course', path: '/javascript-course', icon: PlayCircle },
    { name: 'Game', path: '/game', icon: Code },
    { name: 'Progress', path: '/progress', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg md:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isGame = item.name === 'Game';
          
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-300 touch-manipulation active:scale-95 min-w-0 flex-1 ${
                isActive
                  ? isGame
                    ? 'bg-gradient-to-t from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gradient-to-t from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-80"></div>
              )}
            </NavLink>
          );
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white/95 dark:bg-gray-900/95"></div>
    </nav>
  );
};

export default BottomNavigation;
