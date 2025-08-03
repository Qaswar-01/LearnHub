import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  HelpCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Lock,
  AlertCircle
} from 'lucide-react';
import { lessons, quizzes } from '../../data/appData';
import { useAppContext } from '../../contexts/AppContext';

function LessonDetail() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { userProgress, completeLesson } = useAppContext();
  const [lesson, setLesson] = useState(null);
  const [relatedQuiz, setRelatedQuiz] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [prevLesson, setPrevLesson] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    // Find the current lesson
    const currentLesson = lessons.find(l => l.id === lessonId);
    setLesson(currentLesson);

    if (currentLesson) {
      // Check if lesson is completed
      setIsCompleted(userProgress.completedLessons.includes(currentLesson.id));
      
      // Find related quiz
      const quiz = quizzes.find(q => q.lessonId === currentLesson.id);
      setRelatedQuiz(quiz);
      
      // Find lesson index
      const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
      
      // Set next and previous lessons
      if (currentIndex > 0) {
        setPrevLesson(lessons[currentIndex - 1]);
      } else {
        setPrevLesson(null);
      }
      
      if (currentIndex < lessons.length - 1) {
        setNextLesson(lessons[currentIndex + 1]);
      } else {
        setNextLesson(null);
      }
    }
  }, [lessonId, userProgress.completedLessons]);

  const handleCompleteLesson = () => {
    completeLesson(lessonId);
    setIsCompleted(true);
  };

  // Touch gesture handlers for mobile navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && nextLesson) {
      navigate(`/lessons/${nextLesson.id}`);
    }
    if (isRightSwipe && prevLesson) {
      navigate(`/lessons/${prevLesson.id}`);
    }
  };

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-medium">Lesson not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The lesson you're looking for doesn't exist.</p>
          <Link to="/lessons" className="mt-4 inline-block text-primary-600 dark:text-primary-400 hover:underline">
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mb-16 md:mb-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Lesson navigation - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <Link
          to="/lessons"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center touch-manipulation active:scale-95 w-fit"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Lessons
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            {lesson.duration}
          </div>

          {/* Mobile swipe indicator */}
          <div className="md:hidden flex items-center text-xs text-gray-400 dark:text-gray-500">
            <ChevronLeft className="h-3 w-3" />
            <span className="mx-1">Swipe</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Enhanced Lesson header - Mobile Responsive */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{lesson.duration}</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
          {lesson.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
          {lesson.description}
        </p>
      </div>

      {/* Enhanced Lesson content - Mobile Responsive */}
      <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl sm:rounded-3xl"></div>

        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8 md:mb-10">
          {/* Content header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lesson Content</h2>
          </div>

          <div
            className="prose dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8 prose-h2:text-blue-600 dark:prose-h2:text-blue-400
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6 prose-h3:text-purple-600 dark:prose-h3:text-purple-400
              prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-5 prose-h4:text-emerald-600 dark:prose-h4:text-emerald-400
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-purple-600 dark:prose-code:text-purple-400
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-6
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </div>
      </div>

      {/* Enhanced Action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex gap-4">
          {prevLesson && (
            <button
              onClick={() => navigate(`/lessons/${prevLesson.id}`)}
              className="group relative overflow-hidden bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <ChevronLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="relative z-10">Previous Lesson</span>
            </button>
          )}

          {nextLesson && (
            <button
              onClick={() => navigate(`/lessons/${nextLesson.id}`)}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">Next Lesson</span>
              <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        <div className="flex gap-4">
          {relatedQuiz && (
            <Link
              to={`/quiz/${relatedQuiz.id}`}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <HelpCircle className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12" />
              <span className="relative z-10">Take Quiz</span>
            </Link>
          )}

          {!isCompleted ? (
            <button
              onClick={handleCompleteLesson}
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <CheckCircle className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
              <span className="relative z-10">Mark as Completed</span>
            </button>
          ) : (
            <button
              disabled
              className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-3 rounded-xl font-semibold cursor-not-allowed flex items-center opacity-75"
            >
              <Award className="h-5 w-5 mr-2 text-yellow-300" />
              <span>Completed</span>
            </button>
          )}
        </div>
      </div>

      {/* Enhanced Lesson navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {prevLesson && (
          <Link
            to={`/lessons/${prevLesson.id}`}
            className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex items-start hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-gray-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-600/5 to-slate-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-start w-full">
              <div className="p-2 bg-slate-600 rounded-lg mr-4 group-hover:bg-slate-700 transition-colors">
                <ChevronLeft className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide">Previous Lesson</span>
                <h3 className="font-bold text-slate-900 dark:text-white mt-1 group-hover:text-slate-700 dark:group-hover:text-gray-200 transition-colors">{prevLesson.title}</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1 line-clamp-2">{prevLesson.description}</p>
              </div>
            </div>
          </Link>
        )}

        {nextLesson && (
          <Link
            to={`/lessons/${nextLesson.id}`}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex items-start hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200 dark:border-gray-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-start w-full">
              <div className="flex-1">
                <span className="text-sm font-medium text-blue-500 dark:text-blue-400 uppercase tracking-wide">Next Lesson</span>
                <h3 className="font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{nextLesson.title}</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1 line-clamp-2">{nextLesson.description}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg ml-4 group-hover:from-blue-700 group-hover:to-purple-700 transition-all">
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Related quiz card */}
      {relatedQuiz && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-start">
            <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-4" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{relatedQuiz.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{relatedQuiz.description}</p>
              <Link 
                to={`/quiz/${relatedQuiz.id}`}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Quiz
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonDetail;