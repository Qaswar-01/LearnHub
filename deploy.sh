#!/bin/bash

# LearnHub Deployment Script
echo "🚀 Starting LearnHub deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "Your app is now live on Vercel!"
    else
        echo "❌ Deployment failed"
        exit 1
    fi
else
    echo "⚠️  Vercel CLI not found. Install it with: npm i -g vercel"
    echo "📁 Build files are ready in the 'dist' directory"
    echo "You can manually deploy these files to any static hosting service"
fi

echo "✨ Deployment process completed!"
