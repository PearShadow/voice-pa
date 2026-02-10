#!/bin/bash

# Voice PA - Infrastructure Management Script
# Manages local dependencies like Redis and Postgres using Docker Compose.

set -e

COMMAND=$1

echo "🏗️  Voice PA Infrastructure Management"
echo "====================================="
echo ""

case $COMMAND in
  up)
    echo "🚀 Starting infrastructure containers..."
    docker-compose up -d
    echo "✅ Infrastructure is running!"
    ;;
  down)
    echo "🛑 Stopping infrastructure containers..."
    docker-compose down
    echo "✅ Infrastructure stopped!"
    ;;
  logs)
    echo "📋 Showing infrastructure logs..."
    docker-compose logs -f
    ;;
  restart)
    echo "🔄 Restarting infrastructure..."
    docker-compose restart
    echo "✅ Infrastructure restarted!"
    ;;
  *)
    echo "Usage: ./infra.sh [up|down|logs|restart]"
    echo ""
    echo "Example:"
    echo "  ./scripts/infra.sh up"
    exit 1
    ;;
esac

echo ""
