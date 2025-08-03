import { useState, useEffect } from 'react';
import { X, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Beautiful Motivational Banner Component
 * @param {string} type - Banner type ('success', 'encouragement', 'streak', 'milestone')
 * @param {string} message - Main message
 * @param {string} submessage - Secondary message
 * @param {boolean} show - Whether to show the banner
 * @param {function} onClose - Close handler
 * @param {boolean} autoHide - Whether to auto-hide after duration
 * @param {number} duration - Auto-hide duration in ms
 */
function MotivationalBanner({ 
  type = 'encouragement', 
  message, 
  submessage, 
  show = true, 
  onClose,
  autoHide = false,
  duration = 5000
}) {
  const [isVisible, setIsVisible] = useState(show);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (isVisible && autoHide) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHide, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  // Banner configurations
  const configs = {
    success: {
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      icon: Sparkles,
      emoji: '🎉',
      defaultMessage: 'Fantastic work!',
      defaultSubmessage: 'You\'re making excellent progress!'
    },
    encouragement: {
      gradient: 'from-purple-400 via-pink-500 to-red-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      icon: TrendingUp,
      emoji: '💪',
      defaultMessage: 'Keep going!',
      defaultSubmessage: 'Every step forward is progress!'
    },
    streak: {
      gradient: 'from-orange-400 via-yellow-500 to-amber-500',
      bgGradient: 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20',
      icon: Zap,
      emoji: '🔥',
      defaultMessage: 'You\'re on fire!',
      defaultSubmessage: 'Your learning streak is impressive!'
    },
    milestone: {
      gradient: 'from-indigo-400 via-blue-500 to-cyan-500',
      bgGradient: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
      icon: Target,
      emoji: '🎯',
      defaultMessage: 'Milestone achieved!',
      defaultSubmessage: 'You\'ve reached an important goal!'
    }
  };

  const config = configs[type];
  const Icon = config.icon;
  const displayMessage = message || config.defaultMessage;
  const displaySubmessage = submessage || config.defaultSubmessage;

  return (
    <div 
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4
        transition-all duration-300 ease-out
        ${isLeaving ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
        ${isVisible ? 'animate-slide-down' : ''}
      `}
    >
      <div 
        className={`
          relative overflow-hidden rounded-3xl p-6 shadow-2xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20
          bg-gradient-to-br ${config.bgGradient}
          hover:shadow-glow transition-shadow duration-300
        `}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>

        {/* Floating elements */}
        <div className="absolute top-4 right-16">
          <div className="text-2xl animate-bounce-soft">{config.emoji}</div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-8 left-8">
          <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative flex items-start">
          {/* Icon */}
          <div className={`
            flex-shrink-0 p-3 rounded-2xl mr-4 shadow-lg
            bg-gradient-to-br ${config.gradient}
          `}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
              {displayMessage}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {displaySubmessage}
            </p>
            
            {/* Progress indicator */}
            <div className="mt-3 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Keep up the momentum!
              </span>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
      </div>
    </div>
  );
}

MotivationalBanner.propTypes = {
  type: PropTypes.oneOf(['success', 'encouragement', 'streak', 'milestone']),
  message: PropTypes.string,
  submessage: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  autoHide: PropTypes.bool,
  duration: PropTypes.number
};

export default MotivationalBanner;
