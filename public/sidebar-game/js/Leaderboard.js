// Leaderboard System for Sidebar Game
class Leaderboard {
    constructor() {
        this.storageKey = 'sidebar-game-leaderboard';
        this.currentUser = this.getCurrentUser();
        this.initializeLeaderboard();
    }
    
    // Initialize leaderboard with some fake data if empty
    initializeLeaderboard() {
        const existing = UIHelpers.loadFromStorage(this.storageKey, null);
        
        if (!existing || existing.length === 0) {
            const fakeUsers = [
                { name: 'CodeMaster', avatar: '🧙‍♂️', score: 850, streak: 12, accuracy: 94, gamesPlayed: 45 },
                { name: 'FlexboxNinja', avatar: '🥷', score: 720, streak: 8, accuracy: 89, gamesPlayed: 38 },
                { name: 'BugHunter', avatar: '🕵️', score: 680, streak: 15, accuracy: 92, gamesPlayed: 42 },
                { name: 'CSSWizard', avatar: '🧙‍♀️', score: 650, streak: 6, accuracy: 87, gamesPlayed: 35 },
                { name: 'JSGuru', avatar: '🤓', score: 590, streak: 9, accuracy: 85, gamesPlayed: 40 },
                { name: 'HTMLHero', avatar: '🦸', score: 520, streak: 4, accuracy: 83, gamesPlayed: 28 },
                { name: 'DevRookie', avatar: '👶', score: 450, streak: 3, accuracy: 78, gamesPlayed: 25 },
                { name: 'CodeCrafter', avatar: '⚒️', score: 380, streak: 7, accuracy: 81, gamesPlayed: 22 }
            ];
            
            UIHelpers.saveToStorage(this.storageKey, fakeUsers);
        }
    }
    
    // Get current user info
    getCurrentUser() {
        let user = UIHelpers.loadFromStorage('sidebar-game-user', null);
        
        if (!user) {
            // Generate random user
            const avatars = ['😊', '🤖', '🎯', '🚀', '⭐', '🔥', '💎', '🎮', '🏆', '🌟'];
            const adjectives = ['Quick', 'Smart', 'Clever', 'Swift', 'Bright', 'Sharp', 'Fast', 'Cool'];
            const nouns = ['Coder', 'Dev', 'Hacker', 'Builder', 'Maker', 'Creator', 'Ninja', 'Pro'];
            
            user = {
                name: `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}`,
                avatar: avatars[Math.floor(Math.random() * avatars.length)],
                score: 0,
                streak: 0,
                accuracy: 0,
                gamesPlayed: 0,
                joinDate: new Date().toISOString()
            };
            
            UIHelpers.saveToStorage('sidebar-game-user', user);
        }
        
        return user;
    }
    
    // Update current user stats
    updateCurrentUser(stats) {
        this.currentUser.score = stats.score;
        this.currentUser.streak = stats.streak;
        this.currentUser.accuracy = stats.accuracy;
        this.currentUser.gamesPlayed = stats.totalQuestions;
        
        UIHelpers.saveToStorage('sidebar-game-user', this.currentUser);
        this.updateLeaderboard();
    }
    
    // Update leaderboard with current user
    updateLeaderboard() {
        let leaderboard = UIHelpers.loadFromStorage(this.storageKey, []);
        
        // Remove current user if already exists
        leaderboard = leaderboard.filter(user => user.name !== this.currentUser.name);
        
        // Add current user
        leaderboard.push({ ...this.currentUser });
        
        // Sort by score (descending)
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Keep only top 50
        leaderboard = leaderboard.slice(0, 50);
        
        UIHelpers.saveToStorage(this.storageKey, leaderboard);
    }
    
    // Get top users
    getTopUsers(limit = 10) {
        const leaderboard = UIHelpers.loadFromStorage(this.storageKey, []);
        return leaderboard.slice(0, limit);
    }
    
    // Get user rank
    getUserRank() {
        const leaderboard = UIHelpers.loadFromStorage(this.storageKey, []);
        const userIndex = leaderboard.findIndex(user => user.name === this.currentUser.name);
        return userIndex >= 0 ? userIndex + 1 : null;
    }
    
    // Get leaderboard stats
    getLeaderboardStats() {
        const leaderboard = UIHelpers.loadFromStorage(this.storageKey, []);
        
        if (leaderboard.length === 0) {
            return {
                totalPlayers: 0,
                averageScore: 0,
                highestScore: 0,
                averageAccuracy: 0
            };
        }
        
        const totalScore = leaderboard.reduce((sum, user) => sum + user.score, 0);
        const totalAccuracy = leaderboard.reduce((sum, user) => sum + user.accuracy, 0);
        
        return {
            totalPlayers: leaderboard.length,
            averageScore: Math.round(totalScore / leaderboard.length),
            highestScore: Math.max(...leaderboard.map(user => user.score)),
            averageAccuracy: Math.round(totalAccuracy / leaderboard.length)
        };
    }
    
    // Reset leaderboard
    resetLeaderboard() {
        UIHelpers.clearStorage(this.storageKey);
        this.initializeLeaderboard();
    }
    
    // Change user name
    changeUserName(newName) {
        if (!newName || newName.trim().length === 0) {
            return false;
        }
        
        // Check if name is already taken
        const leaderboard = UIHelpers.loadFromStorage(this.storageKey, []);
        const nameExists = leaderboard.some(user => 
            user.name.toLowerCase() === newName.trim().toLowerCase() && 
            user.name !== this.currentUser.name
        );
        
        if (nameExists) {
            return false;
        }
        
        const oldName = this.currentUser.name;
        this.currentUser.name = newName.trim();
        
        // Update in leaderboard
        let updatedLeaderboard = leaderboard.map(user => 
            user.name === oldName ? { ...user, name: newName.trim() } : user
        );
        
        UIHelpers.saveToStorage('sidebar-game-user', this.currentUser);
        UIHelpers.saveToStorage(this.storageKey, updatedLeaderboard);
        
        return true;
    }
    
    // Change user avatar
    changeUserAvatar(newAvatar) {
        this.currentUser.avatar = newAvatar;
        UIHelpers.saveToStorage('sidebar-game-user', this.currentUser);
        this.updateLeaderboard();
    }
    
    // Get achievement badges
    getAchievements() {
        const achievements = [];
        const stats = this.currentUser;
        
        // Score-based achievements
        if (stats.score >= 1000) achievements.push({ name: 'Score Master', icon: '🏆', description: 'Reached 1000 points' });
        if (stats.score >= 500) achievements.push({ name: 'High Scorer', icon: '⭐', description: 'Reached 500 points' });
        if (stats.score >= 100) achievements.push({ name: 'Getting Started', icon: '🎯', description: 'Reached 100 points' });
        
        // Streak-based achievements
        if (stats.streak >= 20) achievements.push({ name: 'Unstoppable', icon: '🔥', description: '20+ answer streak' });
        if (stats.streak >= 10) achievements.push({ name: 'On Fire', icon: '🚀', description: '10+ answer streak' });
        if (stats.streak >= 5) achievements.push({ name: 'Hot Streak', icon: '⚡', description: '5+ answer streak' });
        
        // Accuracy-based achievements
        if (stats.accuracy >= 95) achievements.push({ name: 'Perfectionist', icon: '💎', description: '95%+ accuracy' });
        if (stats.accuracy >= 85) achievements.push({ name: 'Sharp Shooter', icon: '🎯', description: '85%+ accuracy' });
        if (stats.accuracy >= 75) achievements.push({ name: 'Good Aim', icon: '👍', description: '75%+ accuracy' });
        
        // Games played achievements
        if (stats.gamesPlayed >= 100) achievements.push({ name: 'Dedicated', icon: '🎮', description: 'Played 100+ games' });
        if (stats.gamesPlayed >= 50) achievements.push({ name: 'Regular Player', icon: '🎲', description: 'Played 50+ games' });
        if (stats.gamesPlayed >= 10) achievements.push({ name: 'Getting Hooked', icon: '🎪', description: 'Played 10+ games' });
        
        return achievements;
    }
    
    // Export leaderboard data
    exportData() {
        const data = {
            user: this.currentUser,
            leaderboard: UIHelpers.loadFromStorage(this.storageKey, []),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    }
    
    // Import leaderboard data
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.user) {
                UIHelpers.saveToStorage('sidebar-game-user', data.user);
                this.currentUser = data.user;
            }
            
            if (data.leaderboard) {
                UIHelpers.saveToStorage(this.storageKey, data.leaderboard);
            }
            
            return true;
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    }
}
