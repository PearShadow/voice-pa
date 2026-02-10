#!/bin/bash

# Voice PA - Development Start Script
# This script starts the backend and frontend services in parallel.

set -e

# Load environment variables if they exist
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "🚀 Starting Voice PA Development Environment..."
echo "=========================================="
echo ""

# Function to stop all background processes on exit
cleanup() {
  echo ""
  echo "🛑 Stopping all services..."
  kill $(jobs -p)
  exit
}

trap cleanup SIGINT SIGTERM

# Start Backend
echo "📡 Starting Backend API..."
PORT=3001 npm run dev:backend &

# Start Web Dashboard
echo "💻 Starting Web Dashboard..."
PORT=3000 npm run dev:web &

# Start Landing Page
echo "🌐 Starting Landing Page..."
PORT=3002 npm run dev:landing &

echo ""
echo "✅ All services are starting up!"
echo "--------------------------------"
echo "Backend:         http://localhost:3001"
echo "Web Dashboard:   http://localhost:3000"
echo "Landing Page:    http://localhost:3002"
echo ""
echo "Press Ctrl+C to stop all services."
echo ""

# Wait for all background processes to finish
wait
