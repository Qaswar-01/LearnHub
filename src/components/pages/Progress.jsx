import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, CheckCircle, BarChart2, Clock, Star, Trophy } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { lessons, quizzes, badges } from '../../data/appData';

function Progress() {
  const { userProgress } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate stats
  const completedLessons = userProgress.completedLessons.length;
  const totalLessons = lessons.length;
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  const totalQuizzesTaken = userProgress.quizResults.length;
  const totalQuizzes = quizzes.length;
  
  const totalCorrectAnswers = userProgress.quizResults.reduce(
    (total, result) => total + result.score, 0
  );
  
  const totalQuizQuestions = userProgress.quizResults.reduce(
    (total, result) => total + result.totalQuestions, 0
  );
  
  const averageQuizScore = totalQuizQuestions > 0 
    ? Math.round((totalCorrectAnswers / totalQuizQuestions) * 100) 
    : 0;
  
  // Get earned badges
  const earnedBadgeIds = Object.keys(badges).filter(badgeId => {
    const badge = badges[badgeId];
    
    switch (badgeId) {
      case 'first-lesson':
        return completedLessons > 0;
      case 'lesson-streak':
        return completedLessons >= 3;
      case 'course-complete':
        return completedLessons === totalLessons;
      case 'first-quiz':
        return totalQuizzesTaken > 0;
      case 'quiz-master':
        return totalQuizzesTaken >= 5;
      case 'perfect-score':
        return userProgress.quizResults.some(result => 
          result.score === result.totalQuestions && result.totalQuestions > 0
        );
      default:
        return false;
    }
  });
  
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-colored">
          <BarChart2 className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gradient">Learning Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Track your progress and celebrate your achievements
          </p>
        </div>
      </div>
      
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card-hover p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200/50 dark:border-primary-700/50 animate-slide-up"
             style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mr-4">
              <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-bold">Lessons</h2>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold">{completedLessons}/{totalLessons}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Lessons completed</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-gray-200 dark:text-gray-700" 
                  strokeWidth="10"
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50" 
                />
                <circle 
                  className="text-primary-500" 
                  strokeWidth="10"
                  strokeDasharray={`${completionPercentage * 2.51} 251`}
                  strokeLinecap="round"
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold">{completionPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mr-4">
              <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-bold">Quizzes</h2>
          </div>
          <div>
            <p className="text-3xl font-bold">{totalQuizzesTaken}/{totalQuizzes}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Quizzes taken</p>
            
            {totalQuizzesTaken > 0 && (
              <div className="mt-2 flex items-center">
                <BarChart2 className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm">
                  {averageQuizScore}% average score
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mr-4">
              <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-bold">Achievements</h2>
          </div>
          <div>
            <p className="text-3xl font-bold">{earnedBadgeIds.length}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Badges earned</p>
            
            <div className="mt-2 flex items-center">
              <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">
                {userProgress.points} points earned
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'lessons' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
          >
            Lessons
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quizzes' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
          >
            Quizzes
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'badges' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
          >
            Badges
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Learning Overview</h2>
          
          {/* Learning Path Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Learning Path Progress</h3>
            
            <div className="space-y-4">
              {lessons.map((lesson) => {
                const isCompleted = userProgress.completedLessons.includes(lesson.id);
                const relatedQuiz = quizzes.find(quiz => quiz.lessonId === lesson.id);
                const quizResult = relatedQuiz ? userProgress.quizResults.find(result => result.quizId === relatedQuiz.id) : null;
                
                return (
                  <div key={lesson.id} className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Link 
                          to={`/lessons/${lesson.id}`}
                          className="font-medium hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {lesson.title}
                        </Link>
                        
                        {quizResult && (
                          <div className="ml-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{quizResult.score}/{quizResult.totalQuestions} on quiz</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {isCompleted ? 'Completed' : 'Not started'}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 ml-4">
                      {isCompleted ? (
                        relatedQuiz && !quizResult ? (
                          <Link 
                            to={`/quiz/${relatedQuiz.id}`}
                            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                          >
                            Take Quiz
                          </Link>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {quizResult ? 'Quiz Completed' : 'No Quiz Available'}
                          </span>
                        )
                      ) : (
                        <Link 
                          to={`/lessons/${lesson.id}`}
                          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          Start Lesson
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            
            {userProgress.completedLessons.length === 0 && userProgress.quizResults.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No activity yet. Start learning by taking your first lesson!
              </p>
            ) : (
              <div className="space-y-4">
                {/* Show most recent quiz results */}
                {userProgress.quizResults.slice(0, 3).map(result => {
                  const quiz = quizzes.find(q => q.id === result.quizId);
                  if (!quiz) return null;
                  
                  return (
                    <div key={result.quizId} className="flex items-start">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Completed quiz: {quiz.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Score: {result.score}/{result.totalQuestions} ({Math.round((result.score / result.totalQuestions) * 100)}%)
                        </p>
                      </div>
                    </div>
                  );
                })}
                
                {/* Show most recent completed lessons */}
                {userProgress.completedLessons.slice(0, 3).map(lessonId => {
                  const lesson = lessons.find(l => l.id === lessonId);
                  if (!lesson) return null;
                  
                  return (
                    <div key={lessonId} className="flex items-start">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
                        <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Completed lesson: {lesson.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {lesson.description.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'lessons' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Lessons Progress</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="space-y-6">
              {lessons.map((lesson) => {
                const isCompleted = userProgress.completedLessons.includes(lesson.id);
                
                return (
                  <div key={lesson.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Clock className="h-6 w-6" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{lesson.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {lesson.description.substring(0, 120)}...
                        </p>
                        
                        <div className="mt-4">
                          <Link 
                            to={`/lessons/${lesson.id}`}
                            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${isCompleted ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800/40'}`}
                          >
                            {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                          </Link>
                        </div>
                      </div>
                      
                      {isCompleted && (
                        <div className="flex-shrink-0 ml-4 flex items-center justify-center w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-full">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'quizzes' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
          
          {userProgress.quizResults.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium">No Quizzes Taken Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
                Complete lessons and take quizzes to test your knowledge and track your progress.
              </p>
              <Link 
                to="/lessons"
                className="mt-4 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800/40"
              >
                Browse Lessons
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {userProgress.quizResults.map(result => {
                const quiz = quizzes.find(q => q.id === result.quizId);
                if (!quiz) return null;
                
                const relatedLesson = lessons.find(l => l.id === quiz.lessonId);
                const percentage = Math.round((result.score / result.totalQuestions) * 100);
                
                return (
                  <div key={result.quizId} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{quiz.title}</h3>
                        {relatedLesson && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Related to: {relatedLesson.title}
                          </p>
                        )}
                        
                        <div className="mt-4 flex items-center">
                          <div className="relative w-16 h-16 mr-4">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle 
                                className="text-gray-200 dark:text-gray-700" 
                                strokeWidth="10"
                                stroke="currentColor" 
                                fill="transparent" 
                                r="40" 
                                cx="50" 
                                cy="50" 
                              />
                              <circle 
                                className={`${percentage >= 70 ? 'text-green-500' : percentage >= 40 ? 'text-yellow-500' : 'text-red-500'}`}
                                strokeWidth="10"
                                strokeDasharray={`${percentage * 2.51} 251`}
                                strokeLinecap="round"
                                stroke="currentColor" 
                                fill="transparent" 
                                r="40" 
                                cx="50" 
                                cy="50" 
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg font-bold">{percentage}%</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-medium">Score: {result.score}/{result.totalQuestions}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {percentage >= 70 ? 'Great job!' : percentage >= 40 ? 'Good effort!' : 'Keep practicing!'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 ml-4 flex flex-col items-end space-y-4">
                        <Link 
                          to={`/quiz/${quiz.id}`}
                          className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800/40"
                        >
                          Retake Quiz
                        </Link>
                        
                        {relatedLesson && (
                          <Link 
                            to={`/lessons/${relatedLesson.id}`}
                            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            Review Lesson
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'badges' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Badges</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            {earnedBadgeIds.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                  <Award className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">No Badges Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
                  Complete lessons and quizzes to earn badges and track your achievements.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {earnedBadgeIds.map(badgeId => {
                  const badge = badges[badgeId];
                  
                  return (
                    <div key={badgeId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                        <span className="text-3xl" role="img" aria-label={badge.name}>
                          {badge.icon}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium">{badge.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {badge.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Available Badges */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4">Available Badges</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(badges)
                  .filter(badgeId => !earnedBadgeIds.includes(badgeId))
                  .map(badgeId => {
                    const badge = badges[badgeId];
                    
                    return (
                      <div key={badgeId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center text-center opacity-50">
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                          <span className="text-3xl" role="img" aria-label={badge.name}>
                            {badge.icon}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium">{badge.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          {badge.description}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Progress;