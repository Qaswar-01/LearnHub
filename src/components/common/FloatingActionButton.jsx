import { useState } from 'react';
import { Plus, BookOpen, Target, BarChart2, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Beautiful Floating Action Button with expandable menu
 * @param {array} actions - Array of action objects with {icon, label, to, onClick, color}
 * @param {string} position - Position ('bottom-right', 'bottom-left', 'top-right', 'top-left')
 * @param {string} mainColor - Main button color gradient
 */
function FloatingActionButton({ 
  actions = [], 
  position = 'bottom-right',
  mainColor = 'from-purple-500 to-pink-500'
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Default actions if none provided
  const defaultActions = [
    {
      icon: BookOpen,
      label: 'Start Learning',
      to: '/lessons',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      label: 'Take Quiz',
      to: '/quiz',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: BarChart2,
      label: 'View Progress',
      to: '/progress',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const menuActions = actions.length > 0 ? actions : defaultActions;

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (action) => {
    if (action.onClick) {
      action.onClick();
    }
    setIsExpanded(false);
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40`}>
      {/* Action menu items */}
      <div className={`
        absolute ${position.includes('bottom') ? 'bottom-20' : 'top-20'} 
        ${position.includes('right') ? 'right-0' : 'left-0'}
        flex flex-col space-y-3 transition-all duration-300 ease-out
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}>
        {menuActions.map((action, index) => {
          const Icon = action.icon;
          const ActionComponent = action.to ? Link : 'button';
          
          return (
            <ActionComponent
              key={index}
              to={action.to}
              onClick={() => handleActionClick(action)}
              className={`
                group flex items-center space-x-3 p-3 rounded-2xl shadow-large
                bg-gradient-to-r ${action.color} text-white
                hover:scale-105 hover:shadow-2xl transition-all duration-200
                ${position.includes('right') ? 'flex-row-reverse space-x-reverse' : ''}
              `}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: isExpanded ? 'slide-up 0.3s ease-out forwards' : 'none'
              }}
            >
              <div className="p-2 bg-white/20 rounded-xl">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-medium text-sm whitespace-nowrap">
                {action.label}
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 rounded-2xl"></div>
            </ActionComponent>
          );
        })}
      </div>

      {/* Main FAB button */}
      <button
        onClick={handleToggle}
        className={`
          relative group w-16 h-16 rounded-full shadow-2xl
          bg-gradient-to-r ${mainColor} text-white
          hover:scale-110 active:scale-95 transition-all duration-200
          flex items-center justify-center overflow-hidden
        `}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full"></div>
        <div className="absolute top-1 right-1 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
        
        {/* Icon with rotation animation */}
        <div className={`
          relative transition-transform duration-300 ease-out
          ${isExpanded ? 'rotate-45' : 'rotate-0'}
        `}>
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </div>

        {/* Pulse effect */}
        <div className={`
          absolute inset-0 rounded-full bg-gradient-to-r ${mainColor} 
          animate-ping opacity-20
        `}></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full"></div>
      </button>

      {/* Floating sparkles */}
      {isExpanded && (
        <>
          <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce-soft">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="absolute -bottom-2 -left-2 text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
          </div>
          <div className="absolute top-1/2 -left-4 text-cyan-400 animate-bounce-soft" style={{ animationDelay: '0.3s' }}>
            <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
          </div>
        </>
      )}

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}

FloatingActionButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string
  })),
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  mainColor: PropTypes.string
};

export default FloatingActionButton;
