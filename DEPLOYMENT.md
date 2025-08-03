# 🚀 LearnHub Deployment Guide

This guide will help you deploy your LearnHub application to various hosting platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ Git repository set up
- ✅ All dependencies installed (`npm install`)
- ✅ Project builds successfully (`npm run build`)

## 🌟 Recommended: Deploy to Vercel

Vercel is the recommended platform for deploying LearnHub due to its excellent React/Vite support and zero-configuration deployment.

### Method 1: Automatic Deployment (Easiest)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your repository
   - Click "Deploy" (no configuration needed!)

3. **Your app is live!** 🎉
   - Vercel will provide you with a URL like `https://learnhub-xyz.vercel.app`
   - Every push to main branch will automatically redeploy

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # For first deployment
   vercel
   
   # For production deployment
   vercel --prod
   ```

### Method 3: Use Deployment Scripts

**For Windows:**
```bash
./deploy.bat
```

**For Mac/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 Vercel Configuration

The project includes a `vercel.json` file with optimized settings:

```json
{
  "name": "learnhub",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🌐 Alternative Deployment Options

### Netlify

1. **Drag & Drop Method**:
   - Run `npm run build`
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area

2. **Git Integration**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

### Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Configure firebase.json**:
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

## 🔒 Environment Variables

For production deployment, you may want to set these environment variables:

```env
VITE_APP_NAME=LearnHub
VITE_APP_VERSION=1.0.0
VITE_APP_URL=https://your-domain.com
VITE_APP_DESCRIPTION=Interactive Learning Platform
```

## 📱 PWA Considerations

The app includes PWA features that work best with HTTPS:
- ✅ Service Worker for offline functionality
- ✅ Web App Manifest for installation
- ✅ Caching strategies for performance

## 🎯 Custom Domain

### Vercel Custom Domain
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Domain Configuration
```
Type: CNAME
Name: www (or @)
Value: your-project.vercel.app
```

## 🔍 Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run lint`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Deployment Issues
- Check build logs in your hosting platform
- Verify environment variables are set correctly
- Ensure all required files are included in the build

### PWA Issues
- Verify HTTPS is enabled
- Check service worker registration
- Test manifest.json accessibility

## 📊 Performance Optimization

The build is optimized with:
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Gzip compression
- ✅ Caching headers
- ✅ Bundle analysis

## 🎉 Post-Deployment Checklist

After deployment, verify:
- [ ] App loads correctly
- [ ] All routes work (SPA routing)
- [ ] PWA features work (install prompt, offline)
- [ ] Responsive design on mobile
- [ ] Dark/light mode switching
- [ ] Game functionality
- [ ] Lesson navigation

## 📞 Support

If you encounter issues during deployment:
1. Check the hosting platform's documentation
2. Review build logs for errors
3. Test locally with `npm run build && npm run preview`
4. Create an issue in the repository

---

**Happy Deploying! 🚀**

Your LearnHub app will be live and ready for learners worldwide!
