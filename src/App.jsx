import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

// Layout components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BottomNavigation from './components/layout/BottomNavigation';

// Page components
import Home from './components/pages/Home';
import Lessons from './components/pages/Lessons';
import LessonDetail from './components/pages/LessonDetail';
import JavaScriptCourse from './components/pages/JavaScriptCourse';
import Quiz from './components/pages/Quiz';
import Progress from './components/pages/Progress';
import Settings from './components/pages/Settings';
import Game from './components/pages/Game';
import PWATest from './components/pages/PWATest';
// Common components
import GameFloatingButton from './components/common/GameFloatingButton';
import PWAInstallButton from './components/common/PWAInstallButton';
import PWAUpdateNotification from './components/common/PWAUpdateNotification';
// import FloatingActionButton from './components/common/FloatingActionButton';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 text-gray-900 dark:text-gray-100 relative pb-16 md:pb-0">
          {/* Enhanced Background decoration */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl animate-bounce-soft"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-float"></div>
          </div>

          <Navbar toggleSidebar={toggleSidebar} />

          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 relative">
              <div className="max-w-7xl mx-auto relative z-10 pb-safe-area-inset-bottom">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/lessons" element={<Lessons />} />
                  <Route path="/lessons/:lessonId" element={<LessonDetail />} />
                  <Route path="/javascript-course" element={<JavaScriptCourse />} />
                  <Route path="/quiz/:quizId" element={<Quiz />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/pwa-test" element={<PWATest />} />

                </Routes>
              </div>
            </main>
          </div>

          {/* Bottom Navigation for Mobile */}
          <BottomNavigation />

          {/* Game Floating Button (replaces PWA install button) - Hidden on mobile */}
          <div className="hidden md:block">
            <GameFloatingButton />
          </div>

          {/* PWA Components */}
          <PWAInstallButton variant="banner" />
          <PWAUpdateNotification />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
