#!/bin/bash

# Voice PA - Master Build Script
# Builds all components in the monorepo.

set -e

echo "🏗️  Building Voice PA Monorepo..."
echo "================================"
echo ""

# 1. Rust Core
echo "📦 Building Rust Core..."
npm run build:core
echo "✅ Rust Core built!"
echo ""

# 2. Backend
echo "📡 Building Backend..."
npm run build:backend
echo "✅ Backend built!"
echo ""

# 3. Web Dashboard
echo "💻 Building Web Dashboard..."
npm run build:web
echo "✅ Web Dashboard built!"
echo ""

# 4. Landing Page
echo "🌐 Building Landing Page..."
npm run build:landing
echo "✅ Landing Page built!"
echo ""

# 5. Extensions
echo "🧩 Building Extensions..."
npm run build:extensions
echo "✅ Extensions built!"
echo ""

echo "🏆 All builds completed successfully!"
echo "" 
