// Main Sidebar Game Controller
class SidebarGame {
    constructor() {
        this.gameEngine = new GameEngine();
        this.leaderboard = new Leaderboard();
        this.currentQuestion = null;
        this.isOpen = false;
        this.answerRevealed = false;
        
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
    }
    
    // Initialize DOM elements
    initializeElements() {
        this.sidebar = document.getElementById('game-sidebar');
        this.gameSelector = document.getElementById('game-selector');
        this.gameContent = document.getElementById('game-content');
        this.gameQuestion = document.getElementById('game-question');
        this.gameInput = document.getElementById('game-input');
        this.mcqOptions = document.getElementById('mcq-options');
        this.submitBtn = document.getElementById('submit-answer');
        this.showAnswerBtn = document.getElementById('show-answer-btn');
        this.nextBtn = document.getElementById('next-question');
        this.feedback = document.getElementById('feedback');
        this.closeBtn = document.getElementById('close-game');
        this.leaderboardBtn = document.getElementById('leaderboard-btn');
        this.leaderboardModal = document.getElementById('leaderboard-modal');
        
        // Stats elements
        this.scoreEl = document.getElementById('score');
        this.streakEl = document.getElementById('streak');
        this.accuracyEl = document.getElementById('accuracy');
    }
    
    // Bind event listeners
    bindEvents() {
        // Close button
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Game type buttons
        document.querySelectorAll('.game-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                this.startGame(type);
            });
        });
        
        // Submit answer
        this.submitBtn.addEventListener('click', () => this.submitAnswer());
        
        // Show answer toggle
        this.showAnswerBtn.addEventListener('click', () => this.toggleAnswer());
        
        // Next question
        this.nextBtn.addEventListener('click', () => this.loadNextQuestion());
        
        // Leaderboard
        this.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        document.getElementById('close-leaderboard').addEventListener('click', () => this.hideLeaderboard());
        
        // Enter key to submit
        this.gameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.submitAnswer();
            }
        });
        
        // Click outside to close
        this.leaderboardModal.addEventListener('click', (e) => {
            if (e.target === this.leaderboardModal) {
                this.hideLeaderboard();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!this.leaderboardModal.classList.contains('hidden')) {
                    this.hideLeaderboard();
                } else if (this.isOpen) {
                    this.close();
                }
            }
        });
    }
    
    // Open sidebar
    open() {
        this.isOpen = true;
        this.sidebar.classList.remove('translate-x-full');
        this.showGameSelector();
        this.updateStats();
        
        // Add body class to prevent scrolling
        document.body.style.overflow = 'hidden';
    }
    
    // Close sidebar
    close() {
        this.isOpen = false;
        this.sidebar.classList.add('translate-x-full');
        
        // Remove body class
        document.body.style.overflow = '';
        
        // Reset game state
        this.showGameSelector();
        this.resetGameState();
    }
    
    // Show game selector
    showGameSelector() {
        this.gameSelector.classList.remove('hidden');
        this.gameContent.classList.add('hidden');
    }
    
    // Start game of specified type
    startGame(type) {
        try {
            this.currentQuestion = this.gameEngine.getRandomQuestion(type);
            this.displayQuestion();
            this.gameSelector.classList.add('hidden');
            this.gameContent.classList.remove('hidden');
            this.resetGameState();
        } catch (error) {
            UIHelpers.showToast(`Error loading game: ${error.message}`, 'error');
        }
    }
    
    // Display current question
    displayQuestion() {
        if (!this.currentQuestion) return;
        
        const gameType = GAME_CONFIG.types[this.gameEngine.currentType];
        
        // Update question header
        document.getElementById('game-icon').textContent = gameType.icon;
        document.getElementById('game-title').textContent = this.currentQuestion.title;
        document.getElementById('game-description').textContent = this.currentQuestion.description;
        
        // Show type-specific content
        this.displayQuestionContent();
        
        // Reset input
        this.gameInput.value = '';
        this.gameInput.style.display = 'block';
        this.mcqOptions.classList.add('hidden');
        
        // Focus input
        setTimeout(() => this.gameInput.focus(), 100);
    }
    
    // Display question-specific content
    displayQuestionContent() {
        const codeBlock = document.getElementById('game-code-block');
        const visual = document.getElementById('game-visual');
        
        // Hide all content first
        codeBlock.classList.add('hidden');
        visual.classList.add('hidden');
        
        switch (this.gameEngine.currentType) {
            case 'fix-bug':
                codeBlock.textContent = this.currentQuestion.code;
                codeBlock.classList.remove('hidden');
                break;
                
            case 'flexbox':
                codeBlock.textContent = this.currentQuestion.cssTemplate;
                codeBlock.classList.remove('hidden');
                
                // Create visual preview
                visual.innerHTML = '';
                const preview = UIHelpers.createFlexboxPreview(
                    this.currentQuestion.htmlStructure, 
                    ''
                );
                visual.appendChild(preview);
                visual.classList.remove('hidden');
                break;
                
            case 'selector':
                codeBlock.textContent = this.currentQuestion.htmlSnippet;
                codeBlock.classList.remove('hidden');
                
                // Show multiple choice options
                if (this.currentQuestion.options) {
                    this.showMultipleChoice();
                }
                break;
                
            case 'html-builder':
                if (this.currentQuestion.targetStructure) {
                    codeBlock.textContent = `Target: ${this.currentQuestion.targetStructure}`;
                    codeBlock.classList.remove('hidden');
                }
                break;
        }
    }
    
    // Show multiple choice options
    showMultipleChoice() {
        this.gameInput.style.display = 'none';
        this.mcqOptions.classList.remove('hidden');
        this.mcqOptions.innerHTML = '';
        
        this.currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors';
            button.innerHTML = `<code class="text-sm font-mono">${option}</code>`;
            button.addEventListener('click', () => {
                // Remove previous selection
                this.mcqOptions.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('bg-blue-100', 'border-blue-500');
                });
                
                // Mark as selected
                button.classList.add('bg-blue-100', 'border-blue-500');
                this.gameInput.value = option;
            });
            
            this.mcqOptions.appendChild(button);
        });
    }
    
    // Submit answer
    submitAnswer() {
        const answer = this.gameInput.value.trim();
        
        if (!answer) {
            UIHelpers.shake(this.gameInput);
            UIHelpers.showToast('Please enter an answer', 'warning');
            return;
        }
        
        try {
            const result = this.gameEngine.validateAnswer(answer, this.answerRevealed);
            this.showFeedback(result);
            this.updateStats();
            
            // Disable input and show next button
            this.gameInput.disabled = true;
            this.submitBtn.style.display = 'none';
            this.showAnswerBtn.style.display = 'none';
            this.nextBtn.classList.remove('hidden');
            
            // Animate result
            if (result.isCorrect && !this.answerRevealed) {
                UIHelpers.bounce(this.gameQuestion);
                UIHelpers.createConfetti(this.sidebar);
                UIHelpers.showToast(`+${result.pointsEarned} points!`, 'success');
            } else {
                UIHelpers.shake(this.gameInput);
            }
            
        } catch (error) {
            UIHelpers.showToast(`Error: ${error.message}`, 'error');
        }
    }
    
    // Toggle show/hide answer
    toggleAnswer() {
        if (this.answerRevealed) {
            // Hide answer
            this.answerRevealed = false;
            this.gameInput.value = '';
            this.showAnswerBtn.innerHTML = '💡';
            this.showAnswerBtn.title = 'Show Answer';
            this.gameInput.classList.remove('bg-yellow-50', 'border-yellow-300');
        } else {
            // Show answer
            this.answerRevealed = true;
            const answer = this.gameEngine.revealAnswer();
            this.gameInput.value = answer;
            this.showAnswerBtn.innerHTML = '👁️';
            this.showAnswerBtn.title = 'Hide Answer';
            this.gameInput.classList.add('bg-yellow-50', 'border-yellow-300');
            UIHelpers.showToast('Answer revealed! Submit to continue (counts as incorrect)', 'warning');
        }
    }
    
    // Show feedback
    showFeedback(result) {
        const type = result.isCorrect ? 'success' : 'error';
        UIHelpers.showFeedback(this.feedback, result.feedback, type);
    }
    
    // Load next question
    loadNextQuestion() {
        this.startGame(this.gameEngine.currentType);
    }
    
    // Reset game state
    resetGameState() {
        this.answerRevealed = false;
        this.gameInput.disabled = false;
        this.gameInput.value = '';
        this.gameInput.classList.remove('bg-yellow-50', 'border-yellow-300');
        this.submitBtn.style.display = 'block';
        this.showAnswerBtn.style.display = 'block';
        this.showAnswerBtn.innerHTML = '💡';
        this.showAnswerBtn.title = 'Show Answer';
        this.nextBtn.classList.add('hidden');
        UIHelpers.hideFeedback(this.feedback);
    }
    
    // Update stats display
    updateStats() {
        const stats = this.gameEngine.getStats();
        this.scoreEl.textContent = stats.score;
        this.streakEl.textContent = stats.streak;
        this.accuracyEl.textContent = `${stats.accuracy}%`;
        
        // Update leaderboard
        this.leaderboard.updateCurrentUser(stats);
    }
    
    // Show leaderboard
    showLeaderboard() {
        const topUsers = this.leaderboard.getTopUsers(10);
        const currentUser = this.leaderboard.getCurrentUser();
        const content = document.getElementById('leaderboard-content');
        
        content.innerHTML = '';
        
        topUsers.forEach((user, index) => {
            const isCurrentUser = user.name === currentUser.name;
            const entry = document.createElement('div');
            entry.className = `flex items-center space-x-3 p-2 rounded-lg ${
                isCurrentUser ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50'
            }`;
            
            const rank = index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`;
            
            entry.innerHTML = `
                <div class="w-8 text-center font-bold">${rank}</div>
                <div class="text-xl">${user.avatar}</div>
                <div class="flex-1">
                    <div class="font-medium text-sm">${user.name}</div>
                    <div class="text-xs text-gray-500">${user.accuracy}% accuracy</div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-blue-600">${user.score}</div>
                    <div class="text-xs text-gray-500">🔥${user.streak}</div>
                </div>
            `;
            
            content.appendChild(entry);
        });
        
        this.leaderboardModal.classList.remove('hidden');
    }
    
    // Hide leaderboard
    hideLeaderboard() {
        this.leaderboardModal.classList.add('hidden');
    }
}
