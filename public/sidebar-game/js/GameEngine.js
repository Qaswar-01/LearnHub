// Game Engine for Sidebar Game
class GameEngine {
    constructor() {
        this.currentQuestion = null;
        this.currentType = null;
        this.stats = this.loadStats();
        this.startTime = null;
        this.answerRevealed = false;
    }
    
    // Load stats from localStorage
    loadStats() {
        return UIHelpers.loadFromStorage('sidebar-game-stats', {
            score: 0,
            streak: 0,
            maxStreak: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            gamesPlayed: 0,
            lastPlayed: null
        });
    }
    
    // Save stats to localStorage
    saveStats() {
        this.stats.lastPlayed = new Date().toISOString();
        UIHelpers.saveToStorage('sidebar-game-stats', this.stats);
    }
    
    // Get random question of specified type
    getRandomQuestion(type) {
        if (!GAME_QUESTIONS[type] || GAME_QUESTIONS[type].length === 0) {
            throw new Error(`No questions available for type: ${type}`);
        }
        
        const questions = GAME_QUESTIONS[type];
        const randomIndex = Math.floor(Math.random() * questions.length);
        
        this.currentQuestion = { ...questions[randomIndex] };
        this.currentType = type;
        this.startTime = Date.now();
        this.answerRevealed = false;
        
        return this.currentQuestion;
    }
    
    // Get daily challenge (same question for the day)
    getDailyChallenge() {
        const today = new Date().toDateString();
        const savedDaily = UIHelpers.loadFromStorage('daily-challenge', null);
        
        if (savedDaily && savedDaily.date === today) {
            this.currentQuestion = savedDaily.question;
            this.currentType = savedDaily.type;
            this.startTime = Date.now();
            this.answerRevealed = false;
            return this.currentQuestion;
        }
        
        // Generate new daily challenge
        const types = Object.keys(GAME_QUESTIONS);
        const randomType = types[Math.floor(Math.random() * types.length)];
        const question = this.getRandomQuestion(randomType);
        
        UIHelpers.saveToStorage('daily-challenge', {
            date: today,
            question: this.currentQuestion,
            type: this.currentType
        });
        
        return question;
    }
    
    // Validate user answer
    validateAnswer(userAnswer, isRevealed = false) {
        if (!this.currentQuestion) {
            throw new Error('No current question to validate');
        }
        
        const timeSpent = Date.now() - this.startTime;
        const timeBonusThreshold = 30000; // 30 seconds
        
        let isCorrect = false;
        let feedback = '';
        let pointsEarned = 0;
        
        // Check answer based on question type
        switch (this.currentType) {
            case 'fix-bug':
                isCorrect = this.validateCodeAnswer(userAnswer);
                break;
            case 'flexbox':
                isCorrect = this.validateFlexboxAnswer(userAnswer);
                break;
            case 'selector':
                isCorrect = this.validateSelectorAnswer(userAnswer);
                break;
            case 'html-builder':
                isCorrect = this.validateHTMLAnswer(userAnswer);
                break;
            default:
                isCorrect = userAnswer.trim().toLowerCase() === this.currentQuestion.solution.toLowerCase();
        }
        
        // Handle revealed answers
        if (isRevealed) {
            isCorrect = false;
            pointsEarned = GAME_CONFIG.scoring.show_answer_penalty;
            feedback = `💡 Answer revealed: ${this.currentQuestion.explanation}`;
        } else if (isCorrect) {
            // Calculate points for correct answer
            pointsEarned = this.currentQuestion.points || GAME_CONFIG.scoring.correct;
            
            // Add streak bonus
            if (this.stats.streak > 0) {
                pointsEarned += GAME_CONFIG.scoring.streak_bonus;
            }
            
            // Add time bonus for quick answers
            if (timeSpent < timeBonusThreshold) {
                pointsEarned += GAME_CONFIG.scoring.time_bonus;
            }
            
            feedback = `🎉 Correct! ${this.currentQuestion.explanation}`;
            
            // Update streak
            this.stats.streak++;
            this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.streak);
        } else {
            feedback = `❌ Incorrect. ${this.currentQuestion.explanation}`;
            this.stats.streak = 0;
        }
        
        // Update stats
        this.stats.score += pointsEarned;
        this.stats.totalQuestions++;
        if (isCorrect && !isRevealed) {
            this.stats.correctAnswers++;
        }
        
        this.saveStats();
        
        return {
            isCorrect,
            feedback,
            pointsEarned,
            timeSpent,
            explanation: this.currentQuestion.explanation
        };
    }
    
    // Validate code answer (fix-bug type)
    validateCodeAnswer(userAnswer) {
        const solution = this.currentQuestion.solution.replace(/\s+/g, ' ').trim();
        const answer = userAnswer.replace(/\s+/g, ' ').trim();
        
        // Check if the essential parts are present
        const solutionKeywords = solution.match(/[a-zA-Z_$][a-zA-Z0-9_$]*|[{}();=<>!&|+\-*/]/g) || [];
        const answerKeywords = answer.match(/[a-zA-Z_$][a-zA-Z0-9_$]*|[{}();=<>!&|+\-*/]/g) || [];
        
        // Simple keyword matching (can be enhanced)
        return solutionKeywords.every(keyword => answerKeywords.includes(keyword));
    }
    
    // Validate flexbox answer
    validateFlexboxAnswer(userAnswer) {
        const solution = this.currentQuestion.solution.toLowerCase().replace(/\s+/g, '');
        const answer = userAnswer.toLowerCase().replace(/\s+/g, '');
        
        // Check if all required CSS properties are present
        const requiredProps = solution.split(';').filter(prop => prop.trim());
        return requiredProps.every(prop => answer.includes(prop.trim()));
    }
    
    // Validate CSS selector answer
    validateSelectorAnswer(userAnswer) {
        return userAnswer.trim() === this.currentQuestion.solution;
    }
    
    // Validate HTML structure answer
    validateHTMLAnswer(userAnswer) {
        const solution = this.currentQuestion.solution.toLowerCase().replace(/\s+/g, '');
        const answer = userAnswer.toLowerCase().replace(/\s+/g, '');
        return answer.includes(solution);
    }
    
    // Mark answer as revealed
    revealAnswer() {
        this.answerRevealed = true;
        return this.currentQuestion.solution;
    }
    
    // Get current stats
    getStats() {
        const accuracy = this.stats.totalQuestions > 0 
            ? Math.round((this.stats.correctAnswers / this.stats.totalQuestions) * 100)
            : 0;
            
        return {
            ...this.stats,
            accuracy
        };
    }
    
    // Reset stats
    resetStats() {
        this.stats = {
            score: 0,
            streak: 0,
            maxStreak: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            gamesPlayed: 0,
            lastPlayed: null
        };
        this.saveStats();
    }
    
    // Get hint for current question
    getHint() {
        if (!this.currentQuestion) return null;
        
        switch (this.currentType) {
            case 'fix-bug':
                return 'Look for syntax errors like missing semicolons, wrong operators, or scope issues.';
            case 'flexbox':
                return 'Think about justify-content for horizontal alignment and align-items for vertical alignment.';
            case 'selector':
                return 'Remember: . for classes, # for IDs, > for direct children, and : for pseudo-classes.';
            case 'html-builder':
                return 'Consider the semantic meaning and proper nesting of HTML elements.';
            default:
                return 'Read the question carefully and think about the expected output.';
        }
    }
    
    // Check if daily challenge is available
    isDailyChallengeAvailable() {
        const today = new Date().toDateString();
        const savedDaily = UIHelpers.loadFromStorage('daily-challenge', null);
        const completedDaily = UIHelpers.loadFromStorage('daily-completed', null);
        
        return !completedDaily || completedDaily.date !== today;
    }
    
    // Mark daily challenge as completed
    markDailyChallengeCompleted() {
        const today = new Date().toDateString();
        UIHelpers.saveToStorage('daily-completed', { date: today });
    }
}
