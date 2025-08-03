// Leaderboard System for React Game
export class Leaderboard {
  constructor() {
    this.storageKey = 'learnhub-game-leaderboard';
    this.currentUser = this.getCurrentUser();
    this.initializeLeaderboard();
  }
  
  // Initialize leaderboard with fake data if empty
  initializeLeaderboard() {
    const existing = this.loadFromStorage(this.storageKey, null);
    
    if (!existing || existing.length === 0) {
      const fakeUsers = [
        { name: 'CodeMaster', avatar: '🧙‍♂️', score: 850, streak: 12, accuracy: 94, gamesPlayed: 45 },
        { name: 'FlexboxNinja', avatar: '🥷', score: 720, streak: 8, accuracy: 89, gamesPlayed: 38 },
        { name: 'BugHunter', avatar: '🕵️', score: 680, streak: 15, accuracy: 92, gamesPlayed: 42 },
        { name: 'CSSWizard', avatar: '🧙‍♀️', score: 650, streak: 6, accuracy: 87, gamesPlayed: 35 },
        { name: 'JSGuru', avatar: '🤓', score: 590, streak: 9, accuracy: 85, gamesPlayed: 40 },
        { name: 'HTMLHero', avatar: '🦸', score: 520, streak: 4, accuracy: 83, gamesPlayed: 28 }
      ];
      
      this.saveToStorage(this.storageKey, fakeUsers);
    }
  }
  
  // Get current user info
  getCurrentUser() {
    let user = this.loadFromStorage('learnhub-game-user', null);
    
    if (!user) {
      const avatars = ['😊', '🤖', '🎯', '🚀', '⭐', '🔥', '💎', '🎮', '🏆', '🌟'];
      const adjectives = ['Quick', 'Smart', 'Clever', 'Swift', 'Bright', 'Sharp'];
      const nouns = ['Coder', 'Dev', 'Hacker', 'Builder', 'Maker', 'Creator'];
      
      user = {
        name: `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}`,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        score: 0,
        streak: 0,
        accuracy: 0,
        gamesPlayed: 0,
        joinDate: new Date().toISOString()
      };
      
      this.saveToStorage('learnhub-game-user', user);
    }
    
    return user;
  }
  
  // Update current user stats
  updateCurrentUser(stats) {
    this.currentUser.score = stats.score;
    this.currentUser.streak = stats.streak;
    this.currentUser.accuracy = stats.accuracy;
    this.currentUser.gamesPlayed = stats.totalQuestions;
    
    this.saveToStorage('learnhub-game-user', this.currentUser);
    this.updateLeaderboard();
  }
  
  // Update leaderboard with current user
  updateLeaderboard() {
    let leaderboard = this.loadFromStorage(this.storageKey, []);
    
    // Remove current user if already exists
    leaderboard = leaderboard.filter(user => user.name !== this.currentUser.name);
    
    // Add current user
    leaderboard.push({ ...this.currentUser });
    
    // Sort by score (descending)
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 50
    leaderboard = leaderboard.slice(0, 50);
    
    this.saveToStorage(this.storageKey, leaderboard);
  }
  
  // Get top users
  getTopUsers(limit = 10) {
    const leaderboard = this.loadFromStorage(this.storageKey, []);
    return leaderboard.slice(0, limit);
  }
  
  // Get user rank
  getUserRank() {
    const leaderboard = this.loadFromStorage(this.storageKey, []);
    const userIndex = leaderboard.findIndex(user => user.name === this.currentUser.name);
    return userIndex >= 0 ? userIndex + 1 : null;
  }
  
  // Helper methods
  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }
  
  loadFromStorage(key, defaultValue) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from storage:', error);
      return defaultValue;
    }
  }
}
