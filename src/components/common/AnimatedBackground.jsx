import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Beautiful Animated Background with floating elements
 * @param {string} variant - Background variant ('default', 'colorful', 'minimal', 'geometric')
 * @param {boolean} animated - Whether to animate the elements
 * @param {number} particleCount - Number of floating particles
 */
function AnimatedBackground({ 
  variant = 'colorful', 
  animated = true, 
  particleCount = 20 
}) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (animated) {
      const newParticles = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.3 + 0.1,
          color: getRandomColor(variant)
        });
      }
      setParticles(newParticles);
    }
  }, [animated, particleCount, variant]);

  const getRandomColor = (variant) => {
    const colorSets = {
      default: ['bg-blue-400', 'bg-purple-400', 'bg-pink-400'],
      colorful: [
        'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 
        'bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400'
      ],
      minimal: ['bg-gray-300', 'bg-gray-400', 'bg-gray-500'],
      geometric: ['bg-cyan-400', 'bg-teal-400', 'bg-emerald-400', 'bg-lime-400']
    };
    
    const colors = colorSets[variant] || colorSets.default;
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const backgroundVariants = {
    default: 'from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
    colorful: 'from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20',
    minimal: 'from-gray-50 to-white dark:from-gray-900 dark:to-gray-800',
    geometric: 'from-cyan-50 via-teal-50 to-emerald-50 dark:from-cyan-900/20 dark:via-teal-900/20 dark:to-emerald-900/20'
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgroundVariants[variant]}`}></div>

      {/* Large decorative blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>

      {/* Medium decorative elements */}
      {variant === 'colorful' && (
        <>
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl animate-bounce-soft"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </>
      )}

      {/* Geometric patterns for geometric variant */}
      {variant === 'geometric' && (
        <>
          <div className="absolute top-10 left-10 w-16 h-16 border border-cyan-200/30 dark:border-cyan-700/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 border border-teal-200/30 dark:border-teal-700/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-emerald-200/20 dark:bg-emerald-700/20 transform rotate-45 animate-bounce-soft"></div>
        </>
      )}

      {/* Floating particles */}
      {animated && particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} animate-float`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        ></div>
      ))}

      {/* Subtle grid pattern overlay */}
      {variant === 'geometric' && (
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      )}

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/20 dark:to-black/20"></div>

      {/* CSS for additional animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}

AnimatedBackground.propTypes = {
  variant: PropTypes.oneOf(['default', 'colorful', 'minimal', 'geometric']),
  animated: PropTypes.bool,
  particleCount: PropTypes.number
};

export default AnimatedBackground;
