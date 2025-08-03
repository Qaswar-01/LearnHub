import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Beautiful Confetti Celebration Component
 * @param {boolean} show - Whether to show the confetti
 * @param {number} duration - Duration in milliseconds
 * @param {function} onComplete - Callback when animation completes
 * @param {string} message - Celebration message
 * @param {string} emoji - Celebration emoji
 */
function ConfettiCelebration({ 
  show = false, 
  duration = 3000, 
  onComplete,
  message = "Congratulations!",
  emoji = "🎉"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // Generate confetti pieces
      const pieces = [];
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ];
      
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          color: colors[Math.floor(Math.random() * colors.length)],
          left: Math.random() * 100,
          animationDelay: Math.random() * 3,
          animationDuration: 3 + Math.random() * 2,
          size: 4 + Math.random() * 8,
          rotation: Math.random() * 360,
          shape: Math.random() > 0.5 ? 'circle' : 'square'
        });
      }
      setConfettiPieces(pieces);

      // Auto-hide after duration
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Confetti pieces */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute top-0 ${piece.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: `${piece.animationDuration}s`,
            transform: `rotate(${piece.rotation}deg)`,
            animation: 'confetti-fall linear infinite'
          }}
        />
      ))}

      {/* Celebration message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center animate-bounce-soft">
          <div className="text-8xl mb-4 animate-pulse">
            {emoji}
          </div>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-2xl border border-white/20 dark:border-gray-700/20">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
              {message}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You're doing amazing! Keep it up! 🌟
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

ConfettiCelebration.propTypes = {
  show: PropTypes.bool,
  duration: PropTypes.number,
  onComplete: PropTypes.func,
  message: PropTypes.string,
  emoji: PropTypes.string
};

export default ConfettiCelebration;
