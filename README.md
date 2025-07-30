# LearnHub - Interactive Learning Platform

A comprehensive, interactive web development learning platform built with React and Vite, featuring complete lessons with YouTube video integration, interactive coding games, responsive design, and Progressive Web App (PWA) capabilities. Access the platform at [LearnHub](https://learnhub.vercel.app).

## 🛠️ Tech Stack
- **React** (v19.1) - Modern UI development
- **Vite** - Next Generation Frontend Tooling
- **React Router** (v7.7) - Application routing
- **Lucide React** - Beautiful icons
- **TailwindCSS** - Utility-first CSS framework
- **PWA** - Progressive Web App capabilities

## 🚀 Features

### 📚 Complete Learning Experience
- **13 Comprehensive Lessons** covering web development from basics to advanced concepts
- **Interactive YouTube Video Integration** for each lesson
- **Progressive Learning Path** with locked lessons until prerequisites are completed
- **Hands-on Projects** and real-world examples
- **Interactive Coding Games** for skill practice and assessment

### 🎯 Course Content
1. **JavaScript Introduction & Setup** - Learn what JavaScript is and set up your environment
2. **JavaScript Basics & Syntax** - Variables, data types, and basic operations
3. **Functions & Control Flow** - Master functions, conditionals, and loops
4. **Arrays & Objects** - Work with JavaScript data structures
5. **DOM Manipulation** - Interact with HTML elements
6. **Events & Event Handling** - Create interactive user interfaces
7. **Error Handling & Debugging** - Handle errors and debug code effectively
8. **Asynchronous JavaScript** - Master callbacks, promises, and async/await
9. **Working with APIs & Fetch** - Integrate external data into applications
10. **Object-Oriented Programming** - Learn OOP concepts in JavaScript
11. **ES6+ Modern Features** - Arrow functions, destructuring, modules, and more
12. **Local Storage & Session Storage** - Store data in the browser
13. **JavaScript Projects & Best Practices** - Build real projects and follow best practices

### 💻 Technical Features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Progressive Web App (PWA)** - Install on any device, works offline
- **Dark/Light Mode** - Automatic theme switching based on user preference
- **Offline Support** - Continue learning even without internet connection
- **Progress Tracking** - Track your learning progress across all lessons
- **Interactive Quizzes** - Test your knowledge with built-in quizzes
- **Modern UI/UX** - Beautiful, intuitive interface with smooth animations

### 🎨 Design Features
- **Gradient Backgrounds** - Beautiful color schemes for each lesson card
- **Smooth Animations** - Engaging hover effects and transitions
- **Card-based Layout** - Clean, organized lesson presentation
- **Status Indicators** - Clear visual feedback for lesson completion status
- **Difficulty Ratings** - Star-based difficulty indicators for each lesson

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Qaswar-01/LearnHub.git
cd LearnHub

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Visit `http://localhost:5173` in your browser when running the development server.

### PWA Setup
The application is configured as a Progressive Web App. After building for production:

1. **Install Icons**: Replace placeholder icons in `public/icons/` with actual PNG icons
2. **Configure Manifest**: Update `public/manifest.json` with your app details
3. **Service Worker**: The service worker is automatically registered for offline functionality

## 📱 PWA Features

### Installation
- **Install Prompt**: Automatic installation prompt on supported devices
- **Home Screen**: Add to home screen on mobile devices
- **Standalone Mode**: Runs like a native app when installed

### Offline Functionality
- **Cached Content**: Lessons and resources cached for offline access
- **Background Sync**: Progress synced when connection is restored
- **Offline Indicator**: Visual feedback when offline

### Performance
- **Fast Loading**: Optimized caching strategy for quick startup
- **Background Updates**: Automatic updates when new content is available
- **Responsive**: Optimized for all screen sizes and orientations

## 🎯 Usage

### For Learners
1. **Start Learning**: Begin with Lesson 1 and progress sequentially
2. **Watch Videos**: Each lesson includes embedded YouTube tutorials
3. **Track Progress**: Monitor your completion status on the progress page
4. **Take Quizzes**: Test your knowledge with interactive quizzes
5. **Install App**: Install as PWA for better experience

### For Developers
1. **Customize Content**: Edit lesson data in `src/data/appData.js`
2. **Add Lessons**: Follow the existing lesson structure to add new content
3. **Modify Styling**: Update themes and colors in `src/index.css`
4. **Configure PWA**: Customize manifest and service worker settings

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── layout/          # Layout components (Navbar, Sidebar)
│   ├── pages/           # Page components
│   └── ui/              # UI components
├── contexts/            # React contexts
├── data/               # Application data and content
├── styles/             # CSS and styling files
└── main.jsx           # Application entry point

public/
├── icons/             # PWA icons
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
└── browserconfig.xml  # Microsoft tile configuration
```

## 🎨 Customization

### Adding New Lessons
```javascript
// In src/data/appData.js
{
  id: 'lesson-14',
  title: 'Your New Lesson',
  description: 'Lesson description',
  content: `
    <h2>Lesson Content</h2>
    <div class="video-container mb-6">
      <iframe src="your-youtube-url" ...></iframe>
    </div>
    <p>Your lesson content...</p>
  `,
  duration: '30 minutes',
  difficulty: 3,
  videoUrl: 'your-youtube-embed-url'
}
```

### Customizing Themes
```css
/* In src/index.css */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1d4ed8;
  /* Add your custom colors */
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- YouTube creators for the educational content
- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons

## 🚀 Deployment

### Deploy to Vercel (Recommended)

This project is optimized for Vercel deployment with zero configuration needed.

#### Automatic Deployment
1. **Fork this repository** to your GitHub account
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your forked repository
   - Click "Deploy" (no configuration needed!)

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

#### Custom Domain
After deployment, you can add a custom domain in your Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain

### Other Deployment Options

#### Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
# Or connect your GitHub repo to Netlify for automatic deployments
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

### Environment Variables

For production deployment, you may want to set these environment variables:

```env
VITE_APP_NAME=LearnHub
VITE_APP_VERSION=1.0.0
VITE_APP_URL=https://your-domain.com
```

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](../../issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your problem

---

**Happy Learning! 🎉**

Start your JavaScript journey today and become a proficient web developer!

## 🌐 Live Demo

Visit the live application: [LearnHub on Vercel](https://learnhub.vercel.app)
