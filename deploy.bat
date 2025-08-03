@echo off
echo 🚀 Starting LearnHub deployment process...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Build the project
echo 🔨 Building the project...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed successfully

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🚀 Deploying to Vercel...
    vercel --prod
    if %errorlevel% equ 0 (
        echo 🎉 Deployment successful!
        echo Your app is now live on Vercel!
    ) else (
        echo ❌ Deployment failed
        pause
        exit /b 1
    )
) else (
    echo ⚠️  Vercel CLI not found. Install it with: npm i -g vercel
    echo 📁 Build files are ready in the 'dist' directory
    echo You can manually deploy these files to any static hosting service
)

echo ✨ Deployment process completed!
pause
