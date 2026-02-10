#!/bin/bash

# Voice PA - Initial Setup Script
# Configures the monorepo for development.

set -e

echo "🛠️  Setting up Voice PA Monorepo..."
echo "=================================="
echo ""

# 1. Install dependencies
echo "📦 Installing root dependencies..."
npm install
echo "✅ Dependencies installed!"
echo ""

# 2. Build Rust Core
echo "⚙️  Building Rust core..."
npm run build:core
echo "✅ Rust core built!"
echo ""

# 3. Prisma setup
echo "🗄️  Generating Prisma client..."
cd packages/backend
npx prisma generate
cd ../..
echo "✅ Database client generated!"
echo ""

# 4. Check Environment Files
echo "🔑 Checking environment files..."

# Backend .env
if [ ! -f "packages/backend/.env" ]; then
  echo "📝 Creating packages/backend/.env..."
  cat <<EOF > packages/backend/.env
DATABASE_URL=postgresql://voicepa:dev_password_change_in_production@localhost:5432/voicepa
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev_secret_key_please_change_in_production
SUPABASE_URL=http://localhost:8000
SUPABASE_ANON_KEY=local-dev-anon-key
SUPABASE_SERVICE_KEY=local-dev-service-key
OPENAI_API_KEY=sk-placeholder
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
EOF
fi

# Web Dashboard .env.local
if [ ! -f "packages/web-dashboard/.env.local" ]; then
  echo "📝 Creating packages/web-dashboard/.env.local..."
  echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > packages/web-dashboard/.env.local
  echo "NEXT_PUBLIC_SUPABASE_URL=http://localhost:8000" >> packages/web-dashboard/.env.local
fi

echo ""
echo "🎉 Setup complete! You're ready to start developing."
echo ""
echo "Next steps:"
echo "  1. Start infrastructure:  ./scripts/infra.sh up"
echo "  2. Start development:     ./scripts/dev.sh"
echo "  3. Run tests:              ./scripts/test-all.sh"
echo ""
