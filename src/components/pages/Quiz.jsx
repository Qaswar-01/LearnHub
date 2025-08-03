import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, X, Award } from 'lucide-react';
import { quizzes, lessons, badges } from '../../data/appData';
import { useAppContext } from '../../contexts/AppContext';

// Question component
function QuizQuestion({ question, userAnswer, onAnswerSelect, showFeedback, isLastQuestion, onNextQuestion, onSubmitQuiz }) {
  const isCorrect = userAnswer === question.correctAnswer;
  
  return (
    <div className="card-gradient p-8 animate-slide-up">
      <h3 className="text-2xl font-bold mb-6 text-gradient">{question.question}</h3>
      
      {question.type === 'multiple-choice' ? (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = userAnswer === option;
            let optionClass = "border border-gray-300 dark:border-gray-700 rounded-lg p-4 transition-colors";
            
            if (showFeedback) {
              if (option === question.correctAnswer) {
                optionClass = "border border-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg p-4";
              } else if (isSelected) {
                optionClass = "border border-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-4";
              }
            } else if (isSelected) {
              optionClass = "border border-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4";
            } else {
              optionClass = "border border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer";
            }
            
            return (
              <div 
                key={index} 
                className={optionClass}
                onClick={() => !showFeedback && onAnswerSelect(option)}
              >
                <div className="flex items-center">
                  <div className="flex-1">{option}</div>
                  {showFeedback && option === question.correctAnswer && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                  {showFeedback && isSelected && option !== question.correctAnswer && (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="flex items-center border-b border-gray-300 dark:border-gray-700 pb-2">
            <input
              type="text"
              value={userAnswer || ''}
              onChange={(e) => !showFeedback && onAnswerSelect(e.target.value)}
              disabled={showFeedback}
              placeholder="Type your answer here"
              className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
            />
          </div>
          
          {showFeedback && (
            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'}`}>
              {isCorrect ? (
                <div className="flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Correct!</p>
                    <p className="text-sm mt-1">{question.explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start">
                  <X className="h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Incorrect</p>
                    <p className="text-sm mt-1">The correct answer is: <span className="font-medium">{question.correctAnswer}</span></p>
                    <p className="text-sm mt-1">{question.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {showFeedback && (
        <div className="mt-6 flex justify-end">
          {isLastQuestion ? (
            <button
              onClick={onSubmitQuiz}
              className="btn-primary"
            >
              Finish Quiz
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              className="btn-primary flex items-center"
            >
              Next Question
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Quiz results component
function QuizResults({ quiz, answers, score, onRetry, earnedBadges }) {
  const navigate = useNavigate();
  const percentage = Math.round((score / quiz.questions.length) * 100);
  const relatedLesson = lessons.find(lesson => lesson.id === quiz.lessonId);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
          <Award className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold">Quiz Completed!</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          You scored {score} out of {quiz.questions.length} questions correctly.
        </p>
      </div>
      
      {/* Score visualization */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
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
            <span className="text-3xl font-bold">{percentage}%</span>
          </div>
        </div>
      </div>
      
      {/* Earned badges */}
      {earnedBadges.length > 0 && (
        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
          <h3 className="text-lg font-medium mb-3">Badges Earned</h3>
          <div className="flex flex-wrap gap-3">
            {earnedBadges.map(badgeId => {
              const badge = badges[badgeId];
              return (
                <div key={badgeId} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-2xl mr-2" role="img" aria-label={badge.name}>
                    {badge.icon}
                  </span>
                  <div>
                    <p className="font-medium">{badge.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Question review */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Question Review</h3>
        {quiz.questions.map((question, index) => {
          const isCorrect = answers[index] === question.correctAnswer;
          
          return (
            <div 
              key={question.id} 
              className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'}`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 p-1 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'} mr-3 mt-0.5`}>
                  {isCorrect ? (
                    <Check className="h-3 w-3 text-white" />
                  ) : (
                    <X className="h-3 w-3 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{question.question}</p>
                  <div className="mt-1 text-sm">
                    <p>
                      <span className="text-gray-600 dark:text-gray-400">Your answer: </span>
                      <span className={isCorrect ? 'text-green-700 dark:text-green-300 font-medium' : 'text-red-700 dark:text-red-300 font-medium'}>
                        {answers[index] || '(No answer)'}  
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-gray-600 dark:text-gray-400">
                        Correct answer: <span className="text-green-700 dark:text-green-300 font-medium">{question.correctAnswer}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={onRetry}
          className="btn-secondary flex-1"
        >
          Try Again
        </button>
        
        {relatedLesson && (
          <button
            onClick={() => navigate(`/lessons/${relatedLesson.id}`)}
            className="btn-secondary flex-1"
          >
            Review Lesson
          </button>
        )}
        
        <button
          onClick={() => navigate('/progress')}
          className="btn-primary flex-1"
        >
          View Progress
        </button>
      </div>
    </div>
  );
}

// Main Quiz component
function Quiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { saveQuizResult, userProgress } = useAppContext();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    // Find the quiz
    const currentQuiz = quizzes.find(q => q.id === quizId);
    if (currentQuiz) {
      setQuiz(currentQuiz);
      // Initialize answers array
      setAnswers(new Array(currentQuiz.questions.length).fill(''));
    }
  }, [quizId]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleCheckAnswer = () => {
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    const newScore = answers.reduce((total, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? total + 1 : total;
    }, 0);
    
    setScore(newScore);
    
    // Save quiz result
    saveQuizResult(quiz.id, newScore, quiz.questions.length);
    
    // Check for earned badges
    const newBadges = [];
    if (newScore === quiz.questions.length) {
      newBadges.push('perfect-score');
    }
    if (userProgress.quizResults.length === 0) {
      newBadges.push('first-quiz');
    }
    if (userProgress.quizResults.length >= 4) {
      newBadges.push('quiz-master');
    }
    
    setEarnedBadges(newBadges);
    setQuizCompleted(true);
  };

  const handleRetry = () => {
    setAnswers(new Array(quiz.questions.length).fill(''));
    setCurrentQuestionIndex(0);
    setShowFeedback(false);
    setQuizCompleted(false);
    setScore(0);
  };

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-medium">Quiz not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The quiz you're looking for doesn't exist.</p>
          <Link to="/lessons" className="mt-4 inline-block text-primary-600 dark:text-primary-400 hover:underline">
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Quiz header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <Link 
            to="/lessons" 
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Lessons
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mt-4">{quiz.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{quiz.description}</p>
      </div>

      {/* Quiz progress */}
      {!quizCompleted && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm font-medium">
              {Math.round(((currentQuestionIndex) / quiz.questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${((currentQuestionIndex) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Quiz content */}
      {!quizCompleted ? (
        <div className="space-y-6">
          <QuizQuestion 
            question={currentQuestion}
            userAnswer={answers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            showFeedback={showFeedback}
            isLastQuestion={currentQuestionIndex === quiz.questions.length - 1}
            onNextQuestion={handleNextQuestion}
            onSubmitQuiz={handleSubmitQuiz}
          />
          
          {!showFeedback && (
            <div className="flex justify-end">
              <button
                onClick={handleCheckAnswer}
                disabled={!answers[currentQuestionIndex]}
                className={`btn-primary ${!answers[currentQuestionIndex] ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Check Answer
              </button>
            </div>
          )}
        </div>
      ) : (
        <QuizResults 
          quiz={quiz} 
          answers={answers} 
          score={score} 
          onRetry={handleRetry}
          earnedBadges={earnedBadges}
        />
      )}
    </div>
  );
}

export default Quiz;