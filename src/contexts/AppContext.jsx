import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AppContext = createContext();

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);

// Initial state for user progress
const initialProgress = {
  completedLessons: [],
  quizResults: [],
  points: 0,
  badges: [],
};

// Provider component
export const AppProvider = ({ children }) => {
  // Theme state (light/dark)
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // User progress state
  const [userProgress, setUserProgress] = useState(() => {
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : initialProgress;
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Update localStorage when progress changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Mark a lesson as completed
  const completeLesson = (lessonId) => {
    setUserProgress(prev => {
      // Only add if not already completed
      if (!prev.completedLessons.includes(lessonId)) {
        return {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
          points: prev.points + 10, // Award points for completing a lesson
        };
      }
      return prev;
    });
  };

  // Save quiz result
  const saveQuizResult = (quizId, score, totalQuestions) => {
    setUserProgress(prev => {
      // Check if this quiz has been taken before
      const existingIndex = prev.quizResults.findIndex(result => result.quizId === quizId);
      
      // Calculate percentage score
      const percentage = Math.round((score / totalQuestions) * 100);
      
      // Determine if this is a new high score
      const isNewHighScore = existingIndex === -1 || percentage > prev.quizResults[existingIndex].percentage;
      
      // Points to award (more points for first-time completion or improved score)
      const pointsToAdd = isNewHighScore ? (existingIndex === -1 ? 50 : 25) : 10;
      
      // Create new quiz results array
      let newQuizResults = [...prev.quizResults];
      if (existingIndex === -1) {
        newQuizResults.push({ quizId, score, totalQuestions, percentage, date: new Date().toISOString() });
      } else if (isNewHighScore) {
        newQuizResults[existingIndex] = { 
          ...newQuizResults[existingIndex],
          score, 
          totalQuestions, 
          percentage,
          date: new Date().toISOString() 
        };
      }
      
      // Check for badges
      let newBadges = [...prev.badges];
      
      // Perfect score badge
      if (percentage === 100 && !prev.badges.includes('perfect-score')) {
        newBadges.push('perfect-score');
      }
      
      // First quiz badge
      if (prev.quizResults.length === 0 && !prev.badges.includes('first-quiz')) {
        newBadges.push('first-quiz');
      }
      
      // Quiz master (5+ quizzes)
      if (prev.quizResults.length >= 4 && !prev.badges.includes('quiz-master')) {
        newBadges.push('quiz-master');
      }
      
      return {
        ...prev,
        quizResults: newQuizResults,
        points: prev.points + pointsToAdd,
        badges: newBadges,
      };
    });
  };

  // Reset all progress
  const resetProgress = () => {
    setUserProgress(initialProgress);
  };

  // Calculate overall progress percentage
  const calculateOverallProgress = (totalLessons) => {
    if (totalLessons === 0) return 0;
    return Math.round((userProgress.completedLessons.length / totalLessons) * 100);
  };

  // Context value
  const value = {
    darkMode,
    toggleDarkMode,
    userProgress,
    completeLesson,
    saveQuizResult,
    resetProgress,
    calculateOverallProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};