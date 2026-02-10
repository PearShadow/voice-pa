#!/bin/bash

# Voice PA - Master Test Script
# Runs unit tests across all packages in the monorepo.

set -e

echo "🧪 Running Voice PA Monorepo Tests..."
echo "====================================="
echo ""

# 1. Rust Core Tests
echo "📦 Testing Rust Core..."
cd packages/core
cargo test
cd ../..
echo "✅ Rust Core tests passed!"
echo ""

# 2. Backend Tests
echo "📡 Testing Backend..."
cd packages/backend
npm test
cd ../..
echo "✅ Backend tests passed!"
echo ""

# 3. Mobile Tests
echo "📱 Testing Mobile App..."
cd packages/mobile
npm test
cd ../..
echo "✅ Mobile tests passed!"
echo ""

# 4. Web Dashboard Tests
echo "💻 Testing Web Dashboard..."
cd packages/web-dashboard
npm test
cd ../..
echo "✅ Web Dashboard tests passed!"
echo ""

echo "🏆 All test suites passed successfully!"
echo ""
