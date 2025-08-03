import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  BookOpen,
  Star,
  Zap,
  Target,
  TrendingUp,
  Sparkles,
  Play,
  Award,
  Rocket,
  Code,
  Palette,
  Globe,
  Database,
  Smartphone,
  Lock,
  Layers,
  Server,
  Cloud,
  Cpu,
  FileCode,
  GitBranch,
  Settings,
  Monitor,
  Wifi,
  AlertCircle
} from 'lucide-react';
import { lessons } from '../../data/appData';
import { useAppContext } from '../../contexts/AppContext';
import LockedLessonModal from '../ui/LockedLessonModal';

function Lessons() {
  const { userProgress } = useAppContext();
  const [lockedModalOpen, setLockedModalOpen] = useState(false);
  const [selectedLockedLesson, setSelectedLockedLesson] = useState(null);

  const handleLockedLessonClick = (lesson, index) => {
    setSelectedLockedLesson(lesson);
    setLockedModalOpen(true);
  };

  const getNextAvailableLesson = () => {
    const nextIndex = userProgress.completedLessons.length;
    return lessons[nextIndex] || null;
  };

  // Beautiful gradient combinations for lesson cards
  const cardGradients = [
    'from-violet-600 via-purple-600 to-pink-600',
    'from-blue-600 via-cyan-600 to-teal-600',
    'from-orange-600 via-red-600 to-pink-600',
    'from-green-600 via-emerald-600 to-cyan-600',
    'from-indigo-600 via-blue-600 to-purple-600',
    'from-pink-600 via-rose-600 to-orange-600',
    'from-teal-600 via-green-600 to-lime-600',
    'from-purple-600 via-indigo-600 to-blue-600',
    'from-amber-600 via-yellow-600 to-orange-600',
    'from-slate-600 via-gray-600 to-zinc-600',
    'from-emerald-600 via-teal-600 to-cyan-600',
    'from-rose-600 via-pink-600 to-purple-600'
  ];

  // Icons for different lesson types
  const lessonIcons = {
    'JavaScript Introduction & Setup': Globe,
    'JavaScript Basics & Syntax': Code,
    'Functions & Control Flow': Target,
    'Arrays & Objects': Database,
    'DOM Manipulation': Monitor,
    'Events & Event Handling': Zap,
    'Error Handling & Debugging': AlertCircle,
    'Asynchronous JavaScript': Cpu,
    'Working with APIs & Fetch': Wifi,
    'Object-Oriented Programming': Layers,
    'ES6+ Modern Features': Sparkles,
    'Local Storage & Session Storage': Server,
    'JavaScript Projects & Best Practices': Rocket
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-fade-in">
      {/* Stunning Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-4xl mx-4 md:mx-6 mt-6 mb-8 shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl animate-bounce-soft"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-2xl animate-pulse"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-8 right-8 animate-bounce-soft">
          <Sparkles className="h-8 w-8 text-yellow-300" />
        </div>
        <div className="absolute top-16 left-8 animate-float">
          <Star className="h-6 w-6 text-pink-300" />
        </div>
        <div className="absolute bottom-8 right-16 animate-pulse">
          <Rocket className="h-7 w-7 text-cyan-300" />
        </div>

        <div className="relative p-4 sm:p-6 md:p-8 lg:p-16 text-white">
          <div className="max-w-4xl">
            {/* Main Title - Responsive */}
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 md:space-x-6 mb-6 sm:mb-8 text-center sm:text-left">
              <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl md:rounded-4xl border border-white/20 shadow-2xl mb-4 sm:mb-0">
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-2 sm:mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                    Interactive
                  </span>
                  <br />
                  <span className="text-white">Lessons</span>
                  <span className="inline-block ml-2 sm:ml-4 text-2xl sm:text-3xl md:text-4xl animate-bounce-soft">🚀</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                  Master <span className="font-bold text-yellow-300 bg-yellow-300/20 px-3 py-1 rounded-full">web development</span> through
                  <br />
                  <span className="font-bold text-cyan-300 bg-cyan-300/20 px-3 py-1 rounded-full mt-2 inline-block">hands-on learning</span> experiences ✨
                </p>
              </div>
            </div>

            {/* Enhanced Progress Section */}
            <div className="bg-white/15 backdrop-blur-xl rounded-4xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Your Progress</h3>
                    <p className="text-white/80">Keep up the amazing work!</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-yellow-300">{userProgress.completedLessons}</div>
                  <div className="text-white/80 font-medium">lessons completed</div>
                </div>
              </div>

              {/* Beautiful Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Overall Progress</span>
                  <span className="text-yellow-300 font-bold text-lg">
                    {Math.round((userProgress.completedLessons / lessons.length) * 100)}%
                  </span>
                </div>
                <div className="relative h-4 bg-white/20 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full shadow-lg transition-all duration-1000 ease-out"
                    style={{ width: `${(userProgress.completedLessons / lessons.length) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-300" />
                    <span>{userProgress.completedLessons} completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-cyan-300" />
                    <span>{lessons.length - userProgress.completedLessons} remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stunning Lessons Grid */}
      <div className="px-3 sm:px-4 md:px-6 pb-12 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Progress - Responsive */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
              Choose Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Adventure</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 mb-6">
              Each lesson is crafted to build your skills progressively. Start your coding journey today! 🎯
            </p>

            {/* Progress Indicator */}
            <div className="max-w-md mx-auto px-4">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Progress</span>
                <span>{userProgress.completedLessons.length} of {lessons.length} completed</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(userProgress.completedLessons.length / lessons.length) * 100}%` }}
                >
                  <div className="h-full bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Lessons Grid - Enhanced Mobile-First Responsive Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {lessons.map((lesson, index) => {
              const isCompleted = userProgress.completedLessons.length > index;
              const isNext = userProgress.completedLessons.length === index;
              const isLocked = userProgress.completedLessons.length < index;
              const gradient = cardGradients[index % cardGradients.length];
              const IconComponent = lessonIcons[lesson.title] || Code;

              return (
                <div key={lesson.id} className="group relative h-full">
                  {/* Enhanced Interactive Card Container */}
                  <div className={`
                    relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-700 transform group-hover:scale-[1.02] group-active:scale-[0.98] h-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px] flex flex-col touch-manipulation
                    ${isCompleted ? 'shadow-xl sm:shadow-2xl shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-1 sm:hover:-translate-y-2 ring-1 ring-green-400/20' : ''}
                    ${isNext ? 'shadow-xl sm:shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/40 hover:-translate-y-2 sm:hover:-translate-y-3 ring-2 sm:ring-4 ring-yellow-400/50 animate-pulse' : ''}
                    ${isLocked ? 'opacity-70 hover:opacity-85 shadow-lg shadow-gray-500/20' : ''}
                    hover:shadow-2xl cursor-pointer border border-white/20 group
                  `}>
                    {/* Enhanced Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-95`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Enhanced Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/15 rounded-full blur-2xl animate-pulse group-hover:scale-110 transition-transform duration-700"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-3xl animate-float group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>

                      {/* Sparkle effects for completed lessons */}
                      {isCompleted && (
                        <>
                          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                          <div className="absolute bottom-8 right-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-bounce"></div>
                        </>
                      )}
                    </div>

                    {/* Card Content - Mobile-First Responsive Layout */}
                    <div
                      className="relative flex flex-col p-4 sm:p-5 md:p-6 lg:p-8 text-white h-full cursor-pointer"
                      onClick={(e) => {
                        if (isLocked) {
                          e.preventDefault();
                          handleLockedLessonClick(lesson, index);
                        } else {
                          window.location.href = `/lessons/${lesson.id}`;
                        }
                      }}
                    >
                      {/* Status Badge - Mobile Responsive */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                        {isCompleted && (
                          <div className="p-1.5 sm:p-2 bg-green-500 rounded-full shadow-lg animate-bounce-soft">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                        )}
                        {isNext && (
                          <div className="p-1.5 sm:p-2 bg-yellow-500 rounded-full shadow-lg animate-pulse">
                            <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                        )}
                        {isLocked && (
                          <div className="p-1.5 sm:p-2 bg-red-500/80 rounded-full shadow-lg">
                            <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Enhanced Lesson Icon - Mobile Responsive */}
                      <div className="mb-4 sm:mb-5 md:mb-6">
                        <div className="relative p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl w-fit border border-white/30 shadow-2xl group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-3xl"></div>
                          <IconComponent className="relative z-10 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white group-hover:text-yellow-100 transition-colors duration-300" />

                          {/* Difficulty indicator dots - Responsive */}
                          <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 flex gap-0.5 sm:gap-1">
                            {[...Array(lesson.difficulty || 1)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                  i < (lesson.difficulty || 1)
                                    ? 'bg-yellow-300 shadow-lg shadow-yellow-300/50'
                                    : 'bg-white/30'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Lesson Info - Mobile Responsive */}
                      <div className="flex-1 flex flex-col space-y-3 sm:space-y-4 relative z-10">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-yellow-200 transition-colors duration-300 leading-tight">
                            {lesson.title}
                          </h3>
                          <p className="text-white/90 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 group-hover:text-white transition-colors duration-300">
                            {lesson.description}
                          </p>
                        </div>

                        {/* Enhanced Lesson Meta - Better Responsive Design */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2 pt-4 border-t border-white/20 group-hover:border-white/30 transition-colors duration-300">
                            <div className="flex items-center space-x-2 text-white/80 group-hover:text-white transition-colors duration-300 min-w-0 flex-1">
                              <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300 flex-shrink-0">
                                <Clock className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-sm font-semibold truncate">{lesson.duration}</span>
                            </div>
                            <div className="flex items-center justify-end space-x-1 min-w-0">
                              <span className="text-xs text-white/70 mr-1 font-medium hidden sm:inline whitespace-nowrap">Difficulty:</span>
                              <div className="flex items-center space-x-0.5 flex-shrink-0">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 md:h-3.5 md:w-3.5 transition-all duration-300 flex-shrink-0 ${
                                      i < (lesson.difficulty || 1)
                                        ? 'text-yellow-300 fill-current drop-shadow-lg group-hover:scale-110'
                                        : 'text-white/30 group-hover:text-white/40'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Action Button - Always at Bottom */}
                          <div className="mt-auto">
                            <div className={`
                              w-full py-3 px-4 rounded-2xl font-bold text-center transition-all duration-500 relative overflow-hidden text-sm md:text-base
                              ${isCompleted ? 'bg-green-500/25 text-green-100 border border-green-400/40 shadow-lg shadow-green-500/20' : ''}
                              ${isNext ? 'bg-yellow-500/25 text-yellow-100 border border-yellow-400/40 animate-pulse shadow-lg shadow-yellow-500/20' : ''}
                              ${isLocked ? 'bg-red-500/20 text-red-200 border border-red-400/30 shadow-lg shadow-red-500/10' : ''}
                              group-hover:bg-white/25 group-hover:border-white/50 group-hover:scale-105 group-hover:shadow-xl
                            `}>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                {isCompleted && (
                                  <>
                                    <Award className="h-4 w-4" />
                                    <span className="hidden sm:inline">Completed</span>
                                    <span className="sm:hidden">✓</span>
                                  </>
                                )}
                                {isNext && (
                                  <>
                                    <Rocket className="h-4 w-4" />
                                    <span className="hidden sm:inline">Start Learning</span>
                                    <span className="sm:hidden">Start</span>
                                  </>
                                )}
                                {isLocked && (
                                  <>
                                    <Lock className="h-4 w-4" />
                                    <span>Locked</span>
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Floating Number Badge */}
                  <div className="absolute -top-4 -left-4 z-20">
                    <div className={`
                      w-14 h-14 rounded-full flex items-center justify-center font-black text-white shadow-2xl border-4 border-white/20 transition-all duration-500 group-hover:scale-110
                      ${isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30' : ''}
                      ${isNext ? 'bg-gradient-to-br from-yellow-500 to-orange-600 animate-bounce-soft shadow-yellow-500/40' : ''}
                      ${isLocked ? 'bg-gradient-to-br from-gray-500 to-gray-600 shadow-gray-500/20' : ''}
                    `}>
                      <span className="text-lg drop-shadow-lg">{index + 1}</span>

                      {/* Status indicator ring */}
                      <div className={`
                        absolute inset-0 rounded-full border-2 transition-all duration-500
                        ${isCompleted ? 'border-green-300 animate-pulse' : ''}
                        ${isNext ? 'border-yellow-300 animate-spin-slow' : ''}
                        ${isLocked ? 'border-gray-400' : ''}
                      `}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Access to Next Lesson - Mobile Floating Button */}
      {getNextAvailableLesson() && (
        <div className="fixed bottom-20 md:bottom-6 left-4 z-40 md:hidden">
          <Link
            to={`/lessons/${getNextAvailableLesson().id}`}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation active:scale-95"
          >
            <Play className="h-4 w-4" />
            <span className="text-sm font-medium">Continue</span>
          </Link>
        </div>
      )}

      {/* Locked Lesson Modal */}
      <LockedLessonModal
        isOpen={lockedModalOpen}
        onClose={() => setLockedModalOpen(false)}
        lockedLesson={selectedLockedLesson}
        nextAvailableLesson={getNextAvailableLesson()}
      />
    </div>
  );
}

export default Lessons;