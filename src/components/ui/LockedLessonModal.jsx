import { X, Lock, ArrowRight, BookOpen, Target } from 'lucide-react';

function LockedLessonModal({ isOpen, onClose, lockedLesson, nextAvailableLesson }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal - Mobile Responsive */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header with gradient - Mobile Responsive */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-6 text-white relative">
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl">
              <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Lesson Locked</h3>
              <p className="text-white/90 text-sm">Complete prerequisites first</p>
            </div>
          </div>
        </div>
        
        {/* Content - Mobile Responsive */}
        <div className="p-4 sm:p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="h-4 w-4" />
              Locked Content
            </div>
            
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {lockedLesson?.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This lesson is currently locked. You need to complete the previous lessons in order to unlock it.
            </p>
          </div>
          
          {nextAvailableLesson && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white text-sm">Start Here</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Next available lesson</p>
                </div>
              </div>
              
              <h6 className="font-medium text-gray-900 dark:text-white mb-1">
                {nextAvailableLesson.title}
              </h6>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {nextAvailableLesson.description}
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors touch-manipulation active:scale-95"
            >
              Close
            </button>

            {nextAvailableLesson && (
              <button
                onClick={() => {
                  onClose();
                  window.location.href = `/lessons/${nextAvailableLesson.id}`;
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation active:scale-95"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockedLessonModal;
