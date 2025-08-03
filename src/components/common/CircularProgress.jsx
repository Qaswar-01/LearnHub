import PropTypes from 'prop-types';

/**
 * Reusable Circular Progress Component
 * @param {number} percentage - Progress percentage (0-100)
 * @param {string} size - Size variant ('sm', 'md', 'lg', 'xl')
 * @param {string} color - Color variant ('primary', 'green', 'yellow', 'red')
 * @param {boolean} showLabel - Whether to show percentage label in center
 * @param {string} className - Additional CSS classes
 * @param {number} strokeWidth - Width of the progress stroke
 */
function CircularProgress({ 
  percentage = 0, 
  size = 'md', 
  color = 'primary', 
  showLabel = true, 
  className = '',
  strokeWidth = 10 
}) {
  // Ensure percentage is between 0 and 100
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Size variants
  const sizeClasses = {
    sm: { container: 'w-12 h-12', text: 'text-xs' },
    md: { container: 'w-16 h-16', text: 'text-sm' },
    lg: { container: 'w-24 h-24', text: 'text-lg' },
    xl: { container: 'w-32 h-32', text: 'text-xl' }
  };
  
  // Color variants
  const colorClasses = {
    primary: 'text-primary-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500'
  };
  
  // Calculate circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(normalizedPercentage / 100) * circumference} ${circumference}`;
  
  // Determine color based on percentage if color is 'auto'
  const getAutoColor = (percent) => {
    if (percent >= 70) return 'text-green-500';
    if (percent >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const progressColor = color === 'auto' ? getAutoColor(normalizedPercentage) : colorClasses[color];
  
  return (
    <div className={`relative ${sizeClasses[size].container} ${className}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle 
          className="text-gray-200 dark:text-gray-700" 
          strokeWidth={strokeWidth}
          stroke="currentColor" 
          fill="transparent" 
          r={radius} 
          cx="50" 
          cy="50" 
        />
        
        {/* Progress circle */}
        <circle 
          className={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          stroke="currentColor" 
          fill="transparent" 
          r={radius} 
          cx="50" 
          cy="50"
          style={{
            transition: 'stroke-dasharray 0.5s ease-in-out'
          }}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${sizeClasses[size].text}`}>
            {normalizedPercentage}%
          </span>
        </div>
      )}
    </div>
  );
}

CircularProgress.propTypes = {
  percentage: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'green', 'yellow', 'red', 'auto']),
  showLabel: PropTypes.bool,
  className: PropTypes.string,
  strokeWidth: PropTypes.number
};

export default CircularProgress;
