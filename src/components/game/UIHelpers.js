// UI Helper Functions for React Game
export class UIHelpers {
  // Show toast notification
  static showToast(message, type = 'info', duration = 3000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white font-medium shadow-lg transform transition-all duration-300 translate-x-full`;
    
    // Set color based on type
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    
    toast.classList.add(colors[type] || colors.info);
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
  
  // Add animation class to element
  static animate(element, animationClass, duration = 500) {
    if (!element) return;
    
    element.classList.add(animationClass);
    
    setTimeout(() => {
      element.classList.remove(animationClass);
    }, duration);
  }
  
  // Shake element (for wrong answers)
  static shakeElement(element) {
    if (!element) return;
    
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  }
  
  // Bounce element (for correct answers)
  static bounceElement(element) {
    if (!element) return;
    
    element.style.animation = 'bounce 0.5s ease-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  }
  
  // Show feedback with animation
  static showFeedback(feedbackElement, message, type = 'info', delay = 0) {
    if (!feedbackElement) return;
    
    setTimeout(() => {
      const colors = {
        success: 'bg-green-100 text-green-800 border-green-200',
        error: 'bg-red-100 text-red-800 border-red-200',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200'
      };
      
      feedbackElement.className = `rounded-lg p-3 text-sm border ${colors[type] || colors.info}`;
      feedbackElement.innerHTML = message;
      feedbackElement.classList.remove('hidden');
      
      // Add fade-in animation
      feedbackElement.style.opacity = '0';
      feedbackElement.style.transform = 'translateY(10px)';
      feedbackElement.style.transition = 'all 0.3s ease-in-out';
      
      setTimeout(() => {
        feedbackElement.style.opacity = '1';
        feedbackElement.style.transform = 'translateY(0)';
      }, 50);
    }, delay);
  }
  
  // Create confetti effect
  static createConfetti(container) {
    if (!container) return;
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: confetti-fall 2s ease-out forwards;
      `;
      
      container.appendChild(confetti);
      
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 2000);
    }
  }
  
  // Local storage helpers
  static saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }
  
  static loadFromStorage(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }
}

// Game animations CSS
export const gameAnimations = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes bounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
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
  
  .game-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
