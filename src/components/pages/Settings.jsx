import { useState } from 'react';
import { Moon, Sun, RefreshCw, Save, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

function Settings() {
  const { darkMode, toggleDarkMode, resetProgress, userProgress } = useAppContext();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    setResetSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setResetSuccess(false);
    }, 3000);
  };
  
  // Calculate user stats for display
  const completedLessons = userProgress.completedLessons.length;
  const totalQuizzes = userProgress.quizResults.length;
  const totalPoints = userProgress.points;
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Appearance</h2>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Theme</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Choose between light and dark mode for the application.
            </p>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="relative inline-flex h-10 w-20 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span className="sr-only">Toggle Dark Mode</span>
            <span
              className={`${darkMode ? 'translate-x-11' : 'translate-x-1'} inline-block h-8 w-8 transform rounded-full bg-white dark:bg-gray-900 transition-transform duration-300 flex items-center justify-center`}
            >
              {darkMode ? (
                <Moon className="h-5 w-5 text-primary-500" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
            </span>
          </button>
        </div>
      </div>
      
      {/* Account Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Account</h2>
        
        <div className="space-y-6">
          {/* Progress Summary */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="font-medium mb-3">Your Progress</h3>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-2xl font-bold">{completedLessons}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Lessons Completed</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-2xl font-bold">{totalQuizzes}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Quizzes Taken</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-2xl font-bold">{totalPoints}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Points Earned</p>
              </div>
            </div>
          </div>
          
          {/* Reset Progress */}
          <div>
            <h3 className="font-medium mb-3">Reset Progress</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              This will reset all your progress, including completed lessons, quiz results, and earned badges. This action cannot be undone.
            </p>
            
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-700 text-sm font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset All Progress
              </button>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Are you sure?</h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                      <p>
                        This will permanently delete all your progress data. This action cannot be undone.
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={handleResetProgress}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Yes, Reset Everything
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {resetSuccess && (
              <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Save className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Your progress has been reset successfully.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">About</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Interactive Learning App</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Version 1.0.0
            </p>
          </div>
          
          <div>
            <h3 className="font-medium">Technologies</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                React
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300">
                Vite
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                Tailwind CSS
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                JavaScript
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                React Router
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300">
                Lucide Icons
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              An interactive learning platform designed to help users learn through lessons and quizzes, track their progress, and earn badges for their achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;