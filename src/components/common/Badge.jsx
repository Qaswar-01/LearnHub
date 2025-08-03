import PropTypes from 'prop-types';

/**
 * Reusable Badge Component
 * @param {string} icon - Emoji icon for the badge
 * @param {string} name - Badge name
 * @param {string} description - Badge description
 * @param {boolean} earned - Whether the badge has been earned
 * @param {string} size - Size variant ('sm', 'md', 'lg')
 * @param {string} className - Additional CSS classes
 */
function Badge({ 
  icon, 
  name, 
  description, 
  earned = false, 
  size = 'md', 
  className = '' 
}) {
  // Size variants
  const sizeClasses = {
    sm: {
      container: 'p-3',
      icon: 'w-8 h-8 text-lg',
      title: 'text-sm',
      description: 'text-xs'
    },
    md: {
      container: 'p-4',
      icon: 'w-12 h-12 text-2xl',
      title: 'text-base',
      description: 'text-sm'
    },
    lg: {
      container: 'p-6',
      icon: 'w-16 h-16 text-3xl',
      title: 'text-lg',
      description: 'text-base'
    }
  };
  
  const sizes = sizeClasses[size];
  
  return (
    <div 
      className={`
        border border-gray-200 dark:border-gray-700 rounded-lg 
        flex flex-col items-center text-center
        ${earned ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50 opacity-50'}
        ${sizes.container}
        ${className}
      `}
    >
      <div 
        className={`
          ${sizes.icon} flex items-center justify-center rounded-full mb-3
          ${earned 
            ? 'bg-primary-100 dark:bg-primary-900/30' 
            : 'bg-gray-100 dark:bg-gray-700'
          }
        `}
      >
        <span 
          className={sizes.icon.split(' ')[2]} 
          role="img" 
          aria-label={name}
        >
          {icon}
        </span>
      </div>
      
      <h3 className={`font-medium ${sizes.title}`}>
        {name}
      </h3>
      
      <p className={`text-gray-600 dark:text-gray-400 mt-1 ${sizes.description}`}>
        {description}
      </p>
      
      {earned && (
        <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
          Earned
        </div>
      )}
    </div>
  );
}

Badge.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  earned: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default Badge;
