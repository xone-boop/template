#!/bin/bash
# Quick Start Script - Run this untuk setup everything!

echo "╔════════════════════════════════════════════════╗"
echo "║   🚀 TODO APP - QUICK START SETUP              ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Please run this from /workspaces/template directory"
  echo "Run: cd /workspaces/template && bash quick-start.sh"
  exit 1
fi

echo "📦 Step 1: Installing root dependencies..."
npm install 2>&1 | grep -E "added|up to date"
echo "✅ Done\n"

echo "📦 Step 2: Installing project dependencies..."
npm install --prefix projects/todo-app 2>&1 | grep -E "added|up to date" | tail -1
echo "✅ Done\n"

echo "🗄️  Step 3: Setting up database..."
bash -c "cd projects/todo-app && npx prisma generate && npx prisma db push" > /dev/null 2>&1
echo "✅ Database ready at: projects/todo-app/prisma/dev.db\n"

echo "╔════════════════════════════════════════════════╗"
echo "║   ✅ SETUP COMPLETE!                           ║"
echo "╚════════════════════════════════════════════════╝"
echo ""
echo "📝 NEXT STEPS - Open 3 terminals:\n"
echo "Terminal 1 - Backend Server:"
echo "  $ cd projects/todo-app && npm run dev:server"
echo ""
echo "Terminal 2 - Frontend (optional):"
echo "  $ cd projects/todo-app && npm run dev"
echo ""
echo "Terminal 3 - Testing:"
echo "  $ cd projects/todo-app && node run-mcp-tests.js"
echo ""
echo "🌐 Access:"
echo "  - Frontend: http://localhost:5173"
echo "  - Backend API: http://localhost:3001"
echo "  - Database GUI: npx prisma studio"
echo ""
