import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Beautiful Toast Notification Component
 * @param {string} type - Type of toast ('success', 'error', 'warning', 'info')
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 * @param {function} onClose - Callback when toast is closed
 * @param {boolean} show - Whether to show the toast
 */
function Toast({ 
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose, 
  show = true 
}) {
  const [isVisible, setIsVisible] = useState(show);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  // Icon and color configurations
  const configs = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-r from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20',
      borderColor: 'border-success-200 dark:border-success-700',
      iconColor: 'text-success-600 dark:text-success-400',
      titleColor: 'text-success-800 dark:text-success-200',
      messageColor: 'text-success-700 dark:text-success-300'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-gradient-to-r from-error-50 to-error-100 dark:from-error-900/20 dark:to-error-800/20',
      borderColor: 'border-error-200 dark:border-error-700',
      iconColor: 'text-error-600 dark:text-error-400',
      titleColor: 'text-error-800 dark:text-error-200',
      messageColor: 'text-error-700 dark:text-error-300'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-gradient-to-r from-warning-50 to-warning-100 dark:from-warning-900/20 dark:to-warning-800/20',
      borderColor: 'border-warning-200 dark:border-warning-700',
      iconColor: 'text-warning-600 dark:text-warning-400',
      titleColor: 'text-warning-800 dark:text-warning-200',
      messageColor: 'text-warning-700 dark:text-warning-300'
    },
    info: {
      icon: Info,
      bgColor: 'bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20',
      borderColor: 'border-primary-200 dark:border-primary-700',
      iconColor: 'text-primary-600 dark:text-primary-400',
      titleColor: 'text-primary-800 dark:text-primary-200',
      messageColor: 'text-primary-700 dark:text-primary-300'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div 
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-out
        ${isLeaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        ${isVisible ? 'animate-slide-down' : ''}
      `}
    >
      <div 
        className={`
          ${config.bgColor} ${config.borderColor}
          border rounded-2xl p-4 shadow-large backdrop-blur-sm
          hover:shadow-glow transition-shadow duration-300
        `}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
          </div>
          
          <div className="ml-3 flex-1">
            {title && (
              <h3 className={`text-sm font-semibold ${config.titleColor} mb-1`}>
                {title}
              </h3>
            )}
            {message && (
              <p className={`text-sm ${config.messageColor}`}>
                {message}
              </p>
            )}
          </div>
          
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className={`
                inline-flex rounded-xl p-1.5 
                ${config.iconColor} hover:bg-white/20 dark:hover:bg-gray-800/20
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                transition-colors duration-200
              `}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Progress bar for auto-dismiss */}
        {duration > 0 && (
          <div className="mt-3 w-full bg-white/20 dark:bg-gray-800/20 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-full ${config.iconColor.replace('text-', 'bg-')} rounded-full`}
              style={{
                animation: `shrink ${duration}ms linear forwards`
              }}
            ></div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  show: PropTypes.bool
};

export default Toast;
