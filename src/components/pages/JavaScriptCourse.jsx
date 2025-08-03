import { useState } from 'react';
import { Play, Clock, Star, CheckCircle, Lock } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

function JavaScriptCourse() {
  const { userProgress } = useAppContext();
  const [currentVideo, setCurrentVideo] = useState(0);

  // Updated video durations to ~1h 20min each

  // JavaScript Course Video Data
  const courseVideos = [
    {
      id: 1,
      title: 'JavaScript Introduction & Setup',
      embedUrl: 'https://www.youtube.com/embed/ajdRvxDWH4w?si=za8O3yUDwsVO-35a',
      duration: '1h 20min',
      description: 'Learn what JavaScript is, its history, and how to set up your development environment.'
    },
    {
      id: 2,
      title: 'JavaScript Basics & Syntax',
      embedUrl: 'https://www.youtube.com/embed/Zg4-uSjxosE?si=AqZdOtDiBwMvdYK2',
      duration: '1h 18min',
      description: 'Master JavaScript fundamentals including variables, data types, and basic operations.'
    },
    {
      id: 3,
      title: 'Functions & Control Flow',
      embedUrl: 'https://www.youtube.com/embed/UmRtFFSDSFo?si=A1V_8l0RmXA-BGnP',
      duration: '1h 22min',
      description: 'Learn JavaScript functions, conditionals, and loops for program control.'
    },
    {
      id: 4,
      title: 'Arrays & Objects',
      embedUrl: 'https://www.youtube.com/embed/gFWhbjzowrM?si=t4MuLLCV1B99ndDc',
      duration: '1h 25min',
      description: 'Work with JavaScript arrays and objects for data storage and manipulation.'
    },
    {
      id: 5,
      title: 'DOM Manipulation',
      embedUrl: 'https://www.youtube.com/embed/P0XMXqDGttU?si=V1VZjJSHNcdsc-4l',
      duration: '1h 15min',
      description: 'Learn to interact with HTML elements using JavaScript and the Document Object Model.'
    },
    {
      id: 6,
      title: 'Events & Event Handling',
      embedUrl: 'https://www.youtube.com/embed/7zcXPCt8Ck0?si=Ygf16RycGc6IC-ia',
      duration: '1h 17min',
      description: 'Master JavaScript events, event listeners, and interactive user interfaces.'
    },
    {
      id: 7,
      title: 'Error Handling & Debugging',
      embedUrl: 'https://www.youtube.com/embed/fXAGTOZ25H8?si=6sVvG39wa75IxOLw',
      duration: '1h 23min',
      description: 'Learn to handle errors gracefully and debug JavaScript code effectively.'
    },
    {
      id: 8,
      title: 'Asynchronous JavaScript',
      embedUrl: 'https://www.youtube.com/embed/_i-uLJAh79U?si=7SKgyFZLoO0jtnXV',
      duration: '1h 28min',
      description: 'Master callbacks, promises, and async/await for handling asynchronous operations.'
    },
    {
      id: 9,
      title: 'Working with APIs & Fetch',
      embedUrl: 'https://www.youtube.com/embed/SqrppLEljkY?si=Q0dzZccHCfAHbEAo',
      duration: '1h 19min',
      description: 'Learn to fetch data from APIs, handle responses, and integrate external data.'
    },
    {
      id: 10,
      title: 'Object-Oriented Programming',
      embedUrl: 'https://www.youtube.com/embed/_V33HCZWLDQ?si=CGRH9bZF-kw-SqUh',
      duration: '1h 32min',
      description: 'Learn OOP concepts in JavaScript including classes, inheritance, and encapsulation.'
    },
    {
      id: 11,
      title: 'ES6+ Modern Features',
      embedUrl: 'https://www.youtube.com/embed/N-O4w6PynGY?si=CFWQ2fothf0b_Ld5',
      duration: '1h 26min',
      description: 'Master modern JavaScript features including arrow functions, destructuring, modules, and more.'
    },
    {
      id: 12,
      title: 'Local Storage & Session Storage',
      embedUrl: 'https://www.youtube.com/embed/d3jXofmQm44?si=QK9LgIArwcq-Axm5',
      duration: '1h 21min',
      description: 'Learn to store data in the browser using localStorage and sessionStorage APIs.'
    },
    {
      id: 13,
      title: 'JavaScript Projects & Best Practices',
      embedUrl: 'https://www.youtube.com/embed/CyGodpqcid4?si=1V5edEn8mzbYzL3V',
      duration: '1h 35min',
      description: 'Build real-world projects and learn JavaScript best practices for professional development.'
    }
  ];

  const currentVideoData = courseVideos[currentVideo];
  const totalDuration = courseVideos.reduce((total, video) => {
    // Parse duration like "1h 20min" to total minutes
    const duration = video.duration.toLowerCase().trim();
    let hours = 0;
    let minutes = 0;

    // Extract hours
    if (duration.includes('h')) {
      const hourMatch = duration.match(/(\d+)h/);
      hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    }

    // Extract minutes
    if (duration.includes('min')) {
      const minMatch = duration.match(/(\d+)min/);
      minutes = minMatch ? parseInt(minMatch[1]) : 0;
    }

    return total + (hours * 60) + minutes;
  }, 0);

  // Convert total minutes to hours and minutes for display
  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = totalDuration % 60;

  const isVideoUnlocked = (index) => {
    return userProgress.completedLessons >= index;
  };

  const handleVideoSelect = (index) => {
    if (isVideoUnlocked(index)) {
      setCurrentVideo(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Play className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JavaScript Full Course
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete JavaScript video course with 13 comprehensive lessons. Master JavaScript from basics to advanced concepts.
          </p>
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{totalHours}h {totalMinutes}min total</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>13 Video Lessons</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={currentVideoData.embedUrl}
                  title={currentVideoData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Lecture {currentVideoData.id}: {currentVideoData.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {currentVideoData.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{currentVideoData.duration}</span>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => currentVideo > 0 && setCurrentVideo(currentVideo - 1)}
                    disabled={currentVideo === 0}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentVideo + 1} of {courseVideos.length}
                  </span>
                  <button
                    onClick={() => currentVideo < courseVideos.length - 1 && setCurrentVideo(currentVideo + 1)}
                    disabled={currentVideo === courseVideos.length - 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Course Playlist</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {courseVideos.length} video lessons • Updated durations
                </p>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {courseVideos.map((video, index) => {
                  const isUnlocked = isVideoUnlocked(index);
                  const isCurrent = index === currentVideo;
                  
                  return (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(index)}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-200 ${
                        isCurrent 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600' 
                          : isUnlocked 
                            ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50' 
                            : 'opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCurrent 
                            ? 'bg-blue-600 text-white' 
                            : isUnlocked 
                              ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        }`}>
                          {isUnlocked ? (
                            isCurrent ? <Play className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium truncate ${
                            isCurrent 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {video.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Lecture {video.id}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {video.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JavaScriptCourse;
