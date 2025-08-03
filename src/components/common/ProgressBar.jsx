import PropTypes from 'prop-types';

/**
 * Reusable Progress Bar Component
 * @param {number} percentage - Progress percentage (0-100)
 * @param {string} size - Size variant ('sm', 'md', 'lg')
 * @param {string} color - Color variant ('primary', 'green', 'yellow', 'red')
 * @param {boolean} showLabel - Whether to show percentage label
 * @param {string} className - Additional CSS classes
 */
function ProgressBar({ 
  percentage = 0, 
  size = 'md', 
  color = 'primary', 
  showLabel = false, 
  className = '',
  animated = true 
}) {
  // Ensure percentage is between 0 and 100
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Size variants
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };
  
  // Color variants
  const colorClasses = {
    primary: 'bg-primary-600',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {normalizedPercentage}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${sizeClasses[size]}`}>
        <div 
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${normalizedPercentage}%` }}
        />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  percentage: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'green', 'yellow', 'red']),
  showLabel: PropTypes.bool,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default ProgressBar;
