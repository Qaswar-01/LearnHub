import { useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Award, Crown, Sparkles } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Beautiful Achievement Badge Component with animations
 * @param {string} type - Badge type ('trophy', 'star', 'target', 'zap', 'award', 'crown')
 * @param {string} title - Achievement title
 * @param {string} description - Achievement description
 * @param {boolean} unlocked - Whether the achievement is unlocked
 * @param {string} rarity - Rarity level ('common', 'rare', 'epic', 'legendary')
 * @param {function} onClick - Click handler
 * @param {boolean} showAnimation - Whether to show unlock animation
 */
function AchievementBadge({ 
  type = 'star', 
  title, 
  description, 
  unlocked = false, 
  rarity = 'common',
  onClick,
  showAnimation = false
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (showAnimation && unlocked) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation, unlocked]);

  // Icon mapping
  const icons = {
    trophy: Trophy,
    star: Star,
    target: Target,
    zap: Zap,
    award: Award,
    crown: Crown
  };

  // Rarity configurations
  const rarityConfigs = {
    common: {
      gradient: 'from-gray-400 to-gray-600',
      bgGradient: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700',
      borderColor: 'border-gray-300 dark:border-gray-600',
      glowColor: 'shadow-gray-500/20',
      emoji: '🥉'
    },
    rare: {
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      borderColor: 'border-blue-300 dark:border-blue-600',
      glowColor: 'shadow-blue-500/30',
      emoji: '🥈'
    },
    epic: {
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      borderColor: 'border-purple-300 dark:border-purple-600',
      glowColor: 'shadow-purple-500/40',
      emoji: '🥇'
    },
    legendary: {
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      bgGradient: 'from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20',
      borderColor: 'border-yellow-300 dark:border-yellow-600',
      glowColor: 'shadow-yellow-500/50',
      emoji: '👑'
    }
  };

  const Icon = icons[type];
  const config = rarityConfigs[rarity];

  return (
    <div 
      className={`
        group relative cursor-pointer transition-all duration-300 ease-out
        ${unlocked ? 'hover:scale-105' : 'opacity-60'}
        ${isAnimating ? 'animate-bounce-soft' : ''}
      `}
      onClick={onClick}
    >
      {/* Unlock animation overlay */}
      {isAnimating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl animate-pulse"></div>
          <div className="relative">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
            <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-lg animate-pulse"></div>
          </div>
        </div>
      )}

      <div 
        className={`
          relative overflow-hidden p-6 rounded-2xl border-2 transition-all duration-300
          ${config.bgGradient} ${config.borderColor}
          ${unlocked ? `${config.glowColor} hover:shadow-2xl` : 'border-gray-200 dark:border-gray-700'}
          ${unlocked ? 'bg-gradient-to-br' : 'bg-gray-100 dark:bg-gray-800'}
        `}
      >
        {/* Background decoration */}
        {unlocked && (
          <>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>
          </>
        )}

        {/* Content */}
        <div className="relative text-center">
          {/* Icon */}
          <div className={`
            inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300
            ${unlocked 
              ? `bg-gradient-to-br ${config.gradient} shadow-lg group-hover:scale-110` 
              : 'bg-gray-300 dark:bg-gray-600'
            }
          `}>
            <Icon className={`h-8 w-8 ${unlocked ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
          </div>

          {/* Rarity indicator */}
          <div className="flex items-center justify-center mb-3">
            <div className={`
              px-3 py-1 rounded-full text-xs font-semibold border
              ${unlocked 
                ? `${config.bgGradient} ${config.borderColor} text-gray-700 dark:text-gray-300` 
                : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
              }
            `}>
              {config.emoji} {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </div>
          </div>

          {/* Title */}
          <h3 className={`
            text-lg font-bold mb-2 transition-colors duration-300
            ${unlocked 
              ? 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100' 
              : 'text-gray-500 dark:text-gray-400'
            }
          `}>
            {title}
          </h3>

          {/* Description */}
          <p className={`
            text-sm leading-relaxed transition-colors duration-300
            ${unlocked 
              ? 'text-gray-600 dark:text-gray-400' 
              : 'text-gray-400 dark:text-gray-500'
            }
          `}>
            {description}
          </p>

          {/* Unlock status */}
          <div className="mt-4">
            {unlocked ? (
              <div className="flex items-center justify-center space-x-2 text-sm font-medium text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Unlocked!</span>
                <div className="text-base">✨</div>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>Locked</span>
                <div className="text-base">🔒</div>
              </div>
            )}
          </div>
        </div>

        {/* Shimmer effect for unlocked badges */}
        {unlocked && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        )}
      </div>
    </div>
  );
}

AchievementBadge.propTypes = {
  type: PropTypes.oneOf(['trophy', 'star', 'target', 'zap', 'award', 'crown']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  unlocked: PropTypes.bool,
  rarity: PropTypes.oneOf(['common', 'rare', 'epic', 'legendary']),
  onClick: PropTypes.func,
  showAnimation: PropTypes.bool
};

export default AchievementBadge;
