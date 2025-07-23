#!/bin/bash

# 🚀 Copyr.ai Client - Quick Setup Script
# This script sets up the complete frontend application

echo "🚀 Setting up Copyr.ai Client..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f ".env.local" ] && [ -f ".env.example" ]; then
    echo "🔧 Setting up environment file..."
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
fi

# Build the project to verify everything works
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Edit .env.local with your configuration"
    echo "2. Run 'npm run dev' to start development server"
    echo "3. Visit http://localhost:3000 to see your app"
    echo ""
    echo "🌐 For deployment:"
    echo "- Vercel: Connect your GitHub repo to Vercel"
    echo "- Netlify: Connect your GitHub repo to Netlify"
    echo ""
    echo "📖 See README.md for detailed instructions"
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi
