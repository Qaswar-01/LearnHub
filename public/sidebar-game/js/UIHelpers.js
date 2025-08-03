// UI Helper Functions for Sidebar Game
class UIHelpers {
    // Show toast notification
    static showToast(message, type = 'info', duration = 3000) {
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
    static shake(element) {
        this.animate(element, 'shake', 500);
    }
    
    // Bounce element (for correct answers)
    static bounce(element) {
        this.animate(element, 'bounce-in', 500);
    }
    
    // Pulse success effect
    static pulseSuccess(element) {
        this.animate(element, 'pulse-success', 1000);
    }
    
    // Show feedback with animation
    static showFeedback(feedbackElement, message, type = 'info') {
        if (!feedbackElement) return;
        
        const colors = {
            success: 'bg-green-100 text-green-800 border-green-200',
            error: 'bg-red-100 text-red-800 border-red-200',
            warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            info: 'bg-blue-100 text-blue-800 border-blue-200'
        };
        
        feedbackElement.className = `rounded-lg p-3 text-sm border ${colors[type] || colors.info}`;
        feedbackElement.innerHTML = message;
        feedbackElement.classList.remove('hidden');
        
        this.animate(feedbackElement, 'game-fade-in');
    }
    
    // Hide feedback
    static hideFeedback(feedbackElement) {
        if (feedbackElement) {
            feedbackElement.classList.add('hidden');
        }
    }
    
    // Update progress bar
    static updateProgressBar(element, percentage) {
        if (!element) return;
        
        element.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        element.classList.add('transition-all', 'duration-500');
    }
    
    // Create confetti effect
    static createConfetti(container) {
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
    
    // Format time (for timers)
    static formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Sanitize HTML to prevent XSS
    static sanitizeHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
    
    // Create code block with syntax highlighting
    static createCodeBlock(code, language = 'javascript') {
        const pre = document.createElement('pre');
        pre.className = 'bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto';
        
        const codeElement = document.createElement('code');
        codeElement.textContent = code;
        pre.appendChild(codeElement);
        
        return pre;
    }
    
    // Create visual flexbox preview
    static createFlexboxPreview(htmlStructure, cssRules) {
        const container = document.createElement('div');
        container.className = 'border rounded p-2 bg-gray-50';
        
        // Create a mini preview
        const preview = document.createElement('div');
        preview.innerHTML = htmlStructure;
        
        // Apply CSS rules
        const pond = preview.querySelector('.pond');
        if (pond && cssRules) {
            const rules = cssRules.split(';').filter(rule => rule.trim());
            rules.forEach(rule => {
                const [property, value] = rule.split(':').map(s => s.trim());
                if (property && value) {
                    pond.style[property.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = value;
                }
            });
        }
        
        container.appendChild(preview);
        return container;
    }
    
    // Smooth scroll to element
    static scrollToElement(element, offset = 0) {
        if (!element) return;
        
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Copy text to clipboard
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Copied to clipboard!', 'success', 1500);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.showToast('Failed to copy text', 'error', 1500);
            return false;
        }
    }
    
    // Generate random ID
    static generateId(prefix = 'id') {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
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
    
    // Clear storage
    static clearStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);
