// Game Page Component - Full page web development game
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Trophy, Zap, Target, Clock, Star, Play, RotateCcw, Code, Server, Palette, Database, Eye, Lightbulb, EyeOff } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { GameEngine } from '../game/GameEngine.js';
import { Leaderboard } from '../game/Leaderboard.js';
import { UIHelpers, gameAnimations } from '../game/UIHelpers.js';
import { GAME_TYPES } from '../../data/gameQuestions.js';

const Game = () => {
  const [searchParams] = useSearchParams();
  const [gameEngine] = useState(() => new GameEngine());
  const [leaderboard] = useState(() => new Leaderboard());
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStats, setGameStats] = useState(gameEngine.getStats());
  const [isLoading, setIsLoading] = useState(false);
  const [gameMode, setGameMode] = useState('random');
  const [selectedType, setSelectedType] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [gameCategory, setGameCategory] = useState(null);
  const [showGameSelection, setShowGameSelection] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const feedbackRef = useRef(null);
  const inputRef = useRef(null);
  const gameRef = useRef(null);
  
  // Initialize animations CSS
  useEffect(() => {
    if (!document.getElementById('game-animations')) {
      const style = document.createElement('style');
      style.id = 'game-animations';
      style.textContent = gameAnimations;
      document.head.appendChild(style);
    }
  }, []);
  
  // Handle URL parameters for category selection
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && ['frontend', 'backend', 'mixed'].includes(categoryParam)) {
      setGameCategory(categoryParam);
      setShowGameSelection(false);
    }
  }, [searchParams]);

  // Load initial question when category is selected
  useEffect(() => {
    if (gameCategory && !showGameSelection && !currentQuestion) {
      loadNewQuestion();
    }
  }, [gameCategory, showGameSelection]);
  
  // Focus input when question changes
  useEffect(() => {
    if (currentQuestion && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentQuestion]);
  
  const loadNewQuestion = async () => {
    setIsLoading(true);
    setShowFeedback(false);
    setShowAnswer(false);
    setUserAnswer('');
    setFeedback('');
    
    try {
      let question;
      if (gameMode === 'daily') {
        question = gameEngine.getDailyChallenge();
      } else if (gameMode === 'type-specific' && selectedType) {
        question = gameEngine.getRandomQuestion(selectedType);
      } else if (gameCategory) {
        const categoryTypes = getCategoryTypes(gameCategory);
        const randomType = categoryTypes[Math.floor(Math.random() * categoryTypes.length)];
        console.log(`Loading ${gameCategory} question of type: ${randomType}`);
        question = gameEngine.getRandomQuestion(randomType);

        // Ensure the question matches the category
        if (gameCategory === 'frontend' && !['flexbox', 'selector', 'html-builder'].includes(question.type || randomType)) {
          // Force frontend question type
          question.type = randomType;
        } else if (gameCategory === 'backend' && (question.type || randomType) !== 'fix-bug') {
          // Force backend question type
          question.type = 'fix-bug';
        }
      } else {
        question = gameEngine.getRandomQuestion();
      }
      
      // Set the question type for mixed questions
      if (question.type && question.type !== selectedType) {
        question.type = question.type;
      } else {
        question.type = selectedType || gameEngine.currentType;
      }

      setCurrentQuestion(question);
      setGameStats(gameEngine.getStats());
    } catch (error) {
      console.error('Failed to load question:', error);
      UIHelpers.showToast('Failed to load question', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryTypes = (category) => {
    if (category === 'frontend') {
      return ['flexbox', 'selector', 'html-builder'];
    } else if (category === 'backend') {
      return ['fix-bug'];
    } else if (category === 'mixed') {
      return ['mixed']; // Use the mixed question type specifically
    }
    return Object.keys(GAME_TYPES);
  };

  const handleCategorySelect = (category) => {
    setGameCategory(category);
    setShowGameSelection(false);
    // Reset difficulty when starting a new game
    gameEngine.resetDifficulty();
    setCurrentQuestion(null);
  };

  const handleBackToSelection = () => {
    setShowGameSelection(true);
    setGameCategory(null);
    setCurrentQuestion(null);
    setShowFeedback(false);
    setShowAnswer(false);
    setUserAnswer('');
    setFeedback('');
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !userAnswer.trim()) {
      UIHelpers.shakeElement(inputRef.current);
      return;
    }
    
    setIsLoading(true);
    
    try {
      let result;
      
      // Check if answer was revealed but then hidden and user typed correct answer
      if (showAnswer) {
        // If they're submitting while answer is still showing, penalize
        result = {
          isCorrect: false,
          feedback: `💡 Answer is currently revealed. Hide it first and type your own answer.`,
          pointsEarned: -5
        };

        // Record as incorrect in game engine
        gameEngine.recordAnswer(false, currentQuestion);
      } else {
        // Normal answer validation - even if answer was previously revealed
        result = gameEngine.validateAnswer(userAnswer, false);

        // If they got it right after seeing the answer, give partial credit
        if (result.isCorrect && gameEngine.answerRevealed) {
          result.pointsEarned = Math.max(1, Math.floor(result.pointsEarned * 0.5)); // 50% points
          result.feedback = `✅ Correct! (Partial credit since answer was shown) ${currentQuestion.explanation}`;
        }
      }
      
      setFeedback(result.feedback);
      setShowFeedback(true);
      setGameStats(gameEngine.getStats());
      
      // Update leaderboard
      leaderboard.updateCurrentUser(gameEngine.getStats());
      
      // Show feedback with animation
      if (feedbackRef.current) {
        UIHelpers.showFeedback(
          feedbackRef.current,
          result.feedback,
          showAnswer ? 'warning' : (result.isCorrect ? 'success' : 'error'),
          0
        );
      }
      
      // Animate result
      if (result.isCorrect && !showAnswer) {
        UIHelpers.bounceElement(gameRef.current);
        if (result.pointsEarned) {
          UIHelpers.showToast(`+${result.pointsEarned} points!`, 'success', 2000);
        }
        if (gameRef.current) {
          UIHelpers.createConfetti(gameRef.current);
        }
      } else {
        UIHelpers.shakeElement(inputRef.current);
        if (showAnswer) {
          UIHelpers.showToast('Answer was revealed: -5 points', 'warning', 2000);
        }
      }
      
    } catch (error) {
      console.error('Failed to validate answer:', error);
      UIHelpers.showToast('Failed to validate answer', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNextQuestion = () => {
    loadNewQuestion();
  };

  const handleShowAnswer = () => {
    if (!currentQuestion) return;

    if (showAnswer) {
      // Hide answer - clear the field and reset state
      setShowAnswer(false);
      setUserAnswer('');
    } else {
      // Show answer - fill in the correct answer and mark as revealed
      setShowAnswer(true);
      setUserAnswer(currentQuestion.solution || currentQuestion.correctAnswer || '');
      // Mark in game engine that answer was revealed
      gameEngine.answerRevealed = true;
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showFeedback) {
        handleNextQuestion();
      } else {
        handleSubmitAnswer();
      }
    }
  };

  const renderQuestionContent = () => {
    if (!currentQuestion) return null;
    
    const gameType = GAME_TYPES[currentQuestion.type];
    
    return (
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex items-center justify-center space-x-3">
          <span className="text-3xl">{gameType?.icon}</span>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentQuestion.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {gameType?.name} • {currentQuestion.difficulty}
            </p>
          </div>
        </div>
        
        {/* Question */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {currentQuestion.question}
          </p>
        </div>
        
        {/* Question-specific content */}
        {currentQuestion.type === 'fix-bug' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
              Buggy Code:
            </div>
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto bg-white dark:bg-gray-900 p-4 rounded-lg">
              {currentQuestion.code || currentQuestion.buggyCode}
            </pre>
            {currentQuestion.expectedOutput && (
              <div className="mt-4">
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                  Expected Output:
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  {currentQuestion.expectedOutput}
                </p>
              </div>
            )}
          </div>
        )}
        
        {currentQuestion.type === 'flexbox' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
                  HTML Structure:
                </div>
                <pre className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                  {currentQuestion.htmlStructure}
                </pre>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
                  CSS Template:
                </div>
                <pre className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                  {currentQuestion.cssTemplate}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {currentQuestion.type === 'selector' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
              HTML Structure:
            </div>
            <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-4 rounded-lg">
              {currentQuestion.htmlSnippet}
            </pre>
          </div>
        )}

        {currentQuestion.type === 'html-builder' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
              Expected Output:
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg font-mono">
              {currentQuestion.expectedStructure}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderInput = () => {
    if (!currentQuestion) return null;
    
    if (currentQuestion.type === 'selector' && currentQuestion.options) {
      // Multiple choice for selector questions
      return (
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setUserAnswer(option)}
              className={`w-full text-left p-4 rounded-xl border transition-colors ${
                userAnswer === option
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              disabled={showFeedback}
            >
              <code className="text-sm font-mono">{option}</code>
            </button>
          ))}
        </div>
      );
    }
    
    // Text area for other question types
    return (
      <div className="relative">
        <textarea
          ref={inputRef}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            currentQuestion.type === 'fix-bug' 
              ? 'Paste the corrected code here...'
              : currentQuestion.type === 'flexbox'
              ? 'Enter CSS property (e.g., justify-content: center;)'
              : 'Enter your answer...'
          }
          className={`w-full h-32 p-4 border rounded-xl font-mono text-sm resize-none focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:text-white ${
            showAnswer 
              ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600' 
              : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
          }`}
          disabled={showFeedback}
        />
        {showAnswer && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
            <Lightbulb className="h-3 w-3" />
            <span>Answer Shown</span>
          </div>
        )}
      </div>
    );
  };

  const renderGameSelection = () => {
    return (
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl">🎮</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Web Development Game
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Test your web development skills with interactive coding challenges. Choose your preferred category and start learning!
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Frontend Category */}
          <div
            onClick={() => handleCategorySelect('frontend')}
            className="group cursor-pointer p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto w-fit">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Frontend Games
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Master CSS Flexbox, Selectors & HTML Building
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">🐸 Flexbox</span>
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">🎯 Selectors</span>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">🏗️ HTML</span>
              </div>
            </div>
          </div>

          {/* Backend Category */}
          <div
            onClick={() => handleCategorySelect('backend')}
            className="group cursor-pointer p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center space-y-4">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mx-auto w-fit">
                <Server className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                Backend Games
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                JavaScript Debugging & Logic Challenges
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">🐛 Bug Fixes</span>
                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full">⚡ Logic</span>
              </div>
            </div>
          </div>

          {/* Mixed Category */}
          <div
            onClick={() => handleCategorySelect('mixed')}
            className="group cursor-pointer p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mx-auto w-fit">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Mixed Challenge
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Random questions from all categories
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">🎲 Random</span>
                <span className="text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full">🔥 Challenge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Your Progress</h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {gameStats.score}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {gameStats.streak}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Best Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {gameStats.accuracy}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={gameRef} className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              {!showGameSelection && (
                <button
                  onClick={handleBackToSelection}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <span>•</span>
                  <span>Change Category</span>
                </button>
              )}
            </div>

            {!showGameSelection && (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {gameCategory} Mode
                </div>
                <button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
                >
                  <Trophy className="h-3 w-3" />
                  <span>Leaderboard</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showGameSelection ? (
          renderGameSelection()
        ) : showLeaderboard ? (
          <div className="max-w-2xl mx-auto">
            <LeaderboardView leaderboard={leaderboard} onClose={() => setShowLeaderboard(false)} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Game Stats */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {gameStats.score}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {gameStats.streak}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {gameStats.accuracy}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400 capitalize">
                    {gameStats.currentDifficulty || 'Easy'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Difficulty ({gameStats.questionsInCurrentDifficulty || 0}/{gameStats.questionsPerDifficulty || 3})
                  </div>
                  {gameStats.progressToNextDifficulty > 0 && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${gameStats.progressToNextDifficulty}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Game Content */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : currentQuestion ? (
                <div className="space-y-6">
                  {/* Question Content */}
                  {renderQuestionContent()}

                  {/* Answer Input */}
                  <div className="max-w-2xl mx-auto">
                    {renderInput()}
                  </div>

                  {/* Feedback */}
                  <div ref={feedbackRef} className="hidden"></div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <div className="flex justify-center items-center space-x-4 flex-wrap gap-2">
                      {!showFeedback ? (
                        <>
                          <button
                            onClick={handleSubmitAnswer}
                            disabled={!userAnswer.trim() || isLoading}
                            className={`px-8 py-3 font-medium rounded-xl transition-colors ${
                              showAnswer
                                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                          >
                            {isLoading
                              ? 'Checking...'
                              : showAnswer
                                ? 'Submit (Revealed Answer)'
                                : 'Submit Answer'
                            }
                          </button>

                          <button
                            onClick={handleShowAnswer}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                            title={showAnswer ? "Hide the answer" : "Show the correct answer"}
                          >
                            {showAnswer ? <EyeOff className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
                            <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors flex items-center space-x-2"
                        >
                          <Play className="h-4 w-4" />
                          <span>Next Question</span>
                        </button>
                      )}

                      <button
                        onClick={loadNewQuestion}
                        className="px-4 py-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="New Question"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Help Text */}
                    {!showFeedback && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {showAnswer
                            ? "💡 Answer is shown! You can hide it or submit (counts as incorrect)"
                            : "💡 Stuck? Use 'Show Answer' to reveal the correct solution"
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Start?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Click the button below to load your first question!
                  </p>
                  <button
                    onClick={loadNewQuestion}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                  >
                    Start Game
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Leaderboard View Component
const LeaderboardView = ({ leaderboard, onClose }) => {
  const [topUsers, setTopUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setTopUsers(leaderboard.getTopUsers(10));
    setCurrentUser(leaderboard.getCurrentUser());
  }, [leaderboard]);

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Leaderboard
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          Close
        </button>
      </div>

      <div className="space-y-3">
        {topUsers.map((user, index) => (
          <div
            key={user.name}
            className={`flex items-center space-x-4 p-4 rounded-xl ${
              user.name === currentUser?.name
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-800'
            }`}
          >
            <div className="flex-shrink-0 w-8 text-center">
              {index < 3 ? (
                <span className="text-xl">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-500">
                  {index + 1}
                </span>
              )}
            </div>
            <div className="text-xl">{user.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user.accuracy}% accuracy • {user.streak} streak
              </div>
            </div>
            <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {user.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
