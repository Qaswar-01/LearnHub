import PropTypes from 'prop-types';

/**
 * Beautiful Loading Spinner Component
 * @param {string} size - Size variant ('sm', 'md', 'lg', 'xl')
 * @param {string} color - Color variant ('primary', 'white', 'gray')
 * @param {string} text - Optional loading text
 * @param {boolean} fullScreen - Whether to show as full screen overlay
 * @param {string} className - Additional CSS classes
 */
function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  text = '', 
  fullScreen = false,
  className = '' 
}) {
  // Size variants
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Color variants
  const colorClasses = {
    primary: 'border-primary-200 border-t-primary-600',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-200 border-t-gray-600'
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinner */}
      <div className="relative">
        <div 
          className={`
            ${sizeClasses[size]} 
            ${colorClasses[color]} 
            border-2 rounded-full animate-spin
          `}
        ></div>
        
        {/* Inner glow effect */}
        <div 
          className={`
            absolute inset-0 
            ${sizeClasses[size]} 
            border-2 border-transparent rounded-full
            ${color === 'primary' ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20' : ''}
            blur-sm animate-pulse
          `}
        ></div>
      </div>
      
      {/* Loading text */}
      {text && (
        <p className={`
          mt-4 text-sm font-medium
          ${color === 'white' ? 'text-white' : 'text-gray-600 dark:text-gray-400'}
          animate-pulse
        `}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-large border border-gray-200/50 dark:border-gray-700/50">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'white', 'gray']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  className: PropTypes.string
};

export default LoadingSpinner;
