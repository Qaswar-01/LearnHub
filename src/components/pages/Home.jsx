import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, BarChart2, Sparkles, Target, Zap, TrendingUp, Star, Rocket } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { lessons } from '../../data/appData';

function Home() {
  const { userProgress, calculateOverallProgress } = useAppContext();

  // Calculate overall progress
  const overallProgress = calculateOverallProgress(lessons.length);
  
  // Get recently viewed or in-progress lessons
  const recentLessons = lessons
    .filter(lesson => userProgress.completedLessons.includes(lesson.id))
    .slice(0, 2);
  
  // Get recommended lessons (not completed yet)
  const recommendedLessons = lessons
    .filter(lesson => !userProgress.completedLessons.includes(lesson.id))
    .slice(0, 2);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-4xl p-8 md:p-12 text-white shadow-large">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-emerald-400/15 rounded-full blur-lg animate-bounce-soft"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-violet-400/15 rounded-full blur-xl animate-pulse"></div>

        {/* Floating sparkles */}
        <div className="absolute top-8 right-8">
          <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute bottom-12 right-16">
          <Star className="h-4 w-4 text-pink-300 animate-bounce-soft" />
        </div>
        <div className="absolute top-16 left-16">
          <Zap className="h-5 w-5 text-cyan-300 animate-pulse" />
        </div>

        <div className="relative max-w-4xl">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Rocket className="h-5 w-5 text-yellow-300 animate-bounce-soft" />
                <span className="text-sm font-medium text-white">Welcome to the future of learning!</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
                LearnHub
              </span>
              <span className="inline-block ml-2 animate-bounce-soft">🚀</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-2xl">
              Your <span className="font-semibold text-yellow-300">interactive learning platform</span> for mastering web development skills through
              <span className="font-semibold text-cyan-300"> engaging lessons</span> and
              <span className="font-semibold text-pink-300"> hands-on practice</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/lessons"
              className="group relative overflow-hidden inline-flex items-center px-10 py-5 bg-gradient-to-r from-white via-yellow-50 to-orange-50 text-purple-700 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-yellow-500/30 hover:scale-110 transition-all duration-500 ease-out border-2 border-white/50"
            >
              {/* Enhanced shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-lg"></div>

              {/* Floating elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>

              <div className="relative z-10 flex items-center">
                <div className="p-2 bg-purple-100 rounded-2xl mr-4 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="h-6 w-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <span className="relative font-bold group-hover:text-purple-800 transition-colors duration-300">Start Learning</span>
                <div className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-2xl">
                  🎯
                </div>
              </div>

              {/* Pulsing border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-yellow-400/50 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/progress"
              className="group relative overflow-hidden inline-flex items-center px-10 py-5 bg-white/15 backdrop-blur-lg text-white rounded-3xl font-bold text-lg border-2 border-white/30 hover:bg-white/25 hover:scale-110 transition-all duration-500 ease-out shadow-2xl hover:shadow-cyan-500/20"
            >
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Floating sparkles */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>

              <div className="relative z-10 flex items-center">
                <div className="p-2 bg-white/20 rounded-2xl mr-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <BarChart2 className="h-6 w-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <span className="relative font-bold group-hover:text-cyan-100 transition-colors duration-300">View Progress</span>
                <div className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-2xl">
                  📊
                </div>
              </div>

              {/* Pulsing border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
            </Link>


          </div>

          {/* Enhanced Stats preview */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
            <div className="group text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-yellow-300 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <div className="text-2xl md:text-3xl font-bold text-white">5</div>
              </div>
              <div className="text-sm text-white/80">Interactive Lessons</div>
              <div className="text-xs text-yellow-300 mt-1">📚 Ready to explore</div>
            </div>
            <div className="group text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-6 w-6 text-cyan-300 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <div className="text-2xl md:text-3xl font-bold text-white">25+</div>
              </div>
              <div className="text-sm text-white/80">Quiz Questions</div>
              <div className="text-xs text-cyan-300 mt-1">🎯 Test your skills</div>
            </div>
            <div className="group text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-pink-300 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <div className="text-2xl md:text-3xl font-bold text-white animate-pulse">∞</div>
              </div>
              <div className="text-sm text-white/80">Learning Potential</div>
              <div className="text-xs text-pink-300 mt-1">🚀 Unlimited growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Progress overview */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800/80 dark:via-gray-700/80 dark:to-gray-800/80 p-8 rounded-4xl border border-indigo-200/50 dark:border-gray-600/50 shadow-large animate-slide-up">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 dark:from-purple-400/5 dark:to-pink-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-cyan-400/10 dark:from-indigo-400/5 dark:to-cyan-400/5 rounded-full blur-2xl"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-colored">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Your Learning Journey</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Track your amazing progress! 🌟</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/40 dark:to-cyan-900/40 rounded-full border border-emerald-200/50 dark:border-emerald-600/50">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-200">Active Learning</span>
              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-300 animate-bounce-soft" />
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-800/20 p-6 rounded-3xl border border-blue-200/50 dark:border-blue-700/50 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 bg-indigo-400/20 rounded-full animate-pulse"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-colored">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl animate-bounce-soft">📚</div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">
                {userProgress.completedLessons.length}
              </div>
              <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Lessons Completed</div>
              <div className="mt-2 flex items-center space-x-2">
                <div className="text-xs text-blue-600/70 dark:text-blue-400/70">
                  {userProgress.completedLessons.length > 0 ? 'Great progress!' : 'Start your journey'}
                </div>
                {userProgress.completedLessons.length > 0 && (
                  <div className="text-xs">🎉</div>
                )}
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-teal-800/20 p-6 rounded-3xl border border-emerald-200/50 dark:border-emerald-700/50 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 bg-green-400/20 rounded-full animate-pulse"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-colored">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl animate-bounce-soft">🎯</div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">
                {userProgress.quizResults.length}
              </div>
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Quizzes Taken</div>
              <div className="mt-2 flex items-center space-x-2">
                <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
                  {userProgress.quizResults.length > 0 ? 'Knowledge tested!' : 'Ready to test?'}
                </div>
                {userProgress.quizResults.length > 0 && (
                  <div className="text-xs">🧠</div>
                )}
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-800/20 p-6 rounded-3xl border border-amber-200/50 dark:border-amber-700/50 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 bg-orange-400/20 rounded-full animate-pulse"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-colored">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl animate-bounce-soft">⭐</div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-200">
                {userProgress.points}
              </div>
              <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">Points Earned</div>
              <div className="mt-2 flex items-center space-x-2">
                <div className="text-xs text-amber-600/70 dark:text-amber-400/70">
                  {userProgress.points > 0 ? 'Keep earning!' : 'Start earning'}
                </div>
                {userProgress.points > 0 && (
                  <div className="text-xs">💎</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-600/50 shadow-large">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/5 to-pink-400/5 dark:from-purple-400/10 dark:to-pink-400/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-colored">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Overall Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{overallProgress}%</span>
                <div className="text-2xl animate-bounce-soft">🚀</div>
              </div>
            </div>

            {/* Enhanced progress bar */}
            <div className="relative mb-6">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full shadow-colored transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${overallProgress}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
                </div>
              </div>
              {/* Progress indicator */}
              {overallProgress > 0 && (
                <div
                  className="absolute top-0 h-6 flex items-center transition-all duration-1000 ease-out"
                  style={{ left: `${Math.max(overallProgress - 5, 0)}%` }}
                >
                  <div className="w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {overallProgress === 100 ? 'Amazing! All complete!' : 'Keep going! You\'re doing great.'}
                </span>
                <div className="text-sm">
                  {overallProgress > 75 ? '🔥' : overallProgress > 50 ? '💪' : overallProgress > 25 ? '📈' : '🌱'}
                </div>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                  {userProgress.completedLessons.length} of {lessons.length} lessons
                </span>
                <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue learning section */}
        <section className="card-hover p-8 animate-slide-up">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-colored mr-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gradient">Continue Learning</h2>
          </div>
          
          {recentLessons.length > 0 ? (
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="group block p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl hover:shadow-medium hover:scale-105 transition-all duration-300 ease-out"

                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>
                    <div className="ml-4 p-2 bg-success-100 dark:bg-success-900/30 rounded-xl">
                      <Award className="h-5 w-5 text-success-600 dark:text-success-400" />
                    </div>
                  </div>
                </Link>
              ))}

              <Link
                to="/lessons"
                className="group inline-flex items-center text-sm text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 mt-4 transition-colors"
              >
                View all lessons
                <div className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</div>
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
                <div className="relative p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-3xl border border-primary-200/50 dark:border-primary-700/50 inline-block">
                  <BookOpen className="h-12 w-12 text-primary-500 dark:text-primary-400 mx-auto animate-float" />
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">Ready to start learning?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                Begin your web development journey with our interactive lessons and hands-on exercises.
              </p>
              <div className="mt-8">
                <Link
                  to="/lessons"
                  className="group relative overflow-hidden inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-3xl font-bold text-lg shadow-2xl hover:shadow-purple-500/30 hover:scale-110 transition-all duration-500 ease-out border border-white/20"
                >
                  {/* Enhanced shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>

                  {/* Floating sparkles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-center">
                    <div className="p-2 bg-white/20 rounded-2xl mr-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <BookOpen className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span className="group-hover:text-yellow-100 transition-colors duration-300">Start Your First Lesson</span>
                    <div className="ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-2xl">
                      🚀
                    </div>
                  </div>

                  {/* Pulsing border effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/30 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Recommended section */}
        <section className="card-hover p-8 animate-slide-up">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl shadow-colored mr-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gradient-warm">Recommended for You</h2>
          </div>
          
          {recommendedLessons.length > 0 ? (
            <div className="space-y-4">
              {recommendedLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="group block p-5 bg-gradient-to-r from-accent-50 to-warning-50 dark:from-accent-900/20 dark:to-warning-900/20 border border-accent-200/50 dark:border-accent-700/50 rounded-2xl hover:shadow-medium hover:scale-105 transition-all duration-300 ease-out"

                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-accent-600 dark:text-accent-400 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="mt-3 flex items-center space-x-4">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-warning-500 rounded-full mr-2"></div>
                          {lesson.duration}
                        </div>
                        <div className="badge-warning">
                          Recommended
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 p-2 bg-warning-100 dark:bg-warning-900/30 rounded-xl">
                      <BookOpen className="h-5 w-5 text-warning-600 dark:text-warning-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-success-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
                <div className="relative p-6 bg-gradient-to-br from-success-50 to-accent-50 dark:from-success-900/20 dark:to-accent-900/20 rounded-3xl border border-success-200/50 dark:border-success-700/50 inline-block">
                  <Award className="h-12 w-12 text-success-500 dark:text-success-400 mx-auto animate-bounce-soft" />
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100">Congratulations!</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                You've completed all available lessons. You're a web development champion!
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </section>
      </div>


    </div>
  );
}

export default Home;